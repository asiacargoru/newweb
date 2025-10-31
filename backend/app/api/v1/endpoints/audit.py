"""
Audit endpoints (admin-only): журнал операций и отчёты по доступу к ПД.

Требования:
- GET /audit: журнал аудита (auth, только admin)
  - Фильтры: date_from, date_to, action, entity_type
  - Пагинация: page, size
  - Экспорт в CSV: export_csv=true
- GET /audit/report: статистика доступа к ПД (просмотры/экспорты)
"""
from __future__ import annotations

import csv
import io
from datetime import datetime, timedelta
from typing import Any, Dict, List, Optional

from fastapi import APIRouter, Depends, HTTPException, Query, Request, Response, status
from sqlalchemy import select, func, and_, desc
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.config import settings
from app.dependencies.auth import get_current_user, CurrentUser
from app.models.audit_log import AuditLog

router = APIRouter()


@router.get("/", status_code=status.HTTP_200_OK)
async def get_audit_logs(
    request: Request,
    user: CurrentUser = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
    date_from: Optional[datetime] = Query(None),
    date_to: Optional[datetime] = Query(None),
    action: Optional[str] = Query(None),
    entity_type: Optional[str] = Query(None),
    page: int = Query(1, ge=1),
    size: int = Query(50, ge=1, le=200),
    export_csv: bool = Query(False),
) -> Any:
    """Возвращает журнал аудита (с фильтрами и экспортом). Только админ."""
    # Проверка прав
    if user.email != settings.ADMIN_USERNAME:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Admin only")

    conditions = []
    if date_from:
        conditions.append(AuditLog.created_at >= date_from)
    if date_to:
        conditions.append(AuditLog.created_at <= date_to)
    if action:
        conditions.append(AuditLog.action == action)
    if entity_type:
        conditions.append(AuditLog.entity_type == entity_type)

    where_clause = and_(*conditions) if conditions else None

    # Считаем total
    count_stmt = select(func.count(AuditLog.id))
    if where_clause is not None:
        count_stmt = count_stmt.where(where_clause)
    total: int = int((await db.execute(count_stmt)).scalar() or 0)

    # Выбираем страницу
    stmt = select(AuditLog)
    if where_clause is not None:
        stmt = stmt.where(where_clause)
    stmt = stmt.order_by(desc(AuditLog.created_at)).offset((page - 1) * size).limit(size)

    rows = (await db.execute(stmt)).scalars().all()

    if export_csv:
        # Готовим CSV; details сериализуем как JSON-строку
        buf = io.StringIO()
        writer = csv.writer(buf)
        writer.writerow(["id", "action", "entity_type", "entity_id", "user_id", "ip_address", "user_agent", "created_at", "details"])
        for r in rows:
            writer.writerow([
                str(r.id),
                r.action,
                r.entity_type,
                str(r.entity_id) if r.entity_id else "",
                r.user_id,
                r.ip_address,
                r.user_agent,
                r.created_at.isoformat() if r.created_at else "",
                str(r.details or {}),
            ])
        buf.seek(0)
        return Response(content=buf.getvalue(), media_type="text/csv")

    items = [r.to_dict() for r in rows]
    return {
        "items": items,
        "page": page,
        "size": size,
        "total": total,
    }


@router.get("/report", status_code=status.HTTP_200_OK)
async def audit_report(
    user: CurrentUser = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
    days: int = Query(30, ge=1, le=365),
) -> Dict[str, Any]:
    """Статистика доступа к ПД за последние N дней. Только админ."""
    if user.email != settings.ADMIN_USERNAME:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Admin only")

    since = datetime.utcnow() - timedelta(days=days)
    # Доступ к ПД трактуем как действия, связанные с просмотром/экспортом
    pd_actions = {"lead_viewed", "data_exported"}

    stmt = (
        select(AuditLog)
        .where(AuditLog.created_at >= since)
        .where(AuditLog.action.in_(pd_actions))
        .order_by(desc(AuditLog.created_at))
    )
    rows = (await db.execute(stmt)).scalars().all()

    total_accesses = len(rows)
    by_action: Dict[str, int] = {}
    by_user: Dict[str, int] = {}
    by_day: Dict[str, int] = {}
    by_entity: Dict[str, int] = {}

    for r in rows:
        by_action[r.action] = by_action.get(r.action, 0) + 1
        by_user[r.user_id] = by_user.get(r.user_id, 0) + 1
        day_key = (r.created_at.date().isoformat() if r.created_at else "unknown")
        by_day[day_key] = by_day.get(day_key, 0) + 1
        ent = r.entity_type or "unknown"
        by_entity[ent] = by_entity.get(ent, 0) + 1

    top_entities = sorted(by_entity.items(), key=lambda x: x[1], reverse=True)[:10]

    return {
        "since": since.isoformat(),
        "total_accesses": total_accesses,
        "by_action": by_action,
        "by_user": by_user,
        "by_day": by_day,
        "top_entities": top_entities,
    }
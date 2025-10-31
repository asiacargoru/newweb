"""
Endpoints для управления автогенерацией/автопубликацией статей.

- POST /auto-publish/schedule — запланировать генерацию
- GET  /auto-publish/queue — посмотреть очередь задач
- POST /auto-publish/generate-now — запустить генерацию сразу
- PUT  /auto-publish/settings — обновить настройки (keywords)
"""
from __future__ import annotations

from datetime import datetime, timedelta
from typing import Any, Dict, List, Optional

from fastapi import APIRouter, Depends, HTTPException, Request, status
from pydantic import BaseModel, Field
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.core.database import get_db
from app.core.cache import cache_get, cache_set
from app.dependencies.auth import get_current_user, CurrentUser
from app.models.audit_log import AuditLog
from app.tasks.article_generator import generate_article_task

router = APIRouter()


class ScheduleRequest(BaseModel):
    country_code: str = Field(..., description="Код страны (например, CN, KZ)")
    article_type: str = Field(..., description="Тип статьи: country_overview | route_guide | customs_guide")
    run_at: Optional[datetime] = Field(None, description="Время запуска в ISO (UTC)")
    delay_seconds: Optional[int] = Field(None, ge=0, le=86400, description="Задержка в секундах")


class GenerateNowRequest(BaseModel):
    country_code: str
    article_type: str


class SettingsUpdate(BaseModel):
    keywords: Optional[List[str]] = None


@router.post("/schedule", status_code=status.HTTP_202_ACCEPTED)
async def schedule_generation(
    payload: ScheduleRequest,
    request: Request,
    user: CurrentUser = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> Dict[str, Any]:
    """Добавляет задачу генерации в очередь: запускает по времени или с задержкой."""
    if user.email != settings.ADMIN_USERNAME:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Admin only")

    opts: Dict[str, Any] = {}
    if payload.run_at:
        # Celery ожидает naive UTC datetime; приводим к UTC
        eta = payload.run_at
        opts["eta"] = eta
    elif payload.delay_seconds and payload.delay_seconds > 0:
        opts["countdown"] = payload.delay_seconds

    task = generate_article_task.apply_async(kwargs={
        "country_code": payload.country_code,
        "article_type": payload.article_type,
    }, **opts)

    # Сохраняем запись в кэше очереди (для UI)
    queue: List[Dict[str, Any]] = await cache_get("auto_publish:queue") or []
    queue.append({
        "task": "generate_article",
        "country_code": payload.country_code,
        "article_type": payload.article_type,
        "task_id": task.id,
        "scheduled": bool(opts),
        "eta": (opts.get("eta").isoformat() if opts.get("eta") else None),
        "ts": datetime.utcnow().isoformat(),
    })
    await cache_set("auto_publish:queue", queue, ttl_seconds=24 * 3600)

    # Аудит
    ip_addr = request.headers.get("x-forwarded-for") or (request.client.host if request.client else None)
    ua = request.headers.get("user-agent")
    db.add(AuditLog(
        action="auto_publish_schedule",
        entity_type="article",
        entity_id=None,
        user_id=user.email,
        ip_address=ip_addr or "",
        user_agent=ua or "",
        details={"country_code": payload.country_code, "article_type": payload.article_type, "task_id": task.id, "opts": opts},
    ))
    await db.commit()

    return {"task_id": task.id, "status": "scheduled" if opts else "queued"}


@router.get("/queue", status_code=status.HTTP_200_OK)
async def get_queue(user: CurrentUser = Depends(get_current_user)) -> Dict[str, Any]:
    if user.email != settings.ADMIN_USERNAME:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Admin only")
    queue: List[Dict[str, Any]] = await cache_get("auto_publish:queue") or []
    return {"size": len(queue), "items": queue}


@router.post("/generate-now", status_code=status.HTTP_202_ACCEPTED)
async def generate_now(
    payload: GenerateNowRequest,
    request: Request,
    user: CurrentUser = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> Dict[str, Any]:
    if user.email != settings.ADMIN_USERNAME:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Admin only")

    task = generate_article_task.delay(payload.country_code, payload.article_type)

    # Аудит
    ip_addr = request.headers.get("x-forwarded-for") or (request.client.host if request.client else None)
    ua = request.headers.get("user-agent")
    db.add(AuditLog(
        action="auto_publish_generate",
        entity_type="article",
        entity_id=None,
        user_id=user.email,
        ip_address=ip_addr or "",
        user_agent=ua or "",
        details={"country_code": payload.country_code, "article_type": payload.article_type, "task_id": task.id},
    ))
    await db.commit()

    return {"task_id": task.id, "status": "queued"}


@router.put("/settings", status_code=status.HTTP_200_OK)
async def update_settings(
    payload: SettingsUpdate,
    user: CurrentUser = Depends(get_current_user),
) -> Dict[str, Any]:
    if user.email != settings.ADMIN_USERNAME:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Admin only")

    current: Dict[str, Any] = (await cache_get("auto_publish:settings")) or {}
    if payload.keywords is not None:
        current["keywords"] = [k.strip() for k in payload.keywords if k and k.strip()]
    current["updated_at"] = datetime.utcnow().isoformat()
    await cache_set("auto_publish:settings", current, ttl_seconds=7 * 24 * 3600)

    return {"ok": True, "settings": current}
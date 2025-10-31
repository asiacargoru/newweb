"""
AdminJS-FastAPI мост: генерирует админские REST-эндпоинты для ресурсов SQLAlchemy,
аутентификацию с сессиями, RBAC и (опционально) 2FA.

Примечание: AdminJS сам по себе фронтенд (Node/React). Этот мост обеспечивает
бэкенд для AdminJS (или любого SPA), чтобы работать поверх FastAPI.
"""
from __future__ import annotations

import base64
import time
from dataclasses import dataclass, field
from datetime import datetime
from typing import Any, Callable, Dict, List, Optional, Type
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Request, status
from pydantic import BaseModel
from sqlalchemy import select, update, delete, and_, desc
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.core.database import get_db
from app.models import Article, Country, Service, Lead, UserConsent, AuditLog, SEOMetadata
from app.models.article import ArticleStatus
from app.tasks.article_generator import generate_article_task
from app.core.cache import cache_get, cache_set
from app.services.encryption_service import decrypt_personal_data
from app.services.gdpr_service import export_user_data, delete_user_data

try:
    import pyotp
except Exception:
    pyotp = None


# ------------------------- Конфигурация/Admin -------------------------
@dataclass
class Resource:
    model: Type[Any]
    session_dependency: Callable[..., Any]
    properties: Dict[str, Any] = field(default_factory=dict)
    actions: Dict[str, Any] = field(default_factory=dict)


@dataclass
class AdminJS:
    resources: List[Resource]
    root_path: str = "/admin"
    branding: Dict[str, Any] = field(default_factory=dict)
    locale: Dict[str, Any] = field(default_factory=dict)


# ------------------------- Auth модели -------------------------
class AdminLoginPayload(BaseModel):
    email: str
    password: str
    otp: Optional[str] = None


class CurrentAdmin(BaseModel):
    email: str
    role: str  # admin | manager | viewer


# ------------------------- RBAC и аутентификация -------------------------
async def authenticate_admin(email: str, password: str, otp: Optional[str]) -> CurrentAdmin:
    # Базовая проверка по конфигу
    # Admin
    if email == settings.ADMIN_USERNAME and password == settings.ADMIN_PASSWORD:
        # 2FA, если включено
        if settings.ADMIN_TOTP_SECRET:
            if pyotp is None:
                raise HTTPException(status_code=500, detail="2FA is enabled but pyotp not installed")
            totp = pyotp.TOTP(settings.ADMIN_TOTP_SECRET)
            if not otp or not totp.verify(otp, valid_window=1):
                raise HTTPException(status_code=401, detail="Invalid 2FA code")
        return CurrentAdmin(email=email, role="admin")
    # Manager
    if email in settings.MANAGER_USERS:
        # Пример: менеджерам пароль совпадает с ADMIN_PASSWORD (или вынести в .env)
        if password == settings.ADMIN_PASSWORD:
            return CurrentAdmin(email=email, role="manager")
    # Viewer
    if email in settings.VIEWER_USERS:
        if password == settings.ADMIN_PASSWORD:
            return CurrentAdmin(email=email, role="viewer")

    raise HTTPException(status_code=401, detail="Invalid credentials")


def _ensure_session(request: Request) -> Dict[str, Any]:
    sess = request.session
    if "last_activity" in sess:
        # Таймаут сессии
        if (time.time() - sess["last_activity"]) > settings.SESSION_TIMEOUT_MINUTES * 60:
            request.session.clear()
            raise HTTPException(status_code=401, detail="Session expired")
    sess["last_activity"] = time.time()
    return sess


def require_admin(role_required: str) -> Callable[..., Any]:
    # role_required: admin|manager|viewer
    def dep(request: Request) -> CurrentAdmin:
        sess = _ensure_session(request)
        email = sess.get("email")
        role = sess.get("role")
        if not email or not role:
            raise HTTPException(status_code=401, detail="Not authenticated")
        order = {"viewer": 1, "manager": 2, "admin": 3}
        if order.get(role, 0) < order.get(role_required, 0):
            raise HTTPException(status_code=403, detail="Permission denied")
        return CurrentAdmin(email=email, role=role)
    return dep


# ------------------------- Утилита аудита -------------------------
async def _audit(db: AsyncSession, user: CurrentAdmin, action: str, entity_type: str, entity_id: Optional[str], details: Dict[str, Any], request: Request) -> None:
    try:
        log = AuditLog(
            action=action,
            entity_type=entity_type,
            entity_id=UUID(entity_id) if entity_id else None,
            user_id=user.email,
            ip_address=(request.headers.get("x-forwarded-for") or (request.client.host if request.client else "unknown")),
            user_agent=(request.headers.get("user-agent") or "unknown"),
            details=details,
        )
        db.add(log)
        await db.commit()
    except Exception:
        # не роняем операцию из-за аудита
        pass


# ------------------------- Генерация роутера -------------------------
def AdminJSFastAPI(admin: AdminJS) -> APIRouter:
    router = APIRouter()

    # ---- health ----
    @router.get(f"{admin.root_path}/health")
    async def health():
        return {"status": "admin-ok"}

    # ---- auth ----
    @router.post(f"{admin.root_path}/auth/login")
    async def login(payload: AdminLoginPayload, request: Request, db: AsyncSession = Depends(get_db)) -> Dict[str, Any]:
        admin_user = await authenticate_admin(payload.email, payload.password, payload.otp)
        request.session.update({
            "email": admin_user.email,
            "role": admin_user.role,
            "last_activity": time.time(),
        })
        await _audit(db, admin_user, action="admin_login", entity_type="auth", entity_id=None, details={}, request=request)
        return {"email": admin_user.email, "role": admin_user.role}

    @router.post(f"{admin.root_path}/auth/logout")
    async def logout(request: Request, db: AsyncSession = Depends(get_db), admin_user: CurrentAdmin = Depends(require_admin("viewer"))) -> Dict[str, Any]:
        await _audit(db, admin_user, action="admin_logout", entity_type="auth", entity_id=None, details={}, request=request)
        request.session.clear()
        return {"ok": True}

    @router.get(f"{admin.root_path}/auth/me")
    async def me(admin_user: CurrentAdmin = Depends(require_admin("viewer"))) -> Dict[str, Any]:
        return {"email": admin_user.email, "role": admin_user.role}

    # ---- resources: list/detail + ограниченный update ----
    res_map: Dict[str, Resource] = {}
    for res in admin.resources:
        name = res.model.__name__.lower()
        res_map[name] = res

        # list
        @router.get(f"{admin.root_path}/resources/{name}", name=f"list_{name}")
        async def list_items(request: Request, user: CurrentAdmin = Depends(require_admin("viewer")), db: AsyncSession = Depends(get_db)):
            model = res.model
            stmt = select(model).order_by(getattr(model, "created_at")) if hasattr(model, "created_at") else select(model)
            rows = (await db.execute(stmt)).scalars().all()
            data = [getattr(r, "to_dict", lambda: r.__dict__)() for r in rows]
            await _audit(db, user, action=f"admin_list_{name}", entity_type=name, entity_id=None, details={"count": len(data)}, request=request)
            return {"items": data}

        # detail
        @router.get(f"{admin.root_path}/resources/{name}/{{item_id}}", name=f"detail_{name}")
        async def get_item(item_id: str, request: Request, user: CurrentAdmin = Depends(require_admin("viewer")), db: AsyncSession = Depends(get_db)):
            model = res.model
            try:
                stmt = select(model).where(getattr(model, "id") == UUID(item_id))
            except Exception:
                raise HTTPException(status_code=400, detail="Invalid id")
            row = (await db.execute(stmt)).scalars().first()
            if not row:
                raise HTTPException(status_code=404, detail="Not found")
            data = getattr(row, "to_dict", lambda: row.__dict__)()
            await _audit(db, user, action=f"admin_view_{name}", entity_type=name, entity_id=item_id, details={}, request=request)
            return data

        # limited update (Article only as example)
        if res.model is Article:
            @router.put(f"{admin.root_path}/resources/{name}/{{item_id}}", name=f"update_{name}")
            async def update_article(item_id: str, payload: Dict[str, Any], request: Request, user: CurrentAdmin = Depends(require_admin("manager")), db: AsyncSession = Depends(get_db)):
                # разрешаем обновлять title/content/seo_* статус
                allowed = {"title", "content", "seo_title", "seo_description", "seo_keywords", "status"}
                updates = {k: v for k, v in payload.items() if k in allowed}
                if not updates:
                    raise HTTPException(status_code=400, detail="No valid fields to update")
                try:
                    stmt = update(Article).where(Article.id == UUID(item_id)).values(**updates)
                except Exception:
                    raise HTTPException(status_code=400, detail="Invalid id")
                await db.execute(stmt)
                await db.commit()
                await _audit(db, user, action="admin_update_article", entity_type="article", entity_id=item_id, details={"updates": list(updates.keys())}, request=request)
                return {"id": item_id, "updated": list(updates.keys())}

    # ---- custom components ----
    # 1) DecryptedDataComponent: безопасный просмотр ПД лида
    @router.post(f"{admin.root_path}/leads/{{lead_id}}/decrypt")
    async def decrypt_lead(lead_id: str, request: Request, user: CurrentAdmin = Depends(require_admin("manager")), db: AsyncSession = Depends(get_db)) -> Dict[str, Any]:
        # Доп. 2FA при доступе к ПД (если включено), код передаётся в заголовке X-OTP
        if settings.ADMIN_TOTP_SECRET:
            if pyotp is None:
                raise HTTPException(status_code=500, detail="2FA is enabled but pyotp not installed")
            otp = request.headers.get("x-otp")
            totp = pyotp.TOTP(settings.ADMIN_TOTP_SECRET)
            if not otp or not totp.verify(otp, valid_window=1):
                raise HTTPException(status_code=401, detail="Invalid 2FA code")
        # Найти лид и расшифровать
        row = (await db.execute(select(Lead).where(Lead.id == UUID(lead_id)))).scalars().first()
        if not row:
            raise HTTPException(status_code=404, detail="Lead not found")
        pd = decrypt_personal_data(row.encrypted_data)
        # Аудит
        await _audit(db, user, action="lead_viewed", entity_type="lead", entity_id=lead_id, details={"fields": list(pd.keys())}, request=request)
        return {"personal_data": pd}

    # 2) ArticleGeneratorComponent: запуск генерации статьи
    class GeneratePayload(BaseModel):
        country_code: str
        article_type: str
        keywords: Optional[List[str]] = None

    @router.post(f"{admin.root_path}/articles/generate")
    async def generate_article(payload: GeneratePayload, request: Request, user: CurrentAdmin = Depends(require_admin("manager"))) -> Dict[str, Any]:
        # keywords сохраняем в настройках авто-публикации (глобально)
        settings_cache: Optional[Dict[str, Any]] = await cache_get("auto_publish:settings") or {}
        if payload.keywords:
            settings_cache["keywords"] = payload.keywords
            await cache_set("auto_publish:settings", settings_cache, ttl_seconds=24 * 3600)
        # Celery задача
        try:
            generate_article_task.delay(payload.country_code, payload.article_type)
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Task dispatch failed: {e}")
        return {"queued": True}

    # 3) SEODashboardComponent: метрики SEO
    @router.get(f"{admin.root_path}/seo/metrics")
    async def seo_metrics(request: Request, user: CurrentAdmin = Depends(require_admin("viewer")), db: AsyncSession = Depends(get_db)) -> Dict[str, Any]:
        # Кол-во опубликованных
        published_articles = (await db.execute(select(Article).where(Article.status == ArticleStatus.published))).scalars().all()
        # Топ по просмотрам
        top_articles = (await db.execute(select(Article).order_by(Article.views_count.desc()).limit(10))).scalars().all()
        top = [{"id": str(a.id), "slug": a.slug, "title": a.title, "views": a.views_count} for a in top_articles]
        # Очередь автогенерации
        queue: List[Dict[str, Any]] = await cache_get("auto_publish:queue") or []
        await _audit(db, user, action="admin_view_seo_metrics", entity_type="seo", entity_id=None, details={"top_count": len(top), "queue_len": len(queue)}, request=request)
        return {
            "published_articles": len(published_articles),
            "top_by_views": top,
            "auto_publish_queue": queue,
        }

    # Доп. страницы: проксируем к существующим API или реализуем краткие операции
    @router.get(f"{admin.root_path}/auto-publish/settings")
    async def get_auto_publish_settings(user: CurrentAdmin = Depends(require_admin("manager"))):
        settings_cache: Optional[Dict[str, Any]] = await cache_get("auto_publish:settings")
        return settings_cache or {}

    @router.put(f"{admin.root_path}/auto-publish/settings")
    async def set_auto_publish_settings(payload: Dict[str, Any], request: Request, user: CurrentAdmin = Depends(require_admin("manager")), db: AsyncSession = Depends(get_db)):
        await cache_set("auto_publish:settings", payload, ttl_seconds=24 * 3600)
        await _audit(db, user, action="admin_update_auto_publish_settings", entity_type="auto_publish", entity_id=None, details={"keys": list(payload.keys())}, request=request)
        return {"ok": True}

    @router.get(f"{admin.root_path}/auto-publish/queue")
    async def get_auto_publish_queue(request: Request, user: CurrentAdmin = Depends(require_admin("manager")), db: AsyncSession = Depends(get_db)):
        queue: List[Dict[str, Any]] = await cache_get("auto_publish:queue") or []
        await _audit(db, user, action="admin_view_auto_publish_queue", entity_type="auto_publish", entity_id=None, details={"queue_len": len(queue)}, request=request)
        return {"items": queue}

    @router.post(f"{admin.root_path}/auto-publish/schedule")
    async def schedule_auto_publish(payload: SchedulePayload, request: Request, user: CurrentAdmin = Depends(require_admin("manager")), db: AsyncSession = Depends(get_db)):
        queue: List[Dict[str, Any]] = await cache_get("auto_publish:queue") or []
        item = {
            "country_code": payload.country_code,
            "article_type": payload.article_type,
            "keywords": payload.keywords or [],
            "run_at": payload.run_at_ts or int(time.time()),
        }
        queue.append(item)
        await cache_set("auto_publish:queue", queue, ttl_seconds=7 * 24 * 3600)
        await _audit(db, user, action="admin_schedule_generation", entity_type="auto_publish", entity_id=None, details={"country": payload.country_code, "article_type": payload.article_type}, request=request)
        return {"queued": True, "size": len(queue)}

    @router.post(f"{admin.root_path}/auto-publish/generate-now")
    async def auto_publish_generate_now(payload: GeneratePayload, request: Request, user: CurrentAdmin = Depends(require_admin("manager")), db: AsyncSession = Depends(get_db)):
        try:
            generate_article_task.delay(payload.country_code, payload.article_type)
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Task dispatch failed: {e}")
        await _audit(db, user, action="admin_generate_now", entity_type="auto_publish", entity_id=None, details={"country": payload.country_code, "article_type": payload.article_type}, request=request)
        return {"queued": True}

    @router.get(f"{admin.root_path}/gdpr/consents")
    async def gdpr_consents(user_hash: str, request: Request, user: CurrentAdmin = Depends(require_admin("manager")), db: AsyncSession = Depends(get_db)):
        rows = (await db.execute(select(UserConsent).where(UserConsent.user_hash == user_hash))).scalars().all()
        await _audit(db, user, action="admin_view_consents", entity_type="gdpr", entity_id=None, details={"user_hash": user_hash, "count": len(rows)}, request=request)
        return {"items": [r.to_dict() for r in rows]}

    @router.post(f"{admin.root_path}/gdpr/export")
    async def gdpr_export(payload: GDPRPayload, request: Request, user: CurrentAdmin = Depends(require_admin("manager")), db: AsyncSession = Depends(get_db)):
        result = await export_user_data(db, user_hash=payload.user_hash)
        await _audit(db, user, action="admin_export_user_data", entity_type="gdpr", entity_id=None, details={"user_hash": payload.user_hash, "lead_count": len(result.get("leads", []))}, request=request)
        return result

    @router.post(f"{admin.root_path}/gdpr/delete")
    async def gdpr_delete(payload: GDPRPayload, request: Request, user: CurrentAdmin = Depends(require_admin("admin")), db: AsyncSession = Depends(get_db)):
        deleted = await delete_user_data(db, user_hash=payload.user_hash)
        await _audit(db, user, action="admin_delete_user_data", entity_type="gdpr", entity_id=None, details={"user_hash": payload.user_hash, "deleted_leads": deleted}, request=request)
        return {"deleted_leads": deleted}

    @router.get(f"{admin.root_path}/audit/logs")
    async def admin_audit_logs(
        request: Request,
        user: CurrentAdmin = Depends(require_admin("manager")),
        db: AsyncSession = Depends(get_db),
        date_from: Optional[str] = None,
        date_to: Optional[str] = None,
        action: Optional[str] = None,
        entity_type: Optional[str] = None,
        page: int = 1,
        size: int = 50,
    ):
        conds = []
        if action:
            conds.append(AuditLog.action == action)
        if entity_type:
            conds.append(AuditLog.entity_type == entity_type)
        try:
            if date_from:
                df = datetime.fromisoformat(date_from)
                conds.append(AuditLog.created_at >= df)
            if date_to:
                dt = datetime.fromisoformat(date_to)
                conds.append(AuditLog.created_at <= dt)
        except Exception:
            pass
        stmt = select(AuditLog)
        if conds:
            stmt = stmt.where(and_(*conds))
        stmt = stmt.order_by(desc(AuditLog.created_at)).offset(max(0, (page - 1) * size)).limit(size)
        rows = (await db.execute(stmt)).scalars().all()
        await _audit(db, user, action="admin_view_audit_logs", entity_type="audit", entity_id=None, details={"count": len(rows)}, request=request)
        return {"items": [r.to_dict() for r in rows], "page": page, "size": size}

    return router
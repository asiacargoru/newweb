"""
Consents endpoints: фиксация и проверка согласий на обработку ПДн (ФЗ-152).

Требования:
- POST /consents: создать согласие, сохранить IP и User-Agent, зашифровать IP, вернуть consent_id
- GET /consents/{user_hash}: проверить статус согласий по хешу пользователя
- POST /consents/{id}/revoke: отозвать согласие, при необходимости удалить связанные данные

Критически важно:
- @audit_log на операции с ПД
- Никогда не логировать расшифрованные ПД
- IP адреса шифруются
"""
from __future__ import annotations

import logging
from typing import Dict, Any, List, Optional
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Request, status
from pydantic import BaseModel, EmailStr
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.security import audit_log
from app.dependencies.auth import get_current_user, CurrentUser
from app.models.consent import UserConsent, ConsentType
from app.services.gdpr_service import create_consent, check_consent, revoke_consent, delete_user_data

logger = logging.getLogger("api.consents")
router = APIRouter()


class ConsentCreatePayload(BaseModel):
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    consent_type: ConsentType
    consent_text_version: Optional[str] = "v1"


@router.post("/", status_code=status.HTTP_201_CREATED)
@audit_log(action="consent_create", target="consent")
async def create_consent_endpoint(
    payload: ConsentCreatePayload,
    request: Request,
    db: AsyncSession = Depends(get_db),
) -> Dict[str, Any]:
    """Создаёт согласие: IP шифруется, возвращает consent_id и user_hash."""
    ip_addr = request.headers.get("x-forwarded-for") or (request.client.host if request.client else None)
    ua = request.headers.get("user-agent")

    consent = await create_consent(
        db,
        email=(payload.email or None),
        phone=(payload.phone or None),
        consent_type=payload.consent_type,
        ip=ip_addr,
        ua=ua,
        consent_text_version=payload.consent_text_version or "v1",
    )

    logger.info("Consent created type=%s id=%s", payload.consent_type, consent.id)
    return {"consent_id": str(consent.id), "user_hash": consent.user_hash}


@router.get("/{user_hash}")
@audit_log(action="consent_check", target="consent")
async def check_consent_endpoint(user_hash: str, db: AsyncSession = Depends(get_db)) -> Dict[str, bool]:
    """Возвращает статус всех типов согласий по user_hash (без ПД)."""
    statuses: Dict[str, bool] = {}
    for ct in ConsentType:
        statuses[ct.value] = await check_consent(db, user_hash=user_hash, consent_type=ct)
    return statuses


@router.post("/{id}/revoke", status_code=status.HTTP_200_OK)
@audit_log(action="consent_revoke", target="consent")
async def revoke_consent_endpoint(
    id: UUID,
    request: Request,
    user: CurrentUser = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> Dict[str, Any]:
    """Отзывает согласие и при необходимости удаляет связанные данные."""
    # Получим согласие, чтобы понять тип и user_hash
    res = await db.execute(select(UserConsent).where(UserConsent.id == id))
    consent = res.scalars().first()
    if not consent:
        raise HTTPException(status_code=404, detail="Consent not found")

    await revoke_consent(db, consent_id=id)

    deleted = 0
    # Если отзывается согласие на обработку ПД — удаляем связанные данные
    if consent.consent_type == ConsentType.personal_data:
        deleted = await delete_user_data(db, user_hash=consent.user_hash)

    ip_addr = request.headers.get("x-forwarded-for") or (request.client.host if request.client else None)
    ua = request.headers.get("user-agent")
    logger.info("Consent revoked id=%s by %s ip=%s ua=%s deleted_leads=%s", id, user.email, ip_addr, ua, deleted)

    return {"revoked": True, "deleted_leads": deleted}
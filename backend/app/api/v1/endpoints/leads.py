"""
Leads endpoints: заявки/лиды с ПДн (шифрование, аудит, согласия).

Требования:
- POST /leads: создать заявку (публичный), проверить согласие, зашифровать ПД, создать аудит, отправить уведомление
- GET /leads: список заявок (auth), только метаданные (ID, статус, дата)
- GET /leads/{id}: одна заявка (auth), расшифровать ПД, аудит "lead_viewed"
- PUT /leads/{id}/status: изменить статус (auth)
- DELETE /leads/{id}: безвозвратное удаление (auth, права), аудит "lead_deleted"

Критически важно:
- @audit_log на все операции с ПД
- Никогда не логировать расшифрованные ПД
- Все ПД шифруются перед сохранением
- IP адреса тоже шифруются (в согласии)
- При каждом доступе к расшифрованным данным — запись аудита
"""
from __future__ import annotations

import logging
from typing import Dict, Any, List, Optional
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Request, status
from pydantic import BaseModel, EmailStr
from sqlalchemy import select, update, delete
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.security import audit_log
from app.core.config import settings
from app.dependencies.auth import get_current_user, CurrentUser
from app.models.lead import Lead, LeadStatus, LeadSource
from app.models.consent import UserConsent
from app.services.encryption_service import encrypt_personal_data, decrypt_personal_data
from app.tasks.notifications import notify_admins_new_lead

logger = logging.getLogger("api.leads")
router = APIRouter()


class LeadCreatePayload(BaseModel):
    name: str
    email: EmailStr
    phone: str
    company: Optional[str] = None
    message: Optional[str] = None
    consent_id: UUID
    source: LeadSource = LeadSource.contact_form


class LeadStatusUpdate(BaseModel):
    status: LeadStatus


@router.post("/", status_code=status.HTTP_201_CREATED)
@audit_log(action="lead_created", target="lead")
async def create_lead(
    payload: LeadCreatePayload,
    request: Request,
    db: AsyncSession = Depends(get_db),
) -> Dict[str, Any]:
    """Создаёт лид: проверяет согласие, шифрует ПД, пишет аудит, шлёт уведомление."""
    # Проверка согласия
    cres = await db.execute(select(UserConsent).where(UserConsent.id == payload.consent_id))
    consent = cres.scalars().first()
    if not consent or (not consent.is_granted) or consent.revoked_at is not None:
        raise HTTPException(status_code=400, detail="Valid consent is required")

    # Никогда не логировать расшифрованные ПД: готовим словарь для шифрования
    personal_data = {
        "name": payload.name,
        "email": payload.email,
        "phone": payload.phone,
        "company": payload.company,
        "message": payload.message,
    }
    encrypted_blob = encrypt_personal_data(personal_data)

    lead = Lead(
        encrypted_data=encrypted_blob,
        consent_id=payload.consent_id,
        source=payload.source,
        status=LeadStatus.new,
    )
    db.add(lead)
    await db.commit()
    await db.refresh(lead)

    # Celery-уведомление админам (оборачиваем, чтобы отсутствие брокера не падало API)
    try:
        notify_admins_new_lead.delay(
            str(lead.id),
            lead.status.value,
            lead.source.value,
            lead.created_at.isoformat() if lead.created_at else "",
        )
    except Exception:
        logger.warning("Celery notification failed or not configured")

    return {"id": str(lead.id), "status": lead.status.value, "created_at": lead.created_at.isoformat() if lead.created_at else None}


@router.get("/", status_code=status.HTTP_200_OK)
@audit_log(action="lead_list", target="lead")
async def list_leads(
    user: CurrentUser = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> List[Dict[str, Any]]:
    """Возвращает только метаданные: id, статус, дата создания (без ПД)."""
    res = await db.execute(select(Lead))
    items = []
    for lead in res.scalars().all():
        items.append({
            "id": str(lead.id),
            "status": lead.status.value,
            "created_at": lead.created_at.isoformat() if lead.created_at else None,
        })
    return items


@router.get("/{id}", status_code=status.HTTP_200_OK)
@audit_log(action="lead_viewed", target="lead")
async def get_lead(
    id: UUID,
    request: Request,
    user: CurrentUser = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> Dict[str, Any]:
    """Возвращает один лид с расшифрованными ПД (аудит просмотра)."""
    res = await db.execute(select(Lead).where(Lead.id == id))
    lead = res.scalars().first()
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")

    # Расшифровка ПД: НЕ логировать содержимое
    data = decrypt_personal_data(lead.encrypted_data)

    return {
        "id": str(lead.id),
        "status": lead.status.value,
        "source": lead.source.value,
        "created_at": lead.created_at.isoformat() if lead.created_at else None,
        "assigned_to": lead.assigned_to,
        "consent_id": str(lead.consent_id) if lead.consent_id else None,
        "data": data,
    }


@router.put("/{id}/status", status_code=status.HTTP_200_OK)
@audit_log(action="lead_status_update", target="lead")
async def update_lead_status(
    id: UUID,
    payload: LeadStatusUpdate,
    user: CurrentUser = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> Dict[str, Any]:
    """Изменяет статус лида."""
    res = await db.execute(select(Lead).where(Lead.id == id))
    lead = res.scalars().first()
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")

    lead.status = payload.status
    await db.commit()
    await db.refresh(lead)

    return {"id": str(lead.id), "status": lead.status.value}


@router.delete("/{id}", status_code=status.HTTP_200_OK)
@audit_log(action="lead_deleted", target="lead")
async def delete_lead(
    id: UUID,
    user: CurrentUser = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> Dict[str, Any]:
    """Безвозвратно удаляет лид (по запросу пользователя, проверка прав)."""
    # Проверка прав: допускаем только администратора
    if user.email != settings.ADMIN_USERNAME:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Insufficient permissions")

    res = await db.execute(select(Lead).where(Lead.id == id))
    lead = res.scalars().first()
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")

    await db.execute(delete(Lead).where(Lead.id == id))
    await db.commit()

    return {"deleted": True, "id": str(id)}
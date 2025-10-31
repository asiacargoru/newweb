"""
Сервис соответствия ФЗ-152: управление согласиями и данными пользователей.
"""
from __future__ import annotations

from typing import Dict, Any, Optional, List
from datetime import datetime
from uuid import UUID

from sqlalchemy import select, delete, update
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.models.consent import UserConsent, ConsentType
from app.models.lead import Lead
from app.services.encryption_service import encrypt_text, hash_user_identifier, decrypt_personal_data


def record_audit(actor: str, action: str, target: str, metadata: Dict[str, Any] | None = None) -> Dict[str, Any]:
    """Заглушка: формирует структуру записи аудита (саму запись делает эндпоинт)."""
    return {
        "actor": actor,
        "action": action,
        "target": target,
        "metadata": metadata or {},
        "timestamp": datetime.utcnow().isoformat(),
        "region": settings.GDPR_REGION,
    }


async def create_consent(
    db: AsyncSession,
    *,
    email: Optional[str],
    phone: Optional[str],
    consent_type: ConsentType,
    ip: Optional[str],
    ua: Optional[str],
    consent_text_version: str = "v1",
) -> UserConsent:
    """Создаёт согласие пользователя: шифрует IP, сохраняет user_hash."""
    user_hash = hash_user_identifier(email, phone)
    ip_enc = encrypt_text(ip or "") or ""

    # Если уже есть согласие для user_hash и данного типа — обновим/возобновим
    existing_res = await db.execute(
        select(UserConsent).where(UserConsent.user_hash == user_hash, UserConsent.consent_type == consent_type)
    )
    consent = existing_res.scalars().first()
    if consent:
        consent.is_granted = True
        consent.revoked_at = None
        consent.ip_address = ip_enc
        consent.user_agent = ua or ""
        consent.consent_text_version = consent_text_version
    else:
        consent = UserConsent(
            user_hash=user_hash,
            consent_type=consent_type,
            is_granted=True,
            ip_address=ip_enc,
            user_agent=ua or "",
            consent_text_version=consent_text_version,
        )
        db.add(consent)

    await db.commit()
    await db.refresh(consent)
    return consent


async def check_consent(db: AsyncSession, *, user_hash: str, consent_type: ConsentType) -> bool:
    """Проверяет активность согласия по user_hash и типу."""
    res = await db.execute(
        select(UserConsent).where(
            UserConsent.user_hash == user_hash,
            UserConsent.consent_type == consent_type,
            UserConsent.is_granted == True,
            UserConsent.revoked_at.is_(None),
        )
    )
    return res.scalars().first() is not None


async def revoke_consent(db: AsyncSession, *, consent_id: UUID) -> None:
    """Отзывает согласие: выставляет revoked_at, is_granted=False."""
    await db.execute(
        update(UserConsent).where(UserConsent.id == consent_id).values(revoked_at=datetime.utcnow(), is_granted=False)
    )
    await db.commit()


async def export_user_data(db: AsyncSession, *, user_hash: str) -> Dict[str, Any]:
    """Экспорт данных пользователя: расшифровывает все лиды, связанные с его согласиями."""
    cres = await db.execute(select(UserConsent).where(UserConsent.user_hash == user_hash))
    consents = cres.scalars().all()
    consent_ids: List[UUID] = [c.id for c in consents]
    if not consent_ids:
        return {"user_hash": user_hash, "leads": []}

    lres = await db.execute(select(Lead).where(Lead.consent_id.in_(consent_ids)))
    leads = lres.scalars().all()

    result = []
    for lead in leads:
        # ВНИМАНИЕ: не логировать расшифрованные данные
        data = decrypt_personal_data(lead.encrypted_data)
        result.append({
            "id": str(lead.id),
            "status": lead.status.value,
            "source": lead.source.value,
            "created_at": lead.created_at.isoformat() if lead.created_at else None,
            "data": data,
        })
    return {"user_hash": user_hash, "leads": result}


async def delete_user_data(db: AsyncSession, *, user_hash: str) -> int:
    """Полное удаление данных: удаляет лиды, связанные с user_hash;
    согласия помечает как отозванные.
    Возвращает количество удалённых лидов.
    """
    cres = await db.execute(select(UserConsent).where(UserConsent.user_hash == user_hash))
    consents = cres.scalars().all()
    consent_ids: List[UUID] = [c.id for c in consents]
    deleted_count = 0

    if consent_ids:
        # Удаляем лиды
        lres = await db.execute(select(Lead).where(Lead.consent_id.in_(consent_ids)))
        leads = lres.scalars().all()
        deleted_count = len(leads)
        await db.execute(delete(Lead).where(Lead.consent_id.in_(consent_ids)))

        # Помечаем согласия как отозванные
        await db.execute(
            update(UserConsent)
            .where(UserConsent.id.in_(consent_ids))
            .values(revoked_at=datetime.utcnow(), is_granted=False)
        )

        await db.commit()

    return deleted_count
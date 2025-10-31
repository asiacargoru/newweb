"""
UserConsent model (async SQLAlchemy, PostgreSQL).
- UUID primary key
- user_hash (SHA-256 of email+phone) as identifier without storing PD
- consent_type enum
- encrypted ip_address string
- common indexes and relationship to leads
"""
from __future__ import annotations

import uuid
from datetime import datetime
from enum import Enum
from typing import List, Optional

from sqlalchemy import String, Text, Boolean, DateTime, Enum as SAEnum, Index
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import func
from sqlalchemy.dialects.postgresql import UUID as PGUUID

from app.core.database import Base


class ConsentType(str, Enum):
    personal_data = "personal_data"
    marketing = "marketing"
    analytics = "analytics"


class UserConsent(Base):
    __tablename__ = "user_consents"

    id: Mapped[uuid.UUID] = mapped_column(PGUUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    user_hash: Mapped[str] = mapped_column(String(64), index=True, unique=True)  # SHA-256 hex
    consent_type: Mapped[ConsentType] = mapped_column(SAEnum(ConsentType, name="consent_type", native_enum=False), index=True)
    is_granted: Mapped[bool] = mapped_column(Boolean, default=True, index=True)

    ip_address: Mapped[str] = mapped_column(String(128))  # encrypted string
    user_agent: Mapped[str] = mapped_column(Text)

    consent_text_version: Mapped[str] = mapped_column(String(32))

    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    revoked_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)

    # Relationships
    leads: Mapped[List["Lead"]] = relationship(back_populates="consent")

    __table_args__ = (
        Index("ix_user_consents_user_hash", "user_hash", unique=True),
        Index("ix_user_consents_type_granted", "consent_type", "is_granted"),
    )

    def __repr__(self) -> str:
        return f"<UserConsent id={self.id} type={self.consent_type} granted={self.is_granted}>"

    def to_dict(self) -> dict:
        return {
            "id": str(self.id),
            "user_hash": self.user_hash,
            "consent_type": self.consent_type.value if isinstance(self.consent_type, ConsentType) else self.consent_type,
            "is_granted": self.is_granted,
            "ip_address": self.ip_address,
            "user_agent": self.user_agent,
            "consent_text_version": self.consent_text_version,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "revoked_at": self.revoked_at.isoformat() if self.revoked_at else None,
        }
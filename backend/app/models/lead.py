"""
Lead model (async SQLAlchemy, PostgreSQL).
- UUID primary key
- encrypted_data: BYTEA (encrypted JSON PD)
- FK to UserConsent
- enums: source, status
- common indexes
"""
from __future__ import annotations

import base64
import uuid
from datetime import datetime
from enum import Enum
from typing import Optional

from sqlalchemy import String, Text, DateTime, LargeBinary, ForeignKey, Enum as SAEnum, Index
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import func
from sqlalchemy.dialects.postgresql import UUID as PGUUID

from app.core.database import Base


class LeadSource(str, Enum):
    contact_form = "contact_form"
    quote_form = "quote_form"


class LeadStatus(str, Enum):
    new = "new"
    in_progress = "in_progress"
    closed = "closed"


class Lead(Base):
    __tablename__ = "leads"

    id: Mapped[uuid.UUID] = mapped_column(PGUUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    encrypted_data: Mapped[bytes] = mapped_column(LargeBinary)  # encrypted JSON {name, phone, email, company, message}

    consent_id: Mapped[Optional[uuid.UUID]] = mapped_column(
        PGUUID(as_uuid=True), ForeignKey("user_consents.id", ondelete="SET NULL"), nullable=True, index=True
    )
    consent: Mapped[Optional["UserConsent"]] = relationship(back_populates="leads")

    source: Mapped[LeadSource] = mapped_column(SAEnum(LeadSource, name="lead_source", native_enum=False), index=True)
    status: Mapped[LeadStatus] = mapped_column(SAEnum(LeadStatus, name="lead_status", native_enum=False), index=True, default=LeadStatus.new)

    assigned_to: Mapped[Optional[str]] = mapped_column(String(255), nullable=True, index=True)  # manager email

    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    __table_args__ = (
        Index("ix_leads_status", "status"),
        Index("ix_leads_source", "source"),
        Index("ix_leads_assigned_to", "assigned_to"),
    )

    def __repr__(self) -> str:
        return f"<Lead id={self.id} status={self.status} source={self.source}>"

    def to_dict(self) -> dict:
        return {
            "id": str(self.id),
            "encrypted_data": base64.b64encode(self.encrypted_data).decode() if self.encrypted_data else None,
            "consent_id": str(self.consent_id) if self.consent_id else None,
            "source": self.source.value if isinstance(self.source, LeadSource) else self.source,
            "status": self.status.value if isinstance(self.status, LeadStatus) else self.status,
            "assigned_to": self.assigned_to,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }
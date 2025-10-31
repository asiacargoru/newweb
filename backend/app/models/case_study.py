"""
CaseStudy model (async SQLAlchemy, PostgreSQL).
- UUID primary key
- slug unique
- status enum (draft/published)
- relation to Country
- fields aligned with frontend CaseStudies component
"""
from __future__ import annotations

import uuid
from datetime import datetime
from enum import Enum
from typing import Optional

from sqlalchemy import String, Text, DateTime, ForeignKey, Enum as SAEnum, Index
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import func
from sqlalchemy.dialects.postgresql import UUID as PGUUID, JSONB

from app.core.database import Base


class CaseStatus(str, Enum):
    draft = "draft"
    published = "published"


class CaseStudy(Base):
    __tablename__ = "case_studies"

    id: Mapped[uuid.UUID] = mapped_column(PGUUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    slug: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    title: Mapped[str] = mapped_column(String(255))
    content: Mapped[str] = mapped_column(Text)

    client_name: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    cargo_type: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    delivery_time: Mapped[Optional[int]] = mapped_column(nullable=True)  # days
    images: Mapped[list[str]] = mapped_column(JSONB, default=list)

    status: Mapped[CaseStatus] = mapped_column(
        SAEnum(CaseStatus, name="case_status", native_enum=False),
        default=CaseStatus.draft,
        index=True,
    )

    country_id: Mapped[uuid.UUID] = mapped_column(
        PGUUID(as_uuid=True), ForeignKey("countries.id", ondelete="CASCADE"), index=True
    )
    country: Mapped["Country"] = relationship(back_populates="case_studies")

    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    __table_args__ = (
        Index("ix_case_studies_status_country", "status", "country_id"),
    )

    def __repr__(self) -> str:
        return f"<CaseStudy id={self.id} slug={self.slug!r} status={self.status}>"

    def to_dict(self) -> dict:
        return {
            "id": str(self.id),
            "slug": self.slug,
            "title": self.title,
            "content": self.content,
            "client_name": self.client_name,
            "cargo_type": self.cargo_type,
            "delivery_time": self.delivery_time,
            "images": self.images,
            "status": self.status.value if isinstance(self.status, CaseStatus) else self.status,
            "country_id": str(self.country_id),
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }
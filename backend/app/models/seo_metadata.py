"""
SEOMetadata model (async SQLAlchemy, PostgreSQL).
- UUID primary key
- entity_type enum (page/article/country/service)
- entity_id UUID
- unique path, common indexes
- optional OG image and schema markup
"""
from __future__ import annotations

import uuid
from datetime import datetime
from enum import Enum
from typing import Optional

from sqlalchemy import String, Text, DateTime, Enum as SAEnum, Index
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.sql import func
from sqlalchemy.dialects.postgresql import UUID as PGUUID, JSONB

from app.core.database import Base


class SEOEntityType(str, Enum):
    page = "page"
    article = "article"
    country = "country"
    service = "service"


class SEOMetadata(Base):
    __tablename__ = "seo_metadata"

    id: Mapped[uuid.UUID] = mapped_column(PGUUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    entity_type: Mapped[SEOEntityType] = mapped_column(
        SAEnum(SEOEntityType, name="seo_entity_type", native_enum=False), index=True
    )
    entity_id: Mapped[uuid.UUID] = mapped_column(PGUUID(as_uuid=True), index=True)

    path: Mapped[str] = mapped_column(String(512), unique=True, index=True)  # URL path

    title: Mapped[str] = mapped_column(String(255))
    description: Mapped[str] = mapped_column(Text)

    keywords: Mapped[list[str]] = mapped_column(JSONB, default=list)
    og_image: Mapped[Optional[str]] = mapped_column(String(512), nullable=True)

    schema_markup: Mapped[Optional[dict]] = mapped_column(JSONB, nullable=True)
    canonical_url: Mapped[Optional[str]] = mapped_column(String(512), nullable=True)

    robots: Mapped[str] = mapped_column(String(64), default="index, follow")

    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    __table_args__ = (
        Index("ix_seo_metadata_entity", "entity_type", "entity_id", unique=True),
        Index("ix_seo_metadata_path", "path", unique=True),
        Index("ix_seo_metadata_updated_at", "updated_at"),
    )

    def __repr__(self) -> str:
        return f"<SEOMetadata id={self.id} entity={self.entity_type}:{self.entity_id} path={self.path!r}>"

    def to_dict(self) -> dict:
        return {
            "id": str(self.id),
            "entity_type": self.entity_type.value if isinstance(self.entity_type, SEOEntityType) else self.entity_type,
            "entity_id": str(self.entity_id),
            "path": self.path,
            "title": self.title,
            "description": self.description,
            "keywords": self.keywords,
            "og_image": self.og_image,
            "schema_markup": self.schema_markup,
            "canonical_url": self.canonical_url,
            "robots": self.robots,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }
"""
Country model (async SQLAlchemy, PostgreSQL).
- UUID primary key
- ISO alpha-2 code unique
- relationships to Article and Service
- common indexes
"""
from __future__ import annotations

import uuid
from datetime import datetime
from typing import List

from sqlalchemy import String, Boolean, DateTime, Index
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import func
from sqlalchemy.dialects.postgresql import UUID as PGUUID, JSONB

from app.core.database import Base


class Country(Base):
    __tablename__ = "countries"

    id: Mapped[uuid.UUID] = mapped_column(PGUUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    code: Mapped[str] = mapped_column(String(2), unique=True, index=True)  # ISO alpha-2
    name_ru: Mapped[str] = mapped_column(String(255))
    name_en: Mapped[str] = mapped_column(String(255))
    flag_emoji: Mapped[str] = mapped_column(String(8))
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, index=True)

    seo_data: Mapped[dict] = mapped_column(JSONB, default=dict)  # {title, description, keywords}

    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    articles: Mapped[List["Article"]] = relationship(back_populates="country", cascade="all, delete-orphan")
    services: Mapped[List["Service"]] = relationship(back_populates="country", cascade="all, delete-orphan")
    case_studies: Mapped[List["CaseStudy"]] = relationship(back_populates="country", cascade="all, delete-orphan")

    __table_args__ = (
        Index("ix_countries_code", "code", unique=True),
        Index("ix_countries_is_active", "is_active"),
    )

    def __repr__(self) -> str:
        return f"<Country id={self.id} code={self.code!r} active={self.is_active}>"

    def to_dict(self) -> dict:
        return {
            "id": str(self.id),
            "code": self.code,
            "name_ru": self.name_ru,
            "name_en": self.name_en,
            "flag_emoji": self.flag_emoji,
            "is_active": self.is_active,
            "seo_data": self.seo_data,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }
"""
Article model (async SQLAlchemy, PostgreSQL).
- UUID primary key
- slug unique
- status enum (draft/published/archived)
- optional relation to Country
- common indexes
"""
from __future__ import annotations

import uuid
from datetime import datetime
from enum import Enum
from typing import Optional

from sqlalchemy import String, Text, DateTime, Boolean, ForeignKey, Enum as SAEnum, Index
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import func
from sqlalchemy.dialects.postgresql import UUID as PGUUID, JSONB

from app.core.database import Base


class ArticleStatus(str, Enum):
    draft = "draft"
    published = "published"
    archived = "archived"


class Article(Base):
    __tablename__ = "articles"

    id: Mapped[uuid.UUID] = mapped_column(PGUUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    slug: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    title: Mapped[str] = mapped_column(String(255))
    content: Mapped[str] = mapped_column(Text)

    seo_title: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    seo_description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    seo_keywords: Mapped[list[str]] = mapped_column(JSONB, default=list)

    status: Mapped[ArticleStatus] = mapped_column(
        SAEnum(ArticleStatus, name="article_status", native_enum=False),
        default=ArticleStatus.draft,
        index=True,
    )

    country_id: Mapped[Optional[uuid.UUID]] = mapped_column(
        PGUUID(as_uuid=True), ForeignKey("countries.id", ondelete="SET NULL"), nullable=True, index=True
    )
    country: Mapped[Optional["Country"]] = relationship(back_populates="articles")

    auto_generated: Mapped[bool] = mapped_column(Boolean, default=False)
    views_count: Mapped[int] = mapped_column(default=0)

    published_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)

    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    __table_args__ = (
        Index("ix_articles_status_country", "status", "country_id"),
        Index("ix_articles_published_at", "published_at"),
    )

    def __repr__(self) -> str:
        return f"<Article id={self.id} slug={self.slug!r} status={self.status}>"

    def to_dict(self) -> dict:
        return {
            "id": str(self.id),
            "slug": self.slug,
            "title": self.title,
            "content": self.content,
            "seo_title": self.seo_title,
            "seo_description": self.seo_description,
            "seo_keywords": self.seo_keywords,
            "status": self.status.value if isinstance(self.status, ArticleStatus) else self.status,
            "country_id": str(self.country_id) if self.country_id else None,
            "auto_generated": self.auto_generated,
            "views_count": self.views_count,
            "published_at": self.published_at.isoformat() if self.published_at else None,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }
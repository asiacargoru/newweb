"""
Pydantic-схемы для Article.
"""
from __future__ import annotations

from datetime import datetime
from typing import Optional, List
from uuid import UUID

from pydantic import BaseModel, Field

from app.models.article import ArticleStatus


class ArticleBase(BaseModel):
    slug: str
    title: str
    content: str
    seo_title: Optional[str] = None
    seo_description: Optional[str] = None
    seo_keywords: List[str] = Field(default_factory=list)
    country_id: Optional[UUID] = None
    auto_generated: bool = False

    class Config:
        from_attributes = True


class ArticleCreate(ArticleBase):
    status: Optional[ArticleStatus] = ArticleStatus.draft
    published_at: Optional[datetime] = None


class ArticleUpdate(BaseModel):
    slug: Optional[str] = None
    title: Optional[str] = None
    content: Optional[str] = None
    seo_title: Optional[str] = None
    seo_description: Optional[str] = None
    seo_keywords: Optional[List[str]] = None
    status: Optional[ArticleStatus] = None
    country_id: Optional[UUID] = None
    auto_generated: Optional[bool] = None
    published_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class ArticleOut(BaseModel):
    id: UUID
    slug: str
    title: str
    content: str
    seo_title: Optional[str] = None
    seo_description: Optional[str] = None
    seo_keywords: List[str] = Field(default_factory=list)
    status: ArticleStatus
    country_id: Optional[UUID] = None
    auto_generated: bool
    views_count: int
    published_at: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class PaginatedArticles(BaseModel):
    items: List[ArticleOut]
    total: int
    limit: int
    offset: int


class SitemapItem(BaseModel):
    loc: str
    lastmod: Optional[str] = None
    changefreq: Optional[str] = None
    priority: Optional[float] = None

    class Config:
        from_attributes = True
"""
Pydantic-схемы для SEOMetadata.
"""
from __future__ import annotations

from datetime import datetime
from typing import Optional, List
from uuid import UUID

from pydantic import BaseModel

from app.models.seo_metadata import SEOEntityType


class SEOMetadataBase(BaseModel):
    entity_type: SEOEntityType
    entity_id: UUID
    path: str
    title: str
    description: str
    keywords: List[str] = []
    og_image: Optional[str] = None
    schema_markup: Optional[dict] = None
    canonical_url: Optional[str] = None
    robots: str = "index, follow"

    class Config:
        from_attributes = True


class SEOMetadataCreate(SEOMetadataBase):
    pass


class SEOMetadataOut(BaseModel):
    id: UUID
    entity_type: SEOEntityType
    entity_id: UUID
    path: str
    title: str
    description: str
    keywords: List[str]
    og_image: Optional[str] = None
    schema_markup: Optional[dict] = None
    canonical_url: Optional[str] = None
    robots: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
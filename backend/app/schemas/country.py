"""
Pydantic-схемы для Country.
"""
from __future__ import annotations

from datetime import datetime
from typing import Optional, List
from uuid import UUID

from pydantic import BaseModel, Field

from app.schemas.service import ServiceOut
from app.schemas.seo_metadata import SEOMetadataOut


class CountryBase(BaseModel):
    code: str
    name_ru: str
    name_en: str
    flag_emoji: str
    is_active: bool = True
    seo_data: dict = Field(default_factory=dict)

    class Config:
        from_attributes = True


class CountryCreate(CountryBase):
    pass


class CountryUpdate(BaseModel):
    name_ru: Optional[str] = None
    name_en: Optional[str] = None
    flag_emoji: Optional[str] = None
    is_active: Optional[bool] = None
    seo_data: Optional[dict] = None

    class Config:
        from_attributes = True


class CountryOut(BaseModel):
    id: UUID
    code: str
    name_ru: str
    name_en: str
    flag_emoji: str
    is_active: bool
    seo_data: dict
    created_at: datetime

    articles_count: int = 0
    services: List[ServiceOut] = Field(default_factory=list)
    seo: Optional[SEOMetadataOut] = None

    class Config:
        from_attributes = True
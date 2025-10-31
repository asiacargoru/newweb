"""
Pydantic-схемы для Service.
"""
from __future__ import annotations

from datetime import datetime
from typing import Optional
from uuid import UUID

from pydantic import BaseModel

from app.models.service import ServiceType


class ServiceBase(BaseModel):
    country_id: UUID
    service_type: ServiceType
    title_ru: str
    title_en: str
    description: str
    price_info: dict
    transit_time_days: int
    is_active: bool = True

    class Config:
        from_attributes = True


class ServiceCreate(ServiceBase):
    pass


class ServiceUpdate(BaseModel):
    service_type: Optional[ServiceType] = None
    title_ru: Optional[str] = None
    title_en: Optional[str] = None
    description: Optional[str] = None
    price_info: Optional[dict] = None
    transit_time_days: Optional[int] = None
    is_active: Optional[bool] = None

    class Config:
        from_attributes = True


class ServiceOut(BaseModel):
    id: UUID
    country_id: UUID
    service_type: ServiceType
    title_ru: str
    title_en: str
    description: str
    price_info: dict
    transit_time_days: int
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True
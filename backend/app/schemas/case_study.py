"""
Pydantic-схемы для CaseStudy.
"""
from __future__ import annotations

from datetime import datetime
from typing import Optional, List
from uuid import UUID

from pydantic import BaseModel, Field

from app.models.case_study import CaseStatus


class CaseStudyBase(BaseModel):
    slug: str
    title: str
    content: str
    client_name: Optional[str] = None
    cargo_type: Optional[str] = None
    delivery_time: Optional[int] = None
    images: List[str] = Field(default_factory=list)
    country_id: UUID
    status: CaseStatus = CaseStatus.draft

    class Config:
        from_attributes = True


class CaseStudyCreate(CaseStudyBase):
    pass


class CaseStudyUpdate(BaseModel):
    slug: Optional[str] = None
    title: Optional[str] = None
    content: Optional[str] = None
    client_name: Optional[str] = None
    cargo_type: Optional[str] = None
    delivery_time: Optional[int] = None
    images: Optional[List[str]] = None
    country_id: Optional[UUID] = None
    status: Optional[CaseStatus] = None

    class Config:
        from_attributes = True


class CaseStudyOut(BaseModel):
    id: UUID
    slug: str
    title: str
    content: str
    client_name: Optional[str] = None
    cargo_type: Optional[str] = None
    delivery_time: Optional[int] = None
    images: List[str]
    country_id: UUID
    status: CaseStatus
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class PaginatedCaseStudies(BaseModel):
    items: List[CaseStudyOut]
    total: int
    limit: int
    offset: int
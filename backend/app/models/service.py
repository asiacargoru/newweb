"""
Service model (async SQLAlchemy, PostgreSQL).
- UUID primary key
- relation to Country
- service_type enum (auto/railway/air/sea/customs)
- common indexes
"""
from __future__ import annotations

import uuid
from datetime import datetime
from enum import Enum
from typing import Optional

from sqlalchemy import String, Text, Integer, Boolean, DateTime, ForeignKey, Enum as SAEnum, Index
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import func
from sqlalchemy.dialects.postgresql import UUID as PGUUID, JSONB

from app.core.database import Base


class ServiceType(str, Enum):
    auto = "auto"
    railway = "railway"
    air = "air"
    sea = "sea"
    customs = "customs"


class Service(Base):
    __tablename__ = "services"

    id: Mapped[uuid.UUID] = mapped_column(PGUUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    country_id: Mapped[uuid.UUID] = mapped_column(PGUUID(as_uuid=True), ForeignKey("countries.id", ondelete="CASCADE"), index=True)
    country: Mapped["Country"] = relationship(back_populates="services")

    service_type: Mapped[ServiceType] = mapped_column(
        SAEnum(ServiceType, name="service_type", native_enum=False), index=True
    )

    title_ru: Mapped[str] = mapped_column(String(255))
    title_en: Mapped[str] = mapped_column(String(255))
    description: Mapped[str] = mapped_column(Text)

    price_info: Mapped[dict] = mapped_column(JSONB, default=dict)  # {currency, from_price, features[]}

    transit_time_days: Mapped[int] = mapped_column(Integer)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, index=True)

    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())

    __table_args__ = (
        Index("ix_services_country_type", "country_id", "service_type"),
        Index("ix_services_is_active", "is_active"),
    )

    def __repr__(self) -> str:
        return f"<Service id={self.id} type={self.service_type} country_id={self.country_id}>"

    def to_dict(self) -> dict:
        return {
            "id": str(self.id),
            "country_id": str(self.country_id),
            "service_type": self.service_type.value if isinstance(self.service_type, ServiceType) else self.service_type,
            "title_ru": self.title_ru,
            "title_en": self.title_en,
            "description": self.description,
            "price_info": self.price_info,
            "transit_time_days": self.transit_time_days,
            "is_active": self.is_active,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }
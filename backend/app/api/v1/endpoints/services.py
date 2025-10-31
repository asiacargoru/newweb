from __future__ import annotations

import logging
from typing import List
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.cache import cache_get, cache_set
from app.dependencies.auth import get_current_user, CurrentUser
from app.models.service import Service
from app.models.country import Country
from app.models.audit_log import AuditLog
from app.schemas.service import ServiceCreate, ServiceUpdate, ServiceOut

logger = logging.getLogger("api.services")
router = APIRouter()


@router.get("/", response_model=List[ServiceOut], response_model_exclude_none=True)
async def list_services(db: AsyncSession = Depends(get_db)) -> List[ServiceOut]:
    logger.info("List services")
    cache_key = "services:list"
    cached = await cache_get(cache_key)
    if cached:
        return [ServiceOut(**s) for s in cached]

    res = await db.execute(select(Service))
    items = [ServiceOut.model_validate(s, from_attributes=True) for s in res.scalars().all()]
    await cache_set(cache_key, [i.model_dump() for i in items])
    return items


@router.get("/by-country/{country_code}", response_model=List[ServiceOut], response_model_exclude_none=True)
async def services_by_country(country_code: str, db: AsyncSession = Depends(get_db)) -> List[ServiceOut]:
    logger.info("List services by country: %s", country_code)
    cache_key = f"services:country:{country_code}"
    cached = await cache_get(cache_key)
    if cached:
        return [ServiceOut(**s) for s in cached]

    cres = await db.execute(select(Country).where(Country.code == country_code))
    country = cres.scalars().first()
    if not country:
        raise HTTPException(status_code=404, detail="Country not found")

    sres = await db.execute(select(Service).where(Service.country_id == country.id))
    items = [ServiceOut.model_validate(s, from_attributes=True) for s in sres.scalars().all()]
    await cache_set(cache_key, [i.model_dump() for i in items])
    return items


@router.post("/", response_model=ServiceOut, response_model_exclude_none=True, status_code=status.HTTP_201_CREATED)
async def create_service(
    payload: ServiceCreate,
    request: Request,
    user: CurrentUser = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> ServiceOut:
    logger.info("Create service type=%s for country=%s by %s", payload.service_type, payload.country_id, user.email)

    # Ensure country exists
    cres = await db.execute(select(Country).where(Country.id == payload.country_id))
    if not cres.scalars().first():
        raise HTTPException(status_code=400, detail="Country does not exist")

    service = Service(
        country_id=payload.country_id,
        service_type=payload.service_type,
        title_ru=payload.title_ru,
        title_en=payload.title_en,
        description=payload.description,
        price_info=payload.price_info or {},
        transit_time_days=payload.transit_time_days,
        is_active=payload.is_active,
    )
    db.add(service)
    await db.commit()
    await db.refresh(service)

    ip_addr = request.headers.get("x-forwarded-for") or (request.client.host if request.client else None)
    ua = request.headers.get("user-agent")
    db.add(
        AuditLog(
            action="service_create",
            entity_type="service",
            entity_id=service.id,
            user_id=user.email,
            ip_address=ip_addr or "",
            user_agent=ua or "",
            details={"country_id": str(service.country_id), "service_type": str(service.service_type)},
        )
    )
    await db.commit()

    return ServiceOut.model_validate(service, from_attributes=True)


@router.put("/{id}", response_model=ServiceOut, response_model_exclude_none=True)
async def update_service(
    id: UUID,
    payload: ServiceUpdate,
    request: Request,
    user: CurrentUser = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> ServiceOut:
    logger.info("Update service %s by %s", id, user.email)
    res = await db.execute(select(Service).where(Service.id == id))
    service = res.scalars().first()
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")

    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(service, field, value)

    await db.commit()
    await db.refresh(service)

    ip_addr = request.headers.get("x-forwarded-for") or (request.client.host if request.client else None)
    ua = request.headers.get("user-agent")
    db.add(
        AuditLog(
            action="service_update",
            entity_type="service",
            entity_id=service.id,
            user_id=user.email,
            ip_address=ip_addr or "",
            user_agent=ua or "",
            details={"updated_fields": list(payload.model_dump(exclude_unset=True).keys())},
        )
    )
    await db.commit()

    return ServiceOut.model_validate(service, from_attributes=True)
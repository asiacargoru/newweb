from __future__ import annotations

import logging
from typing import Optional
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query, Request, status
from sqlalchemy import select, func, desc
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.cache import cache_get, cache_set
from app.dependencies.auth import get_current_user, CurrentUser
from app.models.case_study import CaseStudy, CaseStatus
from app.models.audit_log import AuditLog
from app.schemas.case_study import (
    CaseStudyCreate,
    CaseStudyUpdate,
    CaseStudyOut,
    PaginatedCaseStudies,
)

logger = logging.getLogger("api.case_studies")
router = APIRouter()


@router.get("/", response_model=PaginatedCaseStudies, response_model_exclude_none=True)
async def list_case_studies(
    status_filter: Optional[str] = Query(None, description="draft/published"),
    country_id: Optional[UUID] = Query(None),
    limit: int = Query(20, ge=1, le=100),
    offset: int = Query(0, ge=0),
    order_by: str = Query("created_at", pattern="^(created_at)$"),
    db: AsyncSession = Depends(get_db),
) -> PaginatedCaseStudies:
    logger.info("List case studies: status=%s country=%s order_by=%s", status_filter, country_id, order_by)
    cache_key = f"case_studies:list:{status_filter}:{country_id}:{limit}:{offset}:{order_by}"
    cached = await cache_get(cache_key)
    if cached:
        return PaginatedCaseStudies(**cached)

    query = select(CaseStudy)

    if status_filter:
        try:
            status_enum = CaseStatus(status_filter)
            query = query.where(CaseStudy.status == status_enum)
        except ValueError:
            raise HTTPException(status_code=400, detail="Invalid status filter")

    if country_id:
        query = query.where(CaseStudy.country_id == country_id)

    if order_by == "created_at":
        query = query.order_by(desc(CaseStudy.created_at))

    total_q = select(func.count()).select_from(CaseStudy)
    if status_filter:
        total_q = total_q.where(CaseStudy.status == CaseStatus(status_filter))
    if country_id:
        total_q = total_q.where(CaseStudy.country_id == country_id)

    query = query.limit(limit).offset(offset)

    items_res = await db.execute(query)
    items = items_res.scalars().all()

    total_res = await db.execute(total_q)
    total = int(total_res.scalar() or 0)

    payload = PaginatedCaseStudies(
        items=[CaseStudyOut.model_validate(i, from_attributes=True) for i in items],
        total=total,
        limit=limit,
        offset=offset,
    )
    await cache_set(cache_key, payload.model_dump())
    return payload


@router.get("/{slug}", response_model=CaseStudyOut, response_model_exclude_none=True)
async def get_case_study(slug: str, db: AsyncSession = Depends(get_db)) -> CaseStudyOut:
    logger.info("Get case study by slug: %s", slug)
    cache_key = f"case_studies:slug:{slug}"
    cached = await cache_get(cache_key)
    if cached:
        return CaseStudyOut(**cached)

    res = await db.execute(select(CaseStudy).where(CaseStudy.slug == slug))
    case = res.scalars().first()
    if not case:
        raise HTTPException(status_code=404, detail="Case study not found")
    out = CaseStudyOut.model_validate(case, from_attributes=True)
    await cache_set(cache_key, out.model_dump())
    return out


@router.post("/", response_model=CaseStudyOut, response_model_exclude_none=True, status_code=status.HTTP_201_CREATED)
async def create_case_study(
    payload: CaseStudyCreate,
    request: Request,
    user: CurrentUser = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> CaseStudyOut:
    logger.info("Create case study by %s slug=%s", user.email, payload.slug)

    # Unique slug check
    existing = await db.execute(select(CaseStudy).where(CaseStudy.slug == payload.slug))
    if existing.scalars().first():
        raise HTTPException(status_code=400, detail="Slug already exists")

    case = CaseStudy(
        slug=payload.slug,
        title=payload.title,
        content=payload.content,
        client_name=payload.client_name,
        cargo_type=payload.cargo_type,
        delivery_time=payload.delivery_time,
        images=payload.images or [],
        country_id=payload.country_id,
        status=payload.status or CaseStatus.draft,
    )
    db.add(case)
    await db.commit()
    await db.refresh(case)

    # Audit
    ip_addr = request.headers.get("x-forwarded-for") or (request.client.host if request.client else None)
    ua = request.headers.get("user-agent")
    db.add(
        AuditLog(
            action="case_create",
            entity_type="case_study",
            entity_id=case.id,
            user_id=user.email,
            ip_address=ip_addr or "",
            user_agent=ua or "",
            details={"slug": case.slug},
        )
    )
    await db.commit()

    return CaseStudyOut.model_validate(case, from_attributes=True)


@router.put("/{id}", response_model=CaseStudyOut, response_model_exclude_none=True)
async def update_case_study(
    id: UUID,
    payload: CaseStudyUpdate,
    request: Request,
    user: CurrentUser = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> CaseStudyOut:
    logger.info("Update case study %s by %s", id, user.email)
    res = await db.execute(select(CaseStudy).where(CaseStudy.id == id))
    case = res.scalars().first()
    if not case:
        raise HTTPException(status_code=404, detail="Case study not found")

    # If changing slug, ensure uniqueness
    if payload.slug and payload.slug != case.slug:
        existing = await db.execute(select(CaseStudy).where(CaseStudy.slug == payload.slug))
        if existing.scalars().first():
            raise HTTPException(status_code=400, detail="Slug already exists")

    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(case, field, value)

    await db.commit()
    await db.refresh(case)

    # Audit
    ip_addr = request.headers.get("x-forwarded-for") or (request.client.host if request.client else None)
    ua = request.headers.get("user-agent")
    db.add(
        AuditLog(
            action="case_update",
            entity_type="case_study",
            entity_id=case.id,
            user_id=user.email,
            ip_address=ip_addr or "",
            user_agent=ua or "",
            details={"updated_fields": list(payload.model_dump(exclude_unset=True).keys())},
        )
    )
    await db.commit()

    return CaseStudyOut.model_validate(case, from_attributes=True)
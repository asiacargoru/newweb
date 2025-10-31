from __future__ import annotations

import logging
from typing import List, Optional
from uuid import UUID
import uuid
from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.cache import cache_get, cache_set
from app.core.config import settings
from app.dependencies.auth import get_current_user, CurrentUser
from app.models.country import Country
from app.models.article import Article, ArticleStatus
from app.models.service import Service
from app.models.seo_metadata import SEOMetadata, SEOEntityType
from app.models.audit_log import AuditLog
from app.schemas.country import CountryCreate, CountryUpdate, CountryOut
from app.schemas.service import ServiceOut
from app.schemas.seo_metadata import SEOMetadataOut

logger = logging.getLogger("api.countries")
router = APIRouter()

DEV_COUNTRIES_FALLBACK = [
    CountryOut(
        id=uuid.uuid5(uuid.NAMESPACE_DNS, "country-ru"),
        code="RU",
        name_ru="Россия",
        name_en="Russia",
        flag_emoji="🇷🇺",
        is_active=True,
        seo_data={},
        created_at=datetime.utcnow(),
        articles_count=0,
        services=[],
        seo=None,
    ),
    CountryOut(
        id=uuid.uuid5(uuid.NAMESPACE_DNS, "country-cn"),
        code="CN",
        name_ru="Китай",
        name_en="China",
        flag_emoji="🇨🇳",
        is_active=True,
        seo_data={},
        created_at=datetime.utcnow(),
        articles_count=0,
        services=[],
        seo=None,
    ),
    CountryOut(
        id=uuid.uuid5(uuid.NAMESPACE_DNS, "country-kz"),
        code="KZ",
        name_ru="Казахстан",
        name_en="Kazakhstan",
        flag_emoji="🇰🇿",
        is_active=True,
        seo_data={},
        created_at=datetime.utcnow(),
        articles_count=0,
        services=[],
        seo=None,
    ),
]


@router.get("/", response_model=List[CountryOut], response_model_exclude_none=True)
async def list_countries(db: AsyncSession = Depends(get_db)) -> List[CountryOut]:
    logger.info("List active countries")
    cache_key = "countries:list:active"
    cached = await cache_get(cache_key)
    if cached:
        return [CountryOut(**c) for c in cached]

    try:
        res = await db.execute(select(Country).where(Country.is_active == True))
        countries = res.scalars().all()
        if not countries:
            return []

        ids = [c.id for c in countries]

        # Articles count (published)
        counts_res = await db.execute(
            select(Article.country_id, func.count()).where(Article.status == ArticleStatus.published, Article.country_id.in_(ids)).group_by(Article.country_id)
        )
        counts_map = {cid: int(cnt) for cid, cnt in counts_res.all()}

        # Services by country
        services_res = await db.execute(select(Service).where(Service.is_active == True, Service.country_id.in_(ids)))
        services = services_res.scalars().all()
        services_map: dict[UUID, list[ServiceOut]] = {}
        for s in services:
            services_map.setdefault(s.country_id, []).append(ServiceOut.model_validate(s, from_attributes=True))

        # SEO metadata
        seo_res = await db.execute(
            select(SEOMetadata).where(SEOMetadata.entity_type == SEOEntityType.country, SEOMetadata.entity_id.in_(ids))
        )
        seo_map = {m.entity_id: SEOMetadataOut.model_validate(m, from_attributes=True) for m in seo_res.scalars().all()}

        payload = [
            CountryOut(
                **CountryOut.model_validate(c, from_attributes=True).model_dump(),
                articles_count=counts_map.get(c.id, 0),
                services=services_map.get(c.id, []),
                seo=seo_map.get(c.id),
            )
            for c in countries
        ]

        await cache_set(cache_key, [p.model_dump() for p in payload])
        return payload
    except Exception as e:
        logger.error("list_countries DB error: %s", e)
        if settings.ENVIRONMENT == "dev":
            await cache_set(cache_key, [p.model_dump() for p in DEV_COUNTRIES_FALLBACK])
            return DEV_COUNTRIES_FALLBACK
        raise HTTPException(status_code=503, detail="Database unavailable")


@router.get("/{code}", response_model=CountryOut, response_model_exclude_none=True)
async def get_country(code: str, db: AsyncSession = Depends(get_db)) -> CountryOut:
    logger.info("Get country by code: %s", code)
    cache_key = f"countries:code:{code}"
    cached = await cache_get(cache_key)
    if cached:
        return CountryOut(**cached)

    try:
        res = await db.execute(select(Country).where(Country.code == code))
        country = res.scalars().first()
        if not country:
            raise HTTPException(status_code=404, detail="Country not found")

        # Related
        cnt_res = await db.execute(
            select(func.count()).select_from(Article).where(Article.status == ArticleStatus.published, Article.country_id == country.id)
        )
        articles_count = int(cnt_res.scalar() or 0)

        srv_res = await db.execute(select(Service).where(Service.is_active == True, Service.country_id == country.id))
        services = [ServiceOut.model_validate(s, from_attributes=True) for s in srv_res.scalars().all()]

        seo_res = await db.execute(
            select(SEOMetadata).where(SEOMetadata.entity_type == SEOEntityType.country, SEOMetadata.entity_id == country.id)
        )
        seo = seo_res.scalars().first()
        seo_out = SEOMetadataOut.model_validate(seo, from_attributes=True) if seo else None

        out = CountryOut(
            **CountryOut.model_validate(country, from_attributes=True).model_dump(),
            articles_count=articles_count,
            services=services,
            seo=seo_out,
        )
        await cache_set(cache_key, out.model_dump())
        return out
    except HTTPException:
        # пробрасываем 404
        raise
    except Exception as e:
        logger.error("get_country DB error (%s): %s", code, e)
        if settings.ENVIRONMENT == "dev":
            match = next((c for c in DEV_COUNTRIES_FALLBACK if c.code == code), None)
            if match:
                await cache_set(cache_key, match.model_dump())
                return match
            raise HTTPException(status_code=404, detail="Country not found")
        raise HTTPException(status_code=503, detail="Database unavailable")


@router.post("/", response_model=CountryOut, response_model_exclude_none=True, status_code=status.HTTP_201_CREATED)
async def create_country(
    payload: CountryCreate,
    request: Request,
    user: CurrentUser = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> CountryOut:
    logger.info("Create country %s by %s", payload.code, user.email)

    # Unique code check
    existing = await db.execute(select(Country).where(Country.code == payload.code))
    if existing.scalars().first():
        raise HTTPException(status_code=400, detail="Country code already exists")

    country = Country(
        code=payload.code,
        name_ru=payload.name_ru,
        name_en=payload.name_en,
        flag_emoji=payload.flag_emoji,
        is_active=payload.is_active,
        seo_data=payload.seo_data or {},
    )
    db.add(country)
    await db.commit()
    await db.refresh(country)

    # Audit
    ip_addr = request.headers.get("x-forwarded-for") or (request.client.host if request.client else None)
    ua = request.headers.get("user-agent")
    db.add(
        AuditLog(
            action="country_create",
            entity_type="country",
            entity_id=country.id,
            user_id=user.email,
            ip_address=ip_addr or "",
            user_agent=ua or "",
            details={"code": country.code},
        )
    )
    await db.commit()

    return CountryOut(
        **CountryOut.model_validate(country, from_attributes=True).model_dump(),
        articles_count=0,
        services=[],
        seo=None,
    )


@router.put("/{id}", response_model=CountryOut, response_model_exclude_none=True)
async def update_country(
    id: UUID,
    payload: CountryUpdate,
    request: Request,
    user: CurrentUser = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> CountryOut:
    logger.info("Update country %s by %s", id, user.email)
    res = await db.execute(select(Country).where(Country.id == id))
    country = res.scalars().first()
    if not country:
        raise HTTPException(status_code=404, detail="Country not found")

    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(country, field, value)

    await db.commit()
    await db.refresh(country)

    ip_addr = request.headers.get("x-forwarded-for") or (request.client.host if request.client else None)
    ua = request.headers.get("user-agent")
    db.add(
        AuditLog(
            action="country_update",
            entity_type="country",
            entity_id=country.id,
            user_id=user.email,
            ip_address=ip_addr or "",
            user_agent=ua or "",
            details={"updated_fields": list(payload.model_dump(exclude_unset=True).keys())},
        )
    )
    await db.commit()

    # Compose related for response
    cnt_res = await db.execute(
        select(func.count()).select_from(Article).where(Article.status == ArticleStatus.published, Article.country_id == country.id)
    )
    articles_count = int(cnt_res.scalar() or 0)

    srv_res = await db.execute(select(Service).where(Service.is_active == True, Service.country_id == country.id))
    services = [ServiceOut.model_validate(s, from_attributes=True) for s in srv_res.scalars().all()]

    seo_res = await db.execute(
        select(SEOMetadata).where(SEOMetadata.entity_type == SEOEntityType.country, SEOMetadata.entity_id == country.id)
    )
    seo = seo_res.scalars().first()
    seo_out = SEOMetadataOut.model_validate(seo, from_attributes=True) if seo else None

    return CountryOut(
        **CountryOut.model_validate(country, from_attributes=True).model_dump(),
        articles_count=articles_count,
        services=services,
        seo=seo_out,
    )
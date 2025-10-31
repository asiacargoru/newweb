from __future__ import annotations

import logging
from datetime import datetime
from typing import Optional
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query, Request, status
from sqlalchemy import select, func, or_, desc
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.cache import cache_get, cache_set
from app.dependencies.auth import get_current_user, CurrentUser
from app.models.article import Article, ArticleStatus
from app.models.audit_log import AuditLog
from app.schemas.article import ArticleCreate, ArticleUpdate, ArticleOut, PaginatedArticles, SitemapItem

logger = logging.getLogger("api.articles")
router = APIRouter()


@router.get("/", response_model=PaginatedArticles, response_model_exclude_none=True)
async def list_articles(
    request: Request,
    status_filter: Optional[str] = Query(None, description="draft/published"),
    country_id: Optional[UUID] = Query(None),
    limit: int = Query(20, ge=1, le=100),
    offset: int = Query(0, ge=0),
    search: Optional[str] = Query(None, description="Поиск по title/content"),
    order_by: str = Query("created_at", pattern="^(created_at|views_count)$"),
    db: AsyncSession = Depends(get_db),
) -> PaginatedArticles:
    logger.info("List articles: status=%s country=%s search=%s order_by=%s", status_filter, country_id, search, order_by)
    cache_key = f"articles:list:{status_filter}:{country_id}:{limit}:{offset}:{search}:{order_by}"
    cached = await cache_get(cache_key)
    if cached:
        return PaginatedArticles(**cached)

    query = select(Article)

    if status_filter:
        try:
            status_enum = ArticleStatus(status_filter)
            query = query.where(Article.status == status_enum)
        except ValueError:
            raise HTTPException(status_code=400, detail="Invalid status filter")

    if country_id:
        query = query.where(Article.country_id == country_id)

    if search:
        pattern = f"%{search}%"
        query = query.where(or_(Article.title.ilike(pattern), Article.content.ilike(pattern)))

    if order_by == "views_count":
        query = query.order_by(desc(Article.views_count))
    else:
        query = query.order_by(desc(Article.created_at))

    total_q = select(func.count()).select_from(Article)
    if status_filter:
        total_q = total_q.where(Article.status == ArticleStatus(status_filter))
    if country_id:
        total_q = total_q.where(Article.country_id == country_id)
    if search:
        pattern = f"%{search}%"
        total_q = total_q.where(or_(Article.title.ilike(pattern), Article.content.ilike(pattern)))

    query = query.limit(limit).offset(offset)

    items_res = await db.execute(query)
    items = items_res.scalars().all()

    total_res = await db.execute(total_q)
    total = int(total_res.scalar() or 0)

    payload = PaginatedArticles(
        items=[ArticleOut.model_validate(i, from_attributes=True) for i in items],
        total=total,
        limit=limit,
        offset=offset,
    )
    await cache_set(cache_key, payload.model_dump())
    return payload


@router.get("/{slug}", response_model=ArticleOut, response_model_exclude_none=True)
async def get_article(slug: str, db: AsyncSession = Depends(get_db)) -> ArticleOut:
    logger.info("Get article by slug: %s", slug)
    cache_key = f"articles:slug:{slug}"
    cached = await cache_get(cache_key)
    if cached:
        return ArticleOut(**cached)

    res = await db.execute(select(Article).where(Article.slug == slug))
    article = res.scalars().first()
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
    out = ArticleOut.model_validate(article, from_attributes=True)
    await cache_set(cache_key, out.model_dump())
    return out


@router.post("/", response_model=ArticleOut, response_model_exclude_none=True, status_code=status.HTTP_201_CREATED)
async def create_article(
    payload: ArticleCreate,
    request: Request,
    user: CurrentUser = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> ArticleOut:
    logger.info("Create article by %s slug=%s", user.email, payload.slug)

    # Unique slug check
    existing = await db.execute(select(Article).where(Article.slug == payload.slug))
    if existing.scalars().first():
        raise HTTPException(status_code=400, detail="Slug already exists")

    article = Article(
        slug=payload.slug,
        title=payload.title,
        content=payload.content,
        seo_title=payload.seo_title,
        seo_description=payload.seo_description,
        seo_keywords=payload.seo_keywords or [],
        status=payload.status or ArticleStatus.draft,
        country_id=payload.country_id,
        auto_generated=payload.auto_generated,
        published_at=payload.published_at,
    )
    db.add(article)
    await db.commit()
    await db.refresh(article)

    # Audit
    ip_addr = request.headers.get("x-forwarded-for") or (request.client.host if request.client else None)
    ua = request.headers.get("user-agent")
    db.add(
        AuditLog(
            action="article_create",
            entity_type="article",
            entity_id=article.id,
            user_id=user.email,
            ip_address=ip_addr or "",
            user_agent=ua or "",
            details={"slug": article.slug},
        )
    )
    await db.commit()

    return ArticleOut.model_validate(article, from_attributes=True)


@router.put("/{id}", response_model=ArticleOut, response_model_exclude_none=True)
async def update_article(
    id: UUID,
    payload: ArticleUpdate,
    request: Request,
    user: CurrentUser = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> ArticleOut:
    logger.info("Update article %s by %s", id, user.email)
    res = await db.execute(select(Article).where(Article.id == id))
    article = res.scalars().first()
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")

    # If changing slug, ensure uniqueness
    if payload.slug and payload.slug != article.slug:
        existing = await db.execute(select(Article).where(Article.slug == payload.slug))
        if existing.scalars().first():
            raise HTTPException(status_code=400, detail="Slug already exists")

    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(article, field, value)

    await db.commit()
    await db.refresh(article)

    ip_addr = request.headers.get("x-forwarded-for") or (request.client.host if request.client else None)
    ua = request.headers.get("user-agent")
    db.add(
        AuditLog(
            action="article_update",
            entity_type="article",
            entity_id=article.id,
            user_id=user.email,
            ip_address=ip_addr or "",
            user_agent=ua or "",
            details={"updated_fields": list(payload.model_dump(exclude_unset=True).keys())},
        )
    )
    await db.commit()

    return ArticleOut.model_validate(article, from_attributes=True)


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_article(
    id: UUID,
    request: Request,
    user: CurrentUser = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> None:
    logger.info("Delete article %s by %s", id, user.email)
    res = await db.execute(select(Article).where(Article.id == id))
    article = res.scalars().first()
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")

    await db.delete(article)
    await db.commit()

    ip_addr = request.headers.get("x-forwarded-for") or (request.client.host if request.client else None)
    ua = request.headers.get("user-agent")
    db.add(
        AuditLog(
            action="article_delete",
            entity_type="article",
            entity_id=id,
            user_id=user.email,
            ip_address=ip_addr or "",
            user_agent=ua or "",
            details={"slug": article.slug},
        )
    )
    await db.commit()


@router.post("/{id}/publish", response_model=ArticleOut, response_model_exclude_none=True)
async def publish_article(
    id: UUID,
    request: Request,
    user: CurrentUser = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> ArticleOut:
    logger.info("Publish article %s by %s", id, user.email)
    res = await db.execute(select(Article).where(Article.id == id))
    article = res.scalars().first()
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")

    article.status = ArticleStatus.published
    article.published_at = datetime.utcnow()
    await db.commit()
    await db.refresh(article)

    ip_addr = request.headers.get("x-forwarded-for") or (request.client.host if request.client else None)
    ua = request.headers.get("user-agent")
    db.add(
        AuditLog(
            action="article_publish",
            entity_type="article",
            entity_id=article.id,
            user_id=user.email,
            ip_address=ip_addr or "",
            user_agent=ua or "",
            details={},
        )
    )
    await db.commit()

    return ArticleOut.model_validate(article, from_attributes=True)


@router.get("/sitemap", response_model=list[SitemapItem], response_model_exclude_none=True)
async def articles_sitemap(db: AsyncSession = Depends(get_db)) -> list[SitemapItem]:
    logger.info("Generate articles sitemap")
    cache_key = "articles:sitemap"
    cached = await cache_get(cache_key)
    if cached:
        return [SitemapItem(**i) for i in cached]

    res = await db.execute(select(Article.slug, Article.updated_at))
    items = [
        SitemapItem(
            loc=f"/articles/{slug}",
            lastmod=updated_at.isoformat() if updated_at else None,
            changefreq="weekly",
            priority=0.6,
        )
        for slug, updated_at in res.all()
    ]

    await cache_set(cache_key, [i.model_dump() for i in items])
    return items
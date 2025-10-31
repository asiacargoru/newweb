"""
Celery-задачи для автогенерации статей и SEO-оптимизации.
- generate_article_task(country_code, article_type)
- optimize_article_seo(article_id)
- generate_daily_article: периодическая задача
- setup_periodic_tasks: регистрация beat-расписания (10:00 МСК)
"""
from __future__ import annotations

import asyncio
import logging
import re
from datetime import datetime
from typing import Any, Dict, List, Optional
from uuid import UUID

from celery.schedules import crontab

from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from app.tasks.celery_app import celery_app
from app.core.database import AsyncSessionLocal
from app.core.cache import cache_get, cache_set
from app.models.article import Article, ArticleStatus
from app.models.country import Country
from app.models.seo_metadata import SEOMetadata, SEOEntityType
from app.models.audit_log import AuditLog
from app.services.openai_service import OpenAIService, OpenAIRateLimitError
from app.services.seo_optimizer import SEOOptimizer
from app.tasks.notifications import notify_admins_new_article_draft

logger = logging.getLogger("tasks.article_generator")


def _slugify(text: str) -> str:
    text = text.strip().lower()
    # заменяем не-буквенно-цифровые на дефисы
    text = re.sub(r"[^a-z0-9а-яё\-\s]", "", text)
    text = re.sub(r"\s+", "-", text)
    text = re.sub(r"-+", "-", text)
    return text[:255] or f"article-{int(datetime.utcnow().timestamp())}"


async def _ensure_unique_slug(db: AsyncSession, base_slug: str) -> str:
    """Возвращает уникальный slug, добавляя суффикс при совпадении."""
    candidate = base_slug
    idx = 1
    while True:
        res = await db.execute(select(Article).where(Article.slug == candidate))
        if res.scalars().first() is None:
            return candidate
        idx += 1
        candidate = f"{base_slug}-{idx}"


async def _generate_article_async(country_code: str, article_type: str) -> Dict[str, Any]:
    """Основная логика генерации статьи (async)."""
    async with AsyncSessionLocal() as db:
        # 1. Получить данные о стране
        res = await db.execute(select(Country).where(Country.code == country_code, Country.is_active == True))
        country = res.scalars().first()
        if not country:
            raise ValueError(f"Country not found or inactive: {country_code}")

        # Подготовить ключевые слова: из seo_data страны + глобальные из настроек
        settings_cache: Optional[Dict[str, Any]] = await cache_get("auto_publish:settings")
        global_keywords: List[str] = settings_cache.get("keywords", []) if settings_cache else []
        country_keywords: List[str] = []
        try:
            country_keywords = list(country.seo_data.get("keywords", [])) if country.seo_data else []
        except Exception:
            country_keywords = []
        keywords = list({k.strip() for k in (country_keywords + global_keywords) if k and k.strip()})
        if not keywords:
            keywords = [f"грузоперевозки {country.name_ru}", "логистика", "импорт"]

        # 2-3. Сформировать промпт и сгенерировать контент
        ai = OpenAIService(max_per_minute=3)
        try:
            ai_result = ai.generate_article(country=country.name_ru, article_type=article_type, keywords=keywords)
        except OpenAIRateLimitError as e:
            logger.warning("Rate limit exceeded: %s", e)
            raise
        except Exception as e:
            logger.exception("OpenAI error: %s", e)
            raise

        title = ai_result["title"]
        content = ai_result["content"]
        outline = ai_result.get("outline", [])

        # 4. Оптимизировать для SEO
        seo = SEOOptimizer()
        density = seo.analyze_keyword_density(content, keywords)
        readability = seo.check_readability(content)
        structure = seo.validate_structure(content)
        meta = ai.generate_meta_tags(content, keywords)

        # 5. Сохранить в БД со статусом draft
        base_slug = _slugify(title)
        slug = await _ensure_unique_slug(db, base_slug)

        article = Article(
            slug=slug,
            title=title,
            content=content,
            seo_title=meta.get("title"),
            seo_description=meta.get("description"),
            seo_keywords=keywords,
            status=ArticleStatus.draft,
            country_id=country.id,
            auto_generated=True,
        )
        db.add(article)
        await db.commit()
        await db.refresh(article)

        # 6. Уведомить админов для проверки (через Celery уведомление)
        try:
            notify_admins_new_article_draft.delay(str(article.id), article.slug, article.title)
        except Exception:
            logger.info("Admin notification for article draft queued failed (non-critical)")

        # Создать/обновить SEOMetadata
        schema = seo.generate_schema_markup({
            "title": title,
            "outline": outline,
            "keywords": keywords,
            "published_at": article.published_at.isoformat() if article.published_at else None,
        })
        seo_meta = SEOMetadata(
            entity_type=SEOEntityType.article,
            entity_id=article.id,
            path=f"/articles/{slug}",
            title=meta.get("title") or title[:255],
            description=meta.get("description") or content[:512],
            keywords=keywords,
            schema_markup=schema,
            canonical_url=None,
        )
        db.add(seo_meta)
        await db.commit()

        # Аудит создания черновика
        db.add(
            AuditLog(
                action="article_auto_generated",
                entity_type="article",
                entity_id=article.id,
                user_id="system:auto-publish",
                ip_address="celery",
                user_agent="celery",
                details={
                    "country_code": country_code,
                    "article_type": article_type,
                    "slug": slug,
                    "density": density,
                    "readability": readability,
                    "structure": structure,
                },
            )
        )
        await db.commit()

        return {
            "id": str(article.id),
            "slug": article.slug,
            "title": article.title,
            "keywords": keywords,
            "seo": {"meta": meta, "density": density, "readability": readability, "structure": structure},
        }


@celery_app.task(
    bind=True,
    name="generate_article_task",
    rate_limit="3/m",
    autoretry_for=(OpenAIRateLimitError, Exception),
    retry_backoff=True,
    retry_kwargs={"max_retries": 3},
)
def generate_article_task(self, country_code: str, article_type: str) -> Dict[str, Any]:
    """
    Генерирует статью для конкретной страны.

    article_type:
    - "country_overview" - обзор логистики в стране
    - "route_guide" - гид по маршруту
    - "customs_guide" - таможенное оформление
    """
    logger.info("Generate article task started: country=%s type=%s", country_code, article_type)
    result = asyncio.run(_generate_article_async(country_code=country_code, article_type=article_type))

    # Обновляем очередь задач в кэше
    try:
        queue: List[Dict[str, Any]] = asyncio.run(cache_get("auto_publish:queue")) or []
        queue.append({
            "task": "generate_article",
            "country_code": country_code,
            "article_type": article_type,
            "article": result,
            "ts": datetime.utcnow().isoformat(),
        })
        asyncio.run(cache_set("auto_publish:queue", queue, ttl_seconds=24 * 3600))
    except Exception:
        pass

    return result


async def _optimize_article_async(article_id: UUID) -> Dict[str, Any]:
    async with AsyncSessionLocal() as db:
        res = await db.execute(select(Article).where(Article.id == article_id))
        article = res.scalars().first()
        if not article:
            raise ValueError("Article not found")

        seo = SEOOptimizer()
        density = seo.analyze_keyword_density(article.content, article.seo_keywords or [])
        readability = seo.check_readability(article.content)
        structure = seo.validate_structure(article.content)

        # Генерация дополнительных внутренних ссылок (упрощённо пустой список)
        # В реальном проекте подобрать related_articles по стране/ключевым словам
        related_articles: List[Dict[str, Any]] = []
        article.content = OpenAIService().add_internal_links(article.content, related_articles)
        await db.commit()
        await db.refresh(article)

        # Обновить SEOMetadata
        meta_title = (article.seo_title or article.title)[:255]
        meta_desc = (article.seo_description or article.content[:512])
        schema = seo.generate_schema_markup({
            "title": article.title,
            "outline": [],
            "keywords": article.seo_keywords or [],
            "published_at": article.published_at.isoformat() if article.published_at else None,
        })

        # Найти существующую запись по entity_type/entity_id
        res_meta = await db.execute(
            select(SEOMetadata).where(SEOMetadata.entity_type == SEOEntityType.article, SEOMetadata.entity_id == article.id)
        )
        seo_meta = res_meta.scalars().first()
        if seo_meta:
            seo_meta.title = meta_title
            seo_meta.description = meta_desc
            seo_meta.keywords = article.seo_keywords or []
            seo_meta.schema_markup = schema
        else:
            seo_meta = SEOMetadata(
                entity_type=SEOEntityType.article,
                entity_id=article.id,
                path=f"/articles/{article.slug}",
                title=meta_title,
                description=meta_desc,
                keywords=article.seo_keywords or [],
                schema_markup=schema,
            )
            db.add(seo_meta)
        await db.commit()

        # Аудит SEO-оптимизации
        db.add(
            AuditLog(
                action="article_seo_optimized",
                entity_type="article",
                entity_id=article.id,
                user_id="system:auto-publish",
                ip_address="celery",
                user_agent="celery",
                details={"density": density, "readability": readability, "structure": structure},
            )
        )
        await db.commit()

        return {
            "id": str(article.id),
            "slug": article.slug,
            "seo": {"density": density, "readability": readability, "structure": structure},
        }


@celery_app.task(
    bind=True,
    name="optimize_article_seo",
    autoretry_for=(Exception,),
    retry_backoff=True,
    retry_kwargs={"max_retries": 3},
)
def optimize_article_seo(self, article_id: str) -> Dict[str, Any]:
    """SEO оптимизация статьи."""
    logger.info("Optimize article SEO: id=%s", article_id)
    return asyncio.run(_optimize_article_async(UUID(article_id)))


@celery_app.task(name="generate_daily_article")
def generate_daily_article() -> Dict[str, Any]:
    """Выбирает случайную активную страну и генерирует обзорную статью."""
    async def _pick_country_code() -> Optional[str]:
        async with AsyncSessionLocal() as db:
            res = await db.execute(select(Country.code).where(Country.is_active == True).order_by(func.random()).limit(1))
            row = res.first()
            return row[0] if row else None

    code = asyncio.run(_pick_country_code())
    if not code:
        logger.warning("No active countries found for daily generation")
        return {"ok": False, "reason": "no_countries"}

    result = generate_article_task.delay(code, "country_overview").get(timeout=120)
    return {"ok": True, "article": result}


@celery_app.on_after_configure.connect
def setup_periodic_tasks(sender, **kwargs):
    # Генерация 1 статьи каждый день в 10:00 МСК
    sender.add_periodic_task(
        crontab(hour=10, minute=0),
        generate_daily_article.s(),
        name="daily_article_generation",
    )
import os
import time
import asyncio
from typing import List, Dict, Any, Optional

try:
    from openai import OpenAI  # Новая версия клиента
except Exception:
    OpenAI = None  # Библиотека может быть не установлена пока

try:
    import redis  # sync redis для глобального rate-limit
except Exception:
    redis = None

from app.core.config import settings
from app.core.database import AsyncSessionLocal
from app.models.audit_log import AuditLog


class OpenAIRateLimitError(Exception):
    pass


class OpenAIService:
    """Сервис генерации контента через OpenAI с ретраями, rate-limit и аудитом."""

    def __init__(self, max_per_minute: int = 3):
        self.api_key = settings.OPENAI_API_KEY
        self.client = OpenAI(api_key=self.api_key) if (OpenAI and self.api_key) else None
        self.redis_client = redis.from_url(settings.effective_redis_url, decode_responses=True) if redis else None
        self.rate_limit_key = "openai:requests"
        self.max_per_minute = max_per_minute
        # Список запрещённых слов (можно переопределить через ENV CONTENT_BLACKLIST="word1,word2")
        self.blacklist = [w.strip() for w in (os.getenv("CONTENT_BLACKLIST", "").split(",")) if w.strip()] or [
            "DHL", "FedEx", "UPS", "ПЭК", "Байкал-Сервис"
        ]

    def _allow_request(self) -> bool:
        """Глобальный rate-limit: максимум N запросов в минуту (Redis INCR + TTL)."""
        if self.redis_client is None:
            # Если Redis недоступен, полагаемся на ограничение воркера Celery и аккуратное использование.
            return True
        window = int(time.time() // 60)
        key = f"{self.rate_limit_key}:{window}"
        count = self.redis_client.incr(key)
        if count == 1:
            self.redis_client.expire(key, 60)
        return count <= self.max_per_minute

    async def _audit(self, action: str, entity_type: str, details: Dict[str, Any], entity_id: Optional[str] = None) -> None:
        """Сохранение промптов/ответов в AuditLog."""
        async with AsyncSessionLocal() as session:
            log = AuditLog(
                action=action,
                entity_type=entity_type,
                entity_id=None,  # UUID будет установлен при сохранении статьи, тут может быть None
                user_id="system:auto-publish",
                ip_address="celery",
                user_agent="celery",
                details=details,
            )
            session.add(log)
            await session.commit()

    def _apply_blacklist(self, text: str) -> str:
        cleaned = text
        for bad in self.blacklist:
            if not bad:
                continue
            cleaned = cleaned.replace(bad, "конкурент")
        return cleaned

    def _retry_delay(self, attempt: int) -> float:
        # экспоненциальная задержка 1, 2, 4, 8...
        return min(8 * (2 ** (attempt - 1)), 30.0)

    def generate_article(self, country: str, article_type: str, keywords: List[str]) -> Dict[str, Any]:
        """
        Генерация статьи.
        Возвращает структуру: {title, content, outline, keywords}
        Реализованы: ретраи при ошибках API, rate-limit 3/мин, аудит промпт/ответ.
        """
        if not self.client:
            raise RuntimeError("OpenAI API key is not configured")

        prompts = {
            "country_overview": f"""
                Напиши SEO-оптимизированную статью об услугах грузоперевозок из {country} в Россию.
                \nТребования:
                - Объем: 2500-3000 слов
                - Ключевые слова (использовать естественно): {', '.join(keywords)}
                - Структура: H1, несколько H2 с подзаголовками H3
                - Включить: виды транспорта, сроки доставки, таможня, стоимость
                - Тон: профессиональный, но понятный
                - Призыв к действию в конце
                - Реальные данные (если есть в твоей базе)
                \nНЕ используй:
                - Переспам ключевых слов
                - Шаблонные фразы типа "в современном мире"
                - Воду
                \nЗапрет слов (конкуренты): {', '.join(self.blacklist)}
            """,
            "route_guide": f"""
                Подготовь подробный гид по маршруту грузоперевозки из {country} в Россию.
                Отрази типовые точки отправления/прибытия, транзит, сроки, риски, рекомендации.
                Структура: H1, H2/H3 блоки для этапов маршрута.
                Ключевые слова: {', '.join(keywords)}.
                Избегай упоминаний конкурентов: {', '.join(self.blacklist)}.
            """,
            "customs_guide": f"""
                Напиши руководство по таможенному оформлению при импорте из {country} в Россию.
                Опиши документы, пошлины, льготы, типичные ошибки, сроки.
                Структура: H1, разделы H2/H3, чек-листы.
                Ключевые слова: {', '.join(keywords)}.
                Не упоминать конкурентов: {', '.join(self.blacklist)}.
            """,
        }

        prompt = prompts.get(article_type) or prompts["country_overview"]

        # Аудит промпта
        asyncio.run(self._audit(
            action="ai_generate_article:prompt",
            entity_type="article",
            details={"country": country, "article_type": article_type, "prompt": prompt, "keywords": keywords},
        ))

        # Rate-limit перед обращением
        if not self._allow_request():
            raise OpenAIRateLimitError("Global rate limit exceeded: 3 requests/minute")

        last_err: Optional[Exception] = None
        for attempt in range(1, 5):  # до 4 попыток
            try:
                rsp = self.client.chat.completions.create(
                    model="gpt-4o-mini",
                    messages=[
                        {"role": "system", "content": "Ты опытный SEO-копирайтер в сфере логистики."},
                        {"role": "user", "content": prompt},
                    ],
                    temperature=0.7,
                    max_tokens=4096,
                )
                content = rsp.choices[0].message.content or ""
                content = self._apply_blacklist(content)

                # Извлечение заголовка: первые 120 символов или первая строка
                title = content.split("\n", 1)[0][:120].strip() or f"Грузоперевозки из {country}: обзор"

                outline = []  # базовый каркас: можно извлечь H2/H3 из контента позже
                result = {
                    "title": title,
                    "content": content,
                    "outline": outline,
                    "keywords": keywords,
                    "model": "gpt-4o-mini",
                }

                # Аудит ответа (без полного текста, чтобы не хранить избыточно)
                asyncio.run(self._audit(
                    action="ai_generate_article:response",
                    entity_type="article",
                    details={
                        "title": title,
                        "length": len(content),
                        "model": "gpt-4o-mini",
                        "keywords": keywords,
                    },
                ))
                return result
            except Exception as e:
                last_err = e
                # Ретраи с экспоненциальной задержкой
                time.sleep(self._retry_delay(attempt))

        raise last_err or RuntimeError("OpenAI generation failed")

    def generate_meta_tags(self, content: str, keywords: List[str]) -> Dict[str, str]:
        """Простая генерация meta-title, meta-description, keywords."""
        title = (content.split("\n", 1)[0][:60]).strip() or "Логистика из Азии в Россию"
        description = (content[:160]).strip()
        kw = ", ".join(keywords[:10])
        return {"title": title, "description": description, "keywords": kw}

    def add_internal_links(self, content: str, related_articles: List[Dict[str, Any]]) -> str:
        """Добавление внутренних ссылок: в конец контента добавляем список релевантных ссылок."""
        if not related_articles:
            return content
        links = "\n\nПолезные материалы:\n" + "\n".join(
            [f"- {a.get('title','Материал')} — {a.get('url','/articles')}" for a in related_articles[:5]]
        )
        return content + links
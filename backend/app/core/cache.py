import json
import logging
import time
from typing import Any, Optional

try:
    import redis.asyncio as aioredis
except Exception:
    aioredis = None

from app.core.config import settings

logger = logging.getLogger("core.cache")

_redis: Optional["aioredis.Redis"] = None
_mem_cache: dict[str, tuple[str, float]] = {}


def get_redis() -> Optional["aioredis.Redis"]:
    global _redis
    if aioredis is None:
        return None
    if _redis is None and settings.effective_redis_url:
        _redis = aioredis.from_url(settings.effective_redis_url, encoding="utf-8", decode_responses=True)
    return _redis


def _mem_cache_get(key: str) -> Optional[Any]:
    item = _mem_cache.get(key)
    if not item:
        return None
    val, exp = item
    if exp < time.time():
        _mem_cache.pop(key, None)
        return None
    return json.loads(val) if val else None


def _mem_cache_set(key: str, value: Any, ttl_seconds: int = 300) -> None:
    exp = time.time() + ttl_seconds
    _mem_cache[key] = (json.dumps(value, default=str), exp)


async def cache_get(key: str) -> Optional[Any]:
    try:
        r = get_redis()
        if r is None:
            return _mem_cache_get(key)
        val = await r.get(key)
        return json.loads(val) if val else None
    except Exception as e:
        logger.warning("Redis cache_get failed for key %s: %s", key, e)
        return _mem_cache_get(key)


async def cache_set(key: str, value: Any, ttl_seconds: int = 300) -> None:
    try:
        r = get_redis()
        if r is None:
            _mem_cache_set(key, value, ttl_seconds)
            return
        await r.set(key, json.dumps(value, default=str), ex=ttl_seconds)
    except Exception as e:
        logger.warning("Redis cache_set failed for key %s: %s", key, e)
        _mem_cache_set(key, value, ttl_seconds)
"""
Конфигурация Celery: Redis broker/backend, retry и таймауты. Beat настраивается в задачах.
"""
from celery import Celery

from app.core.config import settings

# Используем единый Redis для брокера и результата
redis_url = settings.effective_redis_url

celery_app = Celery(
    "asia_trans_cargo",
    broker=redis_url,
    backend=redis_url,
)

# Базовая конфигурация задач и воркера
celery_app.conf.update(
    task_default_queue="auto_publish",
    timezone="Europe/Moscow",
    enable_utc=False,
    worker_prefetch_multiplier=1,
    task_acks_late=True,
    task_default_retry_delay=10,  # секунды
    task_soft_time_limit=180,     # секунды (мягкий таймаут)
    task_time_limit=200,          # секунды (жесткий таймаут)
    broker_transport_options={"visibility_timeout": 3600},
)

# Импорт задач, чтобы Celery их видел
import app.tasks.article_generator  # noqa: F401
import app.tasks.notifications  # noqa: F401
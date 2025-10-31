"""
Конфигурация приложения через переменные окружения.
Использует pydantic-settings (Pydantic v2).
Требуемые ключи:
- DATABASE_URL
- REDIS_URL
- SECRET_KEY
- ENCRYPTION_KEY
- OPENAI_API_KEY
- ADMIN_USERNAME, ADMIN_PASSWORD
- CORS_ORIGINS (список доменов/оригинов через запятую)
- ENVIRONMENT (dev/prod)
"""
import os
from typing import List, Optional, Dict
from pydantic import Field
from pydantic_settings import BaseSettings
from pydantic import field_validator


class Settings(BaseSettings):
    # Базовые
    PROJECT_NAME: str = "Азия Транс Карго"
    ENVIRONMENT: str = "dev"  # dev | prod

    # Безопасность
    SECRET_KEY: str = "change_me"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    ENCRYPTION_KEY: str = ""  # ключ Fernet (base64-строка)

    # Интеграции
    OPENAI_API_KEY: Optional[str] = None

    # Админ-доступ (основной аккаунт)
    ADMIN_USERNAME: str = "admin"
    ADMIN_PASSWORD: str = "admin"

    # RBAC: дополнительные пользователи по ролям
    MANAGER_USERS: List[str] = Field(default_factory=list)
    VIEWER_USERS: List[str] = Field(default_factory=list)

    # 2FA (опционально): общий TOTP-секрет для админ-панели либо на пользователя
    ADMIN_TOTP_SECRET: Optional[str] = None

    # Сессии
    SESSION_TIMEOUT_MINUTES: int = 30

    # CORS
    CORS_ORIGINS: List[str] = Field(default_factory=lambda: ["http://localhost:3000"])  # разрешённые origin'ы

    # БД и кэш
    # Если DATABASE_URL не задан, можно указать POSTGRES_* переменные
    POSTGRES_HOST: Optional[str] = None
    POSTGRES_PORT: Optional[int] = None
    POSTGRES_DB: Optional[str] = None
    POSTGRES_USER: Optional[str] = None
    POSTGRES_PASSWORD: Optional[str] = None

    DATABASE_URL: str = (
        "postgresql+psycopg2://atc_user:change_me@postgres:5432/atc"
    )
    REDIS_URL: Optional[str] = None  # например: redis://:password@redis:6379/0

    # Доп. региональные настройки (для ФЗ-152 каркаса)
    GDPR_REGION: str = "RU"
    DATA_RESIDENCY: str = "RU"

    # Сервисные настройки
    BACKEND_PORT: int = 8000
    BACKEND_WORKERS: int = 2
    RATE_LIMIT_PER_MINUTE: int = 120

    # Поддержка старых окружений: если REDIS_URL не задан, собираем из HOST/PORT
    REDIS_HOST: str = "redis"
    REDIS_PORT: int = 6379
    REDIS_PASSWORD: Optional[str] = None

    @field_validator("CORS_ORIGINS", mode="before")
    @classmethod
    def parse_cors_origins(cls, v):
        if isinstance(v, str):
            return [o.strip() for o in v.split(",") if o.strip()]
        return v

    @field_validator("DATABASE_URL", mode="before")
    @classmethod
    def compose_database_url(cls, v):
        # Если явно задан через ENV, используем его
        if v and isinstance(v, str) and v.strip():
            return v
        # Пробуем собрать из POSTGRES_* переменных
        host = os.getenv("POSTGRES_HOST")
        port = os.getenv("POSTGRES_PORT")
        db = os.getenv("POSTGRES_DB")
        user = os.getenv("POSTGRES_USER")
        pwd = os.getenv("POSTGRES_PASSWORD")
        if host and port and db and user and pwd:
            return f"postgresql+psycopg2://{user}:{pwd}@{host}:{port}/{db}"
        # Фолбэк: дефолтное значение
        return "postgresql+psycopg2://atc_user:change_me@postgres:5432/atc"

    @property
    def effective_redis_url(self) -> str:
        if self.REDIS_URL:
            return self.REDIS_URL
        pwd = f":{self.REDIS_PASSWORD}@" if self.REDIS_PASSWORD else ""
        return f"redis://{pwd}{self.REDIS_HOST}:{self.REDIS_PORT}/0"

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()
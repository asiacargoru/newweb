from typing import AsyncGenerator

from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.orm import DeclarativeBase

from app.core.config import settings


def _to_async_dsn(url: str) -> str:
    """Преобразует DSN к asyncpg при необходимости."""
    if "+asyncpg" in url:
        return url
    if "+psycopg2" in url:
        return url.replace("+psycopg2", "+asyncpg")
    if url.startswith("postgresql://"):
        return "postgresql+asyncpg://" + url.split("postgresql://", 1)[1]
    return url


DATABASE_URL_ASYNC = _to_async_dsn(settings.DATABASE_URL)

engine = create_async_engine(
    DATABASE_URL_ASYNC,
    pool_size=5,
    max_overflow=10,
    pool_pre_ping=True,
    pool_recycle=1800,
)

AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    expire_on_commit=False,
)

# Для совместимости возможных импортов в существующем коде
SessionLocal = AsyncSessionLocal


class Base(DeclarativeBase):
    pass


async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with AsyncSessionLocal() as session:
        yield session
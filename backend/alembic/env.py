"""
Alembic env.py — точка входа для миграций.
Задачи:
- Настроить контекст миграций
- Указать metadata для автогенерации
- Подключиться к БД через DATABASE_URL из settings
"""
from __future__ import annotations

from logging.config import fileConfig
from sqlalchemy import engine_from_config, pool
from sqlalchemy import create_engine
from alembic import context

from app.core.config import settings
from app.core.database import Base

# Этот импорт должен подтянуть все модели, чтобы Base.metadata включал их
import app.models.article  # noqa
import app.models.country  # noqa
import app.models.service  # noqa
import app.models.lead  # noqa
import app.models.consent  # noqa
import app.models.audit_log  # noqa

# Интерпретация конфигурации alembic.ini
config = context.config

# Если файл конфигурации использует logging
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# Целевая метадата для автогенерации
target_metadata = Base.metadata


def run_migrations_offline() -> None:
    """Запуск миграций в оффлайн-режиме.
    Использует URL без создания Engine.
    """
    url = settings.DATABASE_URL
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:
    """Запуск миграций в онлайн-режиме с созданием Engine."""
    connectable = create_engine(settings.DATABASE_URL, poolclass=pool.NullPool)

    with connectable.connect() as connection:
        context.configure(connection=connection, target_metadata=target_metadata)

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
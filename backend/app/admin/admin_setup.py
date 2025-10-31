"""
Каркас интеграции AdminJS с FastAPI.
Идея:
- AdminJS работает как SPA (в рамках фронтенда или отдельного Node процесса)
- FastAPI предоставляет REST-эндпоинты для моделей (articles, leads и т.д.)
- nginx проксирует /admin на фронтенд, где крутится AdminJS

Этот файл служит как место для вспомогательных утилит и эндпоинтов
для админских операций: экспорт/импорт, расширенное аудирование, сервисные действия.
"""
from fastapi import APIRouter
from app.admin.adminjs_bridge import AdminJS, Resource, AdminJSFastAPI
from app.core.database import get_db
from app.models import Article, Country, Service, Lead, UserConsent, AuditLog, CaseStudy

# Определяем ресурсы и свойства (метаданные используются на фронте AdminJS)
resources = [
    Resource(Article, get_db, properties={
        'content': {'type': 'richtext'},
    }, actions={'edit': {'before': 'audit_action'}}),
    Resource(Country, get_db),
    Resource(Service, get_db),
    Resource(CaseStudy, get_db, properties={
        'content': {'type': 'richtext'},
        'images': {'type': 'array'},
    }),
    Resource(Lead, get_db, properties={
        'encrypted_data': {
            'components': {
                'show': 'DecryptedDataComponent',
            }
        }
    }, actions={'show': {'before': 'audit_view_lead'}}),
    Resource(UserConsent, get_db),
    Resource(AuditLog, get_db, actions={
        'delete': {'isAccessible': False},
        'edit': {'isAccessible': False},
    }),
]

admin = AdminJS(
    resources=resources,
    root_path='/admin',
    branding={
        'companyName': 'Азия Транс Карго',
        'logo': '/static/logo.png',
        'theme': { 'colors': { 'primary': '#0066CC' } }
    },
    locale={ 'language': 'ru', 'translations': {} }
)

# Генерируем роутер
admin_router: APIRouter = AdminJSFastAPI(admin)

@admin_router.get("/admin/health")
def admin_health():
    """Health для админских интеграций."""
    return {"status": "admin-ok"}

# Пример: спец-операции (заглушки)
@admin_router.post("/admin/reindex")
def admin_reindex():
    """Переиндексация данных для админки (заглушка)."""
    return {"status": "reindexed"}
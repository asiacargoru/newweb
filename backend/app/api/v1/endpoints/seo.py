"""
SEO endpoints: получение рекомендованных метатегов, генерация сниппетов.
- GET /seo/recommendations
"""
from fastapi import APIRouter

router = APIRouter()

@router.get("/recommendations")
def get_recommendations():
    """Возвращает базовые рекомендации по метатегам (title, description, og)."""
    return {"title": "Азия Транс Карго", "description": "Логистические услуги"}
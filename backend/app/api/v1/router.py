"""
Общий роутер API v1: подключает эндпоинты.
"""
from fastapi import APIRouter

from app.api.v1.endpoints import (
    articles,
    countries,
    services as svc,
    leads,
    seo,
    consents,
    audit,
    auto_publish,
    case_studies,
)

api_router = APIRouter()

api_router.include_router(articles.router, prefix="/articles", tags=["articles"])
api_router.include_router(countries.router, prefix="/countries", tags=["countries"])
api_router.include_router(svc.router, prefix="/services", tags=["services"])
api_router.include_router(leads.router, prefix="/leads", tags=["leads"])
api_router.include_router(seo.router, prefix="/seo", tags=["seo"])
api_router.include_router(consents.router, prefix="/consents", tags=["consents"])
api_router.include_router(audit.router, prefix="/audit", tags=["audit"]) 
api_router.include_router(auto_publish.router, prefix="/auto-publish", tags=["auto_publish"])
api_router.include_router(case_studies.router, prefix="/case-studies", tags=["case_studies"])
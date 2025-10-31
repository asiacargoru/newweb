# Экспорт схем для удобного импорта
from .article import ArticleBase, ArticleCreate, ArticleUpdate, ArticleOut, PaginatedArticles
from .country import CountryBase, CountryCreate, CountryUpdate, CountryOut
from .service import ServiceBase, ServiceCreate, ServiceUpdate, ServiceOut
from .seo_metadata import SEOMetadataBase, SEOMetadataCreate, SEOMetadataOut

__all__ = [
    "ArticleBase",
    "ArticleCreate",
    "ArticleUpdate",
    "ArticleOut",
    "PaginatedArticles",
    "CountryBase",
    "CountryCreate",
    "CountryUpdate",
    "CountryOut",
    "ServiceBase",
    "ServiceCreate",
    "ServiceUpdate",
    "ServiceOut",
    "SEOMetadataBase",
    "SEOMetadataCreate",
    "SEOMetadataOut",
]
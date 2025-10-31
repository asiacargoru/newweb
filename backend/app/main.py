import time
import logging
from typing import Optional
from urllib.parse import urlparse

from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.middleware.sessions import SessionMiddleware

from app.core.config import settings
from app.core.database import Base, engine
from app.api.v1.router import api_router
from app.admin.admin_setup import admin_router

# --------- Helpers ---------
RU_SUFFIXES = (".ru", ".xn--p1ai", ".рф")


def is_ru_origin(origin: str) -> bool:
    try:
        host = urlparse(origin).hostname or ""
        return host.endswith(RU_SUFFIXES)
    except Exception:
        return False


# --------- Optional redis for rate-limit ---------
try:
    import redis.asyncio as aioredis
except Exception:
    aioredis = None


class RateLimitMiddleware(BaseHTTPMiddleware):
    def __init__(self, app: FastAPI, limit_per_minute: int):
        super().__init__(app)
        self.limit = limit_per_minute
        self.redis = None

    async def dispatch(self, request: Request, call_next):
        ip = request.headers.get("x-forwarded-for") or (request.client.host if request.client else "unknown")
        now_minute = int(time.time() // 60)
        key = f"rl:{ip}:{now_minute}"

        # Redis, если доступен
        if aioredis and settings.effective_redis_url:
            try:
                if self.redis is None:
                    self.redis = aioredis.from_url(settings.effective_redis_url, encoding="utf-8", decode_responses=True)
                count = await self.redis.incr(key)
                if count == 1:
                    await self.redis.expire(key, 60)
            except Exception:
                # graceful fallback на in-memory
                if not hasattr(self, "_mem"):
                    self._mem = {}
                count = self._mem.get(key, 0) + 1
                self._mem[key] = count
        else:
            # простой in-memory fallback на время текущего процесса
            if not hasattr(self, "_mem"):
                self._mem = {}
            count = self._mem.get(key, 0) + 1
            self._mem[key] = count

        if count > self.limit:
            return JSONResponse(status_code=429, content={"detail": "Too Many Requests"})

        response = await call_next(request)
        return response


# --------- Request logging middleware ---------
class RequestLoggerMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        start = time.time()
        ip = request.headers.get("x-forwarded-for") or (request.client.host if request.client else "unknown")
        method = request.method
        path = request.url.path
        response = await call_next(request)
        duration_ms = int((time.time() - start) * 1000)
        # Логируем кратко в stdout
        print(f"{ip} {method} {path} -> {response.status_code} in {duration_ms}ms")
        return response


# --------- App ---------
DEV = settings.ENVIRONMENT == "dev"
app = FastAPI(
    title=settings.PROJECT_NAME,
    docs_url="/docs" if DEV else None,
    redoc_url="/redoc" if DEV else None,
    openapi_url="/openapi.json" if DEV else None,
)

# Сессии для админ-панели (cookie-сессия + таймаут)
app.add_middleware(
    SessionMiddleware,
    secret_key=settings.SECRET_KEY,
    max_age=settings.SESSION_TIMEOUT_MINUTES * 60,
    same_site="lax",
)

# CORS: только российские домены, плюс localhost в dev
origins = [o for o in settings.CORS_ORIGINS if is_ru_origin(o)]
if DEV:
    origins += [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(RequestLoggerMiddleware)
app.add_middleware(RateLimitMiddleware, limit_per_minute=settings.RATE_LIMIT_PER_MINUTE)

# Подключение роутеров: всё под /api/v1
app.include_router(api_router, prefix="/api/v1")

# AdminJS роутер
app.include_router(admin_router)


# --------- Health ---------
@app.get("/health")
async def health() -> dict:
    return {"status": "ok"}


# --------- Exception handlers ---------
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=422,
        content={"detail": exc.errors(), "message": "Validation failed"},
    )


@app.exception_handler(Exception)
async def unhandled_exception_handler(request: Request, exc: Exception):
    ip = request.headers.get("x-forwarded-for") or (request.client.host if request.client else "unknown")
    return JSONResponse(
        status_code=500,
        content={"detail": str(exc), "message": "Internal Server Error", "ip": ip},
    )


@app.on_event("startup")
async def ensure_db_schema() -> None:
    if DEV:
        try:
            async with engine.begin() as conn:
                await conn.run_sync(Base.metadata.create_all)
        except Exception as e:
            logging.getLogger("startup").error("DB init failed: %s", e)
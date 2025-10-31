from datetime import datetime, timedelta
from functools import wraps
from typing import Any, Callable, Dict, Optional

from jose import JWTError, jwt
from passlib.context import CryptContext
from cryptography.fernet import Fernet, InvalidToken

from app.core.config import settings
from app.core.database import AsyncSessionLocal
from app.models.audit_log import AuditLog

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
ALGORITHM = "HS256"


def create_access_token(subject: str, expires_minutes: Optional[int] = None) -> str:
    expire = datetime.utcnow() + timedelta(
        minutes=expires_minutes or settings.ACCESS_TOKEN_EXPIRE_MINUTES
    )
    to_encode = {"sub": subject, "exp": expire}
    return jwt.encode(to_encode, settings.SECRET_KEY, algorithm=ALGORITHM)


def decode_access_token(token: str) -> Dict[str, Any]:
    return jwt.decode(token, settings.SECRET_KEY, algorithms=[ALGORITHM])


def verify_access_token(token: str) -> Dict[str, Any]:
    try:
        return decode_access_token(token)
    except JWTError as e:
        raise e


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(password: str, hashed_password: str) -> bool:
    return pwd_context.verify(password, hashed_password)


def _get_fernet() -> Fernet:
    key = settings.ENCRYPTION_KEY
    if not key:
        raise ValueError("ENCRYPTION_KEY is not set")
    # Ожидаем base64-строку, которую принимает Fernet
    return Fernet(key.encode())


def encrypt_personal_data(value: str) -> str:
    f = _get_fernet()
    return f.encrypt(value.encode()).decode()


def decrypt_personal_data(token: str) -> str:
    f = _get_fernet()
    try:
        return f.decrypt(token.encode()).decode()
    except InvalidToken as e:
        raise ValueError("Invalid encrypted data") from e


def audit_log(action: str, target: str) -> Callable[..., Any]:
    """
    Декоратор для фиксации операций с ПД. Записывает AuditLog после успешного выполнения
    либо при ошибке.
    Метаданные: IP и User-Agent из запроса, если он передан в kwargs как 'request'.
    """

    def decorator(func: Callable[..., Any]) -> Callable[..., Any]:
        @wraps(func)
        async def wrapper(*args, **kwargs):
            actor = "anonymous"
            ip = None
            user_agent = None
            request = kwargs.get("request")
            if request is not None:
                actor = request.headers.get("x-user", actor)
                ip = request.headers.get("x-forwarded-for") or (request.client.host if request.client else None)
                user_agent = request.headers.get("user-agent")

            try:
                result = await func(*args, **kwargs)
                async with AsyncSessionLocal() as session:
                    session.add(
                        AuditLog(
                            actor=actor,
                            action=action,
                            target=target,
                            metadata={"ip": ip, "user_agent": user_agent},
                        )
                    )
                    await session.commit()
                return result
            except Exception as exc:
                async with AsyncSessionLocal() as session:
                    session.add(
                        AuditLog(
                            actor=actor,
                            action=f"{action}:error",
                            target=target,
                            metadata={"ip": ip, "user_agent": user_agent, "error": str(exc)},
                        )
                    )
                    await session.commit()
                raise

        return wrapper

    return decorator
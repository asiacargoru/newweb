"""
Сервис шифрования ПДн для соответствия ФЗ-152.
Использует симметричное шифрование (Fernet) из библиотеки cryptography.
"""
from typing import Optional, Dict, Any
from cryptography.fernet import Fernet
import json
import hashlib

from app.core.config import settings


def _get_fernet() -> Fernet:
    """Создаёт экземпляр Fernet из ключа ENCRYPTION_KEY.
    Ключ должен быть 32 байта (urlsafe base64)."""
    return Fernet(settings.ENCRYPTION_KEY)


def encrypt_text(plain: Optional[str]) -> Optional[str]:
    """Шифрует строку, возвращает base64 токен."""
    if plain is None:
        return None
    f = _get_fernet()
    return f.encrypt(plain.encode("utf-8")).decode("utf-8")


def decrypt_text(token: Optional[str]) -> Optional[str]:
    """Расшифровывает base64 токен обратно в строку."""
    if token is None:
        return None
    f = _get_fernet()
    return f.decrypt(token.encode("utf-8")).decode("utf-8")


# Шифрование/дешифрование структурированных персональных данных
def encrypt_personal_data(data: Dict[str, Any]) -> bytes:
    """Шифрует словарь ПДн в бинарный токен (для хранения в BYTEA)."""
    f = _get_fernet()
    payload = json.dumps(data, ensure_ascii=False).encode("utf-8")
    return f.encrypt(payload)


def decrypt_personal_data(encrypted: bytes) -> Dict[str, Any]:
    """Дешифрует бинарный токен обратно в словарь ПДн."""
    if not encrypted:
        return {}
    f = _get_fernet()
    plain = f.decrypt(encrypted)
    return json.loads(plain.decode("utf-8"))


# Анонимизация идентификатора пользователя
def hash_user_identifier(email: Optional[str], phone: Optional[str]) -> str:
    """Возвращает устойчивый SHA-256 хеш по нормализованным email/phone.
    Никогда не возвращает исходные ПДн и не логирует их.
    """
    norm_email = (email or "").strip().lower()
    # Нормализуем телефон: оставляем цифры, допускаем ведущий '+'
    raw_phone = (phone or "").strip()
    if raw_phone.startswith("+"):
        norm_phone = "+" + "".join(ch for ch in raw_phone[1:] if ch.isdigit())
    else:
        norm_phone = "".join(ch for ch in raw_phone if ch.isdigit())
    raw = f"{norm_email}|{norm_phone}"
    return hashlib.sha256(raw.encode("utf-8")).hexdigest()
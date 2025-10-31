"""
Pydantic-схемы для Lead: создание лида с ПДн.
"""
from pydantic import BaseModel, EmailStr
from typing import Optional


class LeadCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    message: Optional[str] = None
    consent_id: Optional[int] = None


class LeadRead(BaseModel):
    id: int
    name: str
    # email_enc/phone_enc будут расшифровываться на стороне сервиса при необходимости
    message: Optional[str] = None

    class Config:
        from_attributes = True
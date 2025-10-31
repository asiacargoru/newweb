"""
Pydantic-схемы для Consent.
"""
from pydantic import BaseModel
from typing import Optional, Dict, Any


class ConsentCreate(BaseModel):
    user_identifier: str
    policy_version: str
    source: str
    metadata: Optional[Dict[str, Any]] = None


class ConsentRead(BaseModel):
    id: int
    user_identifier: str
    policy_version: str
    source: str
    metadata: Dict[str, Any]

    class Config:
        from_attributes = True
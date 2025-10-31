from typing import Optional

from fastapi import HTTPException, Request, status
from pydantic import BaseModel
from jose import JWTError

from app.core.security import verify_access_token


class CurrentUser(BaseModel):
    email: str


async def get_current_user(request: Request) -> CurrentUser:
    auth_header: Optional[str] = request.headers.get("Authorization")
    if not auth_header or not auth_header.lower().startswith("bearer "):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authenticated")
    token = auth_header.split()[1]
    try:
        payload = verify_access_token(token)
        subject = payload.get("sub")
        if not subject:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token payload")
        return CurrentUser(email=str(subject))
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    except Exception:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication failed")
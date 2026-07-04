from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer

from app.auth.jwt_handler import verify_token

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/login")


def get_current_user(token: str = Depends(oauth2_scheme)):
    print("TOKEN:", token)

    payload = verify_token(token)

    print("PAYLOAD:", payload)

    if payload is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid Token"
        )

    return payload
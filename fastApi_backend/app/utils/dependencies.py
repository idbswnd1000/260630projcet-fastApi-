from fastapi import HTTPException
from app.utils.security import decode_access_token
from app.repositories import users_get_by_name


def get_current_user(context, db):
    request = context["request"]

    authorization = request.headers.get("Authorization")

    if not authorization:
        raise HTTPException(status_code=401, detail="Not authenticated")

    scheme, token = authorization.split()

    if scheme.lower() != "bearer":
        raise HTTPException(status_code=401, detail="Invalid authentication scheme")

    payload = decode_access_token(token)

    username = payload.get("sub")

    if username is None:
        raise HTTPException(status_code=401, detail="Invalid token")

    user = users_get_by_name(db, username)

    if user is None:
        raise HTTPException(status_code=401, detail="User not found")

    return user
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas import UserSchema
from app.schemas.auth import (
    LoginRequest,
    Token,
)

from app.services import auth as auth_service
from utils.dependencies import get_current_user

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)

@router.get(
    "/me",
    response_model=UserSchema,
)
def me(
    current_user=Depends(get_current_user),
):
    return current_user

@router.post(
    "/login",
    response_model=Token,
)
def login(
        login_request: LoginRequest,
        db: Session = Depends(get_db),
):

    return auth_service.login(
        db,
        login_request.username,
        login_request.password,
    )

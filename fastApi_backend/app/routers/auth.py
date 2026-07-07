from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.utils.dependencies import get_current_user
from app.database import get_db

from app.schemas.auth import (
    LoginInput,
    TokenType,
)
from app.schemas.users import UserType,UserInput

from app.services import auth as auth_service

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)


@router.post(
    "/login",
    response_model=TokenType,
)
def login(
        login_request: LoginInput,
        db: Session = Depends(get_db),
):

    return auth_service.login(
        db,
        login_request.username,
        login_request.password,
    )

@router.get(
    "/me",
    response_model=UserInput,
)
def me(
    current_user=Depends(get_current_user),
):
    return current_user

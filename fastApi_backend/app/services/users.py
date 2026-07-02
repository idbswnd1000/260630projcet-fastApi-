from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models import UsersModel
from app.repositories import *
from app.schemas import UserSchema, UserInputSchema
from app.utils.security import hash_password


def get_all_users(db: Session):
    return users_get_all(db)


def get_user(db: Session, user_id: int):
    user = users_get_by_id(db, user_id)
    if user is None:
        raise HTTPException(404, "User not found")
    return user


def create_user(
    db: Session,
    user_input: UserInputSchema,
):

    if users_get_by_name(db, user_input.username):
        raise HTTPException(
            status_code=400,
            detail="이미 존재하는 사용자입니다."
        )
    data = user_input.model_dump()
    data["password"] = hash_password(data["password"])
    user = UsersModel(**data)
    return users_create(db, user)


def update_user(db: Session, user_id: int, user_input: UserInputSchema):
    user = users_get_by_id(db, user_id)
    if user is None:
        raise HTTPException(404, "User not found")
    for key, value in user_input.model_dump().items():
        setattr(user, key, value)
    return user_repository.update(db, user)


def delete_user(db: Session, user_id: int):
    user = users_get_by_id(db, user_id)
    if user is None:
        raise HTTPException(404, "User not found")
    users_delete(db, user)
    return {"message": "Deleted"}
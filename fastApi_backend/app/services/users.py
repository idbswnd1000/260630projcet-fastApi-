from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models import UsersModel
from app.repositories.users import *
from app.schemas.users import (
    UserType as UserSchema,
    UserInput as UserInputSchema
)
from app.utils.security import hash_password


def get_all_users(db: Session):
    return get_all(db)


def get_user(db: Session, user_id: int):
    user = get_by_id(db, user_id)
    if user is None:
        raise HTTPException(404, "User not found")
    return user


def create_user(
    db: Session,
    username: str,
    password: str,
    age: int,
    email: str,
    city: str,
):

    if get_by_name(db, username):
        raise ValueError("이미 존재하는 사용자입니다.")

    user = UsersModel(
        username=username,
        password=hash_password(password),
        age=age,
        email=email,
        city=city,
    )

    return create(
        db,
        user,
    )


def update_user(db: Session, user_id: int, user_input: UserInputSchema):
    user = get_by_id(db, user_id)

    if user is None:
        raise HTTPException(404, "User not found")

    user.username = user_input.username
    user.password = hash_password(user_input.password)
    user.age = user_input.age
    user.email = user_input.email
    user.city = user_input.city

    return update(db, user)


def delete_user(db: Session, user_id: int):
    user = get_by_id(db, user_id)
    if user is None:
        raise HTTPException(404, "User not found")
    delete(db, user)
    return {"message": "Deleted"}
from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models import UsersModel
from app.schemas import UserInputSchema
from app.utils.security import hash_password
import app.repositories.users as repository


def get_all_users_service(db: Session):
    return repository.get_all(db)


def get_user_service(db: Session, id: int):
    user = repository.get_one_by_id(db, id)
    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )
    return user


def create_user_service(db: Session, data: UserInputSchema):
    user_data = data.model_dump()
    user_data["password"] = hash_password(user_data["password"])

    user = UsersModel(**user_data)
    return repository.create(db, user)

def update_user_service(
        db: Session,
        id: int,
        data: UserInputSchema
):
    user = repository.get_one_by_id(db, id)

    if not user:
        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )

    for key, value in data.model_dump().items():
        setattr(user, key, value)

    return repository.update(db, user)


def delete_user_service(db: Session, id: int):
    user = repository.get_one_by_id(db, id)

    if not user:
        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )

    repository.delete(db, user)

    return id
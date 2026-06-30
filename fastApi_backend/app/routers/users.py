from app.schemas import UserSchema, UserInputSchema
from fastapi import APIRouter, Depends
from app.database import get_db
from typing import List
from sqlalchemy.orm import Session

import app.services.users as services

router = APIRouter(
    prefix="/users",
    tags=["users"],
)

@router.get("", response_model=List[UserSchema])
def read_users(db: Session = Depends(get_db)):
    return services.get_all_users_service(db)


@router.get("/{id}", response_model=UserSchema)
def read_user(id: int, db: Session = Depends(get_db)):
    return services.get_user_service(db, id)


@router.post("", response_model=UserSchema)
def create_user(
    user_input: UserInputSchema,
    db: Session = Depends(get_db)
):
    return services.create_user_service(db, user_input)

@router.put("/{id}", response_model=UserSchema)
def update_users(
    id: int,
    user_input: UserInputSchema,
    db: Session = Depends(get_db)
):
    return services.update_user_service(db, id, user_input)


@router.delete("/{id}")
def delete_users(id: int, db: Session = Depends(get_db)):
    return services.delete_user_service(db, id)
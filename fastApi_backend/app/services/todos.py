from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models import TodosModel
from app.schemas import TodoInputSchema
import app.repositories.todos as repository


def get_all_todo_service(db: Session):
    return repository.get_all(db)


def get_todo_service(db: Session, id: int):
    todo = repository.get_one_by_id(db, id)

    if not todo:
        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )

    return todo


def create_todo_service(db: Session, data: TodoInputSchema):
    todo = TodosModel(**data.model_dump())
    return repository.create(db, todo)


def update_todo_service(
        db: Session,
        id: int,
        data: TodoInputSchema
):
    todo = repository.get_one_by_id(db, id)

    if not todo:
        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )

    for key, value in data.model_dump().items():
        setattr(todo, key, value)

    return repository.update(db, todo)


def delete_todo_service(db: Session, id: int):
    todo = repository.get_one_by_id(db, id)

    if not todo:
        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )

    repository.delete(db, todo)

    return id
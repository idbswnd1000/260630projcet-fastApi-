from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models import TodosModel
from app.repositories import todos as todo_repository
from app.schemas import TodoSchema, TodoInputSchema
from app.repositories import *


def get_all_todos(db: Session):
    return todos_get_all(db)


def get_todo(db: Session, todo_id: int):
    todo = todos_get_one_by_id(db, todo_id)
    if todo is None:
        raise HTTPException(404, "Todo not found")
    return todo


def create_todo(
        db: Session,
        todo_input: TodoInputSchema
):
    todo = TodosModel(**todo_input.model_dump())
    return todos_create(db, todo)


def update_todo(
    db: Session,
    todo_id: int,
    todo_input: TodoInputSchema
):
    todo = todos_get_one_by_id(db, todo_id)
    if todo is None:
        raise HTTPException(404, "Todo not found")
    for key, value in todo_input.model_dump().items():
        setattr(todo, key, value)
    return todos_update(db, todo)


def toggle_todo(db: Session, todo_id: int):
    todo = todos_get_one_by_id(db, todo_id)
    if todo is None:
        raise HTTPException(404, "Todo not found")
    todo.checked = not todo.checked
    return todos_update(db, todo)


def delete_todo(db: Session, todo_id: int):
    todo = todos_get_one_by_id(db, todo_id)
    if todo is None:
        raise HTTPException(404, "Todo not found")
    todos_delete(db, todo)
    return {"message": "Deleted"}
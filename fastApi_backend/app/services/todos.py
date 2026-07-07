from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models import TodosModel
from app.schemas.todos import TodoInput as TodoInputSchema
from app.repositories import *


def get_all_todos(db: Session):
    return todos_get_all(db)


def get_todo(db: Session, todo_id: int):
    todo = todos_get_one_by_id(db, todo_id)

    if todo is None:
        raise HTTPException(
            status_code=404,
            detail="Todo not found",
        )

    return todo


def create_todo(
    db: Session,
    todo_input: TodoInputSchema,
):
    todo = TodosModel(
        subject=todo_input.subject,
        checked=todo_input.checked,
    )

    return todos_create(db, todo)


def update_todo(
    db: Session,
    todo_id: int,
    todo_input: TodoInputSchema,
):
    todo = todos_get_one_by_id(db, todo_id)

    if todo is None:
        raise HTTPException(
            status_code=404,
            detail="Todo not found",
        )

    todo.subject = todo_input.subject
    todo.checked = todo_input.checked

    return todos_update(db, todo)


def toggle_todo(
    db: Session,
    todo_id: int,
):
    todo = todos_get_one_by_id(db, todo_id)

    if todo is None:
        raise HTTPException(
            status_code=404,
            detail="Todo not found",
        )

    todo.checked = not todo.checked

    return todos_update(db, todo)


def delete_todo(
    db: Session,
    todo_id: int,
):
    todo = todos_get_one_by_id(db, todo_id)

    if todo is None:
        raise HTTPException(
            status_code=404,
            detail="Todo not found",
        )

    todos_delete(db, todo)

    return True
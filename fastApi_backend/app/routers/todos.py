from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.todos import TodoType, TodoInput
from app.services import *

router = APIRouter(
    prefix="/todos",
    tags=["todos"],
)


@router.get("", response_model=List[TodoType])
def read_todos(db: Session = Depends(get_db)):
    return get_all_todos(db)


@router.get("/{todo_id}", response_model=TodoType)
def read_todo(todo_id: int, db: Session = Depends(get_db)):
    return get_todo(db, todo_id)


@router.post("", response_model=TodoType)
def web_create_todo(
    todo_input: TodoInput,
    db: Session = Depends(get_db),
):
    return create_todo(db, todo_input)


@router.put("/{todo_id}", response_model=TodoType)
def web_update_todo(
    todo_id: int,
    todo_input: TodoInput,
    db: Session = Depends(get_db),
):
    return update_todo(
        db,
        todo_id,
        todo_input,
    )


@router.patch("/{todo_id}/toggle", response_model=TodoType)
def web_toggle_todo(
    todo_id: int,
    db: Session = Depends(get_db),
):
    return toggle_todo(
        db,
        todo_id,
    )


@router.delete("/{todo_id}")
def web_delete_todo(
    todo_id: int,
    db: Session = Depends(get_db),
):
    return delete_todo(
        db,
        todo_id,
    )
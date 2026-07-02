from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas import TodoSchema, TodoInputSchema
from app.services import *

router = APIRouter(
    prefix="/todos",
    tags=["todos"],
)


@router.get("", response_model=List[TodoSchema])
def read_todos(db: Session = Depends(get_db)):
    return get_all_todos(db)


@router.get("/{todo_id}", response_model=TodoSchema)
def read_todo(todo_id: int, db: Session = Depends(get_db)):
    return get_todo(db, todo_id)


@router.post("", response_model=TodoSchema)
def web_create_todo(
    todo_input: TodoInputSchema,
    db: Session = Depends(get_db),
):
    return create_todo(db, todo_input)


@router.put("/{todo_id}", response_model=TodoSchema)
def web_update_todo(
    todo_id: int,
    todo_input: TodoInputSchema,
    db: Session = Depends(get_db),
):
    return update_todo(
        db,
        todo_id,
        todo_input,
    )


@router.patch("/{todo_id}/toggle", response_model=TodoSchema)
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
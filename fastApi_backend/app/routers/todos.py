from app.schemas import TodoSchema, TodoInputSchema
from fastapi import APIRouter, Depends
from app.database import get_db
from typing import List
from sqlalchemy.orm import Session

import app.services.todos as services

router = APIRouter(
    prefix="/todos",
    tags=["todos"],
)

# web 계층
@router.get("", response_model=List[TodoSchema])
def read_todos(db: Session = Depends(get_db)):
    return services.get_all_todo_service(db)


@router.get("/{id}", response_model=TodoSchema)
def read_todos(id: int, db: Session = Depends(get_db)):
    return services.get_todo_service(db, id)


@router.post("", response_model=TodoSchema)
def created_todos(
    todo_input: TodoInputSchema,
    db: Session = Depends(get_db)
):
    return services.create_todo_service(db, todo_input)


@router.put("/{id}", response_model=TodoSchema)
def update_todos(
    id: int,
    todo_input: TodoInputSchema,
    db: Session = Depends(get_db)
):
    return services.update_todo_service(db, id, todo_input)


@router.delete("/{id}")
def delete_todos(id: int, db: Session = Depends(get_db)):
    return services.delete_todo_service(db, id)
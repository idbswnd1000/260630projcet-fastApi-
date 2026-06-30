from app.schemas import TodoSchema
from app.schemas import TodoInputSchema
from app.models import TodosModel
from fastapi import APIRouter, HTTPException, Depends
from app.database import get_db
from typing import List
from sqlalchemy.orm import Session

router = APIRouter(
    prefix="/todos",
    tags=["todos"],
)

# TODO_TABLE = [
#     Todo(subject="CSS 공부", checked=True, id="1"),
#     Todo(subject="javaScript 공부", checked=False, id="2")
# ]

# web 계층
@router.get("", response_model=List[TodoSchema])
def read_todos(db: Session = Depends(get_db)):
    return db.query(TodosModel).all()

@router.get("/{id}", response_model=TodoSchema)
def read_todo(id: str,
                  db: Session = Depends(get_db)):
    todo = db.query(TodosModel).filter(TodosModel.id == id).first()
    if  todo is None:
        raise HTTPException(status_code=404, detail="Todo not found")
    return todo

@router.post("", response_model=TodoSchema)
def created_todo(todo_input: TodoInputSchema,
                    db: Session = Depends(get_db)):
    created_todo = TodosModel(**todo_input.model_dump())
    db.add(created_todo)
    db.commit()
    db.refresh(created_todo)
    return created_todo

@router.put("/{id}", response_model=TodoSchema)
def update_todo(id: str,
                    todo_input: TodoInputSchema,
                    db: Session = Depends(get_db)):
    update_todo = db.query(TodosModel).filter(TodosModel.id == id).first()
    if update_todo is None:
        raise HTTPException(status_code=404, detail="Todo not found")
    for key, value in todo_input.dict().items():
        setattr(update_todo, key, value)
    db.commit()
    db.refresh(update_todo)
    return update_todo

@router.delete("/{id}")
def delete_todo(id: str, db: Session = Depends(get_db)):
    todo = db.query(TodosModel).filter(TodosModel.id == id).first()
    if todo is None:
        raise HTTPException(status_code=404, detail="Todo not found")
    db.delete(todo)
    db.commit()
    return id
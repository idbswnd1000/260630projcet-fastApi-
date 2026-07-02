from sqlalchemy.orm import Session

from app.models import TodosModel


def get_all(db: Session):
    return db.query(TodosModel).all()


def get_one_by_id(db: Session, todo_id: int):
    return db.query(TodosModel).filter(TodosModel.id == todo_id).first()


def create(db: Session, todo: TodosModel):
    db.add(todo)
    db.commit()
    db.refresh(todo)
    return todo


def update(db: Session, todo: TodosModel):
    db.commit()
    db.refresh(todo)
    return todo


def delete(db: Session, todo: TodosModel):
    db.delete(todo)
    db.commit()
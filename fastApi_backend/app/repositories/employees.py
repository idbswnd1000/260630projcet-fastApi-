from sqlalchemy.orm import Session
from app.models import EmployeesModel

def get_all(db: Session):
    return db.query(EmployeesModel).all()

def get_one_by_id(db: Session, id: int):
    return (db.query(EmployeesModel)
            .filter(EmployeesModel.id == id)
            .first())

def create(db: Session, data: EmployeesModel):
    db.add(data)
    db.commit()
    db.refresh(data)
    return data

def update(db: Session, data: EmployeesModel):
    db.commit()
    db.refresh(data)
    return data

def delete(db: Session, data: EmployeesModel):
    db.delete(data)
    db.commit()


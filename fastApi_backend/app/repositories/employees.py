from sqlalchemy.orm import Session
from app.models import EmployeesModel

def get_all_Employee(db: Session):
    return db.query(EmployeesModel).all()

def get_one_by_id_Employee(db: Session, id: int):
    return (db.query(EmployeesModel)
            .filter(EmployeesModel.id == id)
            .first())

def create_employee(db: Session, data: EmployeesModel):
    db.add(data)
    db.commit()
    db.refresh(data)
    return data

def update_employee(db: Session, data: EmployeesModel):
    db.commit()
    db.refresh(data)
    return data

def delete_employee(db: Session, data: EmployeesModel):
    db.delete(data)
    db.commit()


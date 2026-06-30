from fastapi import HTTPException
from schemas.employees import Employee
from sqlalchemy.orm import Session
from app.models import EmployeesModel
from app.schemas import EmployeeSchema, EmployeeInputSchema
from app.repositories import *

def get_all_employees(db: Session):
    return get_all_Employee(db)

def get_employee(db: Session, id: int):
    employee = get_one_by_id_Employee(db, id)
    if not employee:
        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )
    return employee

def create_employee(db: Session, data: EmployeeInputSchema):
    employee = EmployeesModel(**data.dict())
    return create_employee(db, employee)

def update_employee(
        db: Session,
        id: int,
        data: EmployeeInputSchema
):
    employee = get_one_by_id_Employee(db, id)
    if not employee:
        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )
    for key, value in data.dict().items():
        setattr(employee, key, value)
    return update_employee(db, employee)

def delete_employee(db: Session, id: int):
    employee = get_one_by_id_Employee(db, id)
    if not employee:
        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )
    for key, value in employee.dict().items():
        setattr(employee, key, value)
    delete_employee(db, employee)
    return id
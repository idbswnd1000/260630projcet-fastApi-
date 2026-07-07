from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.models import EmployeeModel
from app.schemas.employees import EmployeeInput as EmployeeInputSchema
from app.repositories import *

def get_all_employees(db: Session):
    return emp_get_all(db)

def get_employee(db: Session, employee_id: int):
    employee = emp_get_one_by_id(db, employee_id)
    if not employee:
        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )
    return employee


def create_employee(db: Session, employee_input: EmployeeInputSchema):
    employee = EmployeeModel(
        name=employee_input.name,
        email=employee_input.email,
        job=employee_input.job,
        pay=employee_input.pay,
    )

    return emp_create(db, employee)

def update_employee(
        db: Session,
        employee_id: int,
        employee_input: EmployeeInputSchema
):
    employee = emp_get_one_by_id(db, employee_id)

    if not employee:
        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )

    employee.name = employee_input.name
    employee.email = employee_input.email
    employee.job = employee_input.job
    employee.pay = employee_input.pay

    return emp_update(db, employee)

def delete_employee(db: Session, employee_id: int):
    employee = emp_get_one_by_id(db, employee_id)
    if not employee:
        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )
    emp_delete(db, employee)
    return employee_id


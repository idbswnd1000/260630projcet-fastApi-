from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models import EmployeesModel
from app.schemas import EmployeeInputSchema
import app.repositories.employees as repository


def get_all_employees_service(db: Session):
    return repository.get_all(db)


def get_employee_service(db: Session, id: int):
    employee = repository.get_one_by_id(db, id)

    if not employee:
        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )

    return employee


def create_employee_service(db: Session, data: EmployeeInputSchema):
    employee = EmployeesModel(**data.model_dump())
    return repository.create(db, employee)


def update_employee_service(
        db: Session,
        id: int,
        data: EmployeeInputSchema
):
    employee = repository.get_one_by_id(db, id)

    if not employee:
        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )

    for key, value in data.model_dump().items():
        setattr(employee, key, value)

    return repository.update(db, employee)


def delete_employee_service(db: Session, id: int):
    employee = repository.get_one_by_id(db, id)

    if not employee:
        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )

    repository.delete(db, employee)

    return id
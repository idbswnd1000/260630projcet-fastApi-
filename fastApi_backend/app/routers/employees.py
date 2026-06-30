from app.schemas import EmployeeSchema, EmployeeInputSchema
from fastapi import APIRouter, Depends
from app.database import get_db
from typing import List
from sqlalchemy.orm import Session

import app.services.employees as services

router = APIRouter(
    prefix="/employees",
    tags=["employees"],
)

# web 계층
@router.get("", response_model=List[EmployeeSchema])
def read_employees(db: Session = Depends(get_db)):
    return services.get_all_employees_service(db)


@router.get("/{id}", response_model=EmployeeSchema)
def read_employee(id: int, db: Session = Depends(get_db)):
    return services.get_employee_service(db, id)


@router.post("", response_model=EmployeeSchema)
def created_employee(
    employee_input: EmployeeInputSchema,
    db: Session = Depends(get_db)
):
    return services.create_employee_service(db, employee_input)


@router.put("/{id}", response_model=EmployeeSchema)
def update_employee(
    id: int,
    employee_input: EmployeeInputSchema,
    db: Session = Depends(get_db)
):
    return services.update_employee_service(db, id, employee_input)


@router.delete("/{id}")
def delete_employee(id: int, db: Session = Depends(get_db)):
    return services.delete_employee_service(db, id)
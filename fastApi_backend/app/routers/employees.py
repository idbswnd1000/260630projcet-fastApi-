from app.schemas import EmployeeSchema, EmployeeInputSchema
from app.models import EmployeesModel
from fastapi import APIRouter, HTTPException, Depends
from app.database import get_db
from typing import List
from sqlalchemy.orm import Session
from app.services import *

router = APIRouter(
    prefix="/employees",
    tags=["employees"],
)

# EMPLOYEE_TABLE: List[Employee] = [
#     Employee(id="1", name="Thor", age=24, job="frontend", language="react", pay=400),
#     Employee(id="2", name="Peter", age=28, job="backend", language="python", pay=500),
#     Employee(id="3", name="Tony", age=21, job="database", language="postgres", pay=600),
#     Employee(id="4", name="Roki", age=42, job="ai", language="python", pay=700)
# ]

# web 계층
@router.get("", response_model=List[EmployeeSchema])
def read_employees(db: Session = Depends(get_db)):
    return get_all_Employee(db)

@router.get("/{id}", response_model=EmployeeSchema)
def read_employee(id: str,
                  db: Session = Depends(get_db)):
    employee = db.query(EmployeesModel).filter(EmployeesModel.id == id).first()
    if  employee is None:
        raise HTTPException(status_code=404, detail="Employee not found")
    return employee

@router.post("", response_model=EmployeeSchema)
def created_employee(employee_input: EmployeeInputSchema,
                    db: Session = Depends(get_db)):
    created_employee = EmployeesModel(**employee_input.model_dump())
    db.add(created_employee)
    db.commit()
    db.refresh(created_employee)
    return created_employee

@router.put("/{id}", response_model=EmployeeSchema)
def update_employee(id: str,
                    employee_input: EmployeeInputSchema,
                    db: Session = Depends(get_db)):
    update_employee = db.query(EmployeesModel).filter(EmployeesModel.id == id).first()
    if update_employee is None:
        raise HTTPException(status_code=404, detail="Employee not found")
    for key, value in employee_input.dict().items():
        setattr(update_employee, key, value)
    db.commit()
    db.refresh(update_employee)
    return update_employee

@router.delete("/{id}")
def delete_employee(id: str, db: Session = Depends(get_db)):
    employee = db.query(EmployeesModel).filter(EmployeesModel.id == id).first()
    if employee is None:
        raise HTTPException(status_code=404, detail="Employee not found")
    db.delete(employee)
    db.commit()
    return id
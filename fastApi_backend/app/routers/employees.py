from app.schemas.employees import EmployeeType, EmployeeInput
from app.models import EmployeeModel
from fastapi import APIRouter, Depends, HTTPException
from app.database import get_db
from typing import List
from sqlalchemy.orm import Session
from app.services import *

router = APIRouter(
    prefix="/employees",
    tags=["employees"],
)


#web 계층
@router.get("", response_model=List[EmployeeType])
def web_read_employees(db:Session=Depends(get_db)):
    return get_all_employees(db)

@router.get("/{id}", response_model=EmployeeType)
def web_read_employees(id: str, db:Session=Depends(get_db)):
    return get_employee_by_id(db, id)

@router.post("",response_model=EmployeeType)
def web_create_employee(
        employee_input: EmployeeInput,
        db:Session=Depends(get_db)
):
    return create_employee(db, employee_input)


@router.put("/{id}", response_model=EmployeeType)
def web_update_employee(
        id: str,
        employee_input: EmployeeInput,
        db:Session=Depends(get_db)
):
    return update_employee(db, id, employee_input)


@router.delete("/{id}")
def web_delete_employee(id: str, db:Session=Depends(get_db)):
    return delete_employee(db, id)

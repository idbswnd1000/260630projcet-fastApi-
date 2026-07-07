from typing import Optional

from sqlalchemy.orm import Session

from models.employees.model import Employees
from schemas.employees.schema import EmployeeInput


class EmployeesRepository:

    def find_all(self, db):
        return db.query(Employees).order_by(Employees.id.asc()).all()

    def find_by_id(self, db: Session, id: int) -> Optional[Employees]:
        return db.query(Employees).filter(Employees.id == id).first()

    def create(self, db: Session, input: EmployeeInput) -> Employees:
        employee = Employees(
            name=input.name,
            email=input.email,
            job=input.job,
            pay=input.pay
        )

        db.add(employee)
        db.commit()
        db.refresh(employee)

        return employee

    def update(self, db: Session, id: int, input: EmployeeInput) -> Employees:
        employee = db.query(Employees).filter(Employees.id == id).first()

        if employee is None:
            return None

        employee.name = input.name
        employee.email = input.email
        employee.job = input.job
        employee.pay = input.pay

        db.commit()
        db.refresh(employee)

        return employee

    def delete(self, db: Session, id: int) -> None:
        employee = db.query(Employees).filter(Employees.id == id).first()
        if employee is None:
            return None
        db.delete(employee)
        db.commit()
        return None
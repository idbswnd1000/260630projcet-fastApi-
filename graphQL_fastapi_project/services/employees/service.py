from typing import Optional,List

from database import SessionLocal
from models.employees.model import Employees
from schemas.employees.schema import Employee, EmployeeInput
from repositories.employees.repository import EmployeesRepository
from sqlalchemy.engine import row


class EmployeesService:

    def __init__(self):
        self.repository = EmployeesRepository()

    def to_graphql(self, employees: Employees) -> Employee:
        return Employees(
            id = employees.id,
            name = employees.name,
            email = employees.email,
            job = employees.job,
            pay = employees.pay,
        )

    def get_all_employees(self) -> List[Employees]:
        with SessionLocal() as session:
            rows = self.repository.find_all(session)
            if rows is None:
                return None
        return [self.to_graphql(rows) for rows in rows];

    def get_employee_by_id(self, id: int) -> Employee:
        with SessionLocal() as session:
            row = self.repository.find_by_id(session, id)
            if row is None:
                return None
        return self.to_graphql(row);

    def create_employee(self, input: EmployeeInput) -> Employee:
        with SessionLocal() as session:
            row = self.repository.create(session, input)
            return self.to_graphql(row)

    def update_employee(self, id:int, employee_input: EmployeeInput) -> Employee:
        with SessionLocal() as session:
            row = self.repository.find_by_id(session, id, )
        if row is None:
            raise ValueError("Employee not found")
        updated_employee = self.repository.update(session, id, employee_input)
        return self.to_graphql(updated_employee);

    def delete_employee(self, id: int) -> bool:
        with SessionLocal() as session:
            row = self.repository.find_by_id(session, int(id))
            if row is None:
                raise ValueError("Employee not found")
            self.repository.delete(session, int(id));
            return True
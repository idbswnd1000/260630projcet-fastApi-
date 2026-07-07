import strawberry
from app.database import SessionLocal
from app.schemas.employees import EmployeeType, EmployeeInput
from app.services import employees as employee_service


@strawberry.type
class EmployeeQuery:

    @strawberry.field
    def employees(self) -> list[EmployeeType]:
        db = SessionLocal()

        try:
            employees = employee_service.get_all_employees(db)

            return [
                EmployeeType(
                    id=e.id,
                    name=e.name,
                    email=e.email,
                    job=e.job,
                    pay=e.pay,
                )
                for e in employees
            ]

        finally:
            db.close()

    @strawberry.field
    def employee(self, id: int) -> EmployeeType | None:
        db = SessionLocal()

        try:
            employee = employee_service.get_employee(db, id)

            return EmployeeType(
                id=employee.id,
                name=employee.name,
                email=employee.email,
                job=employee.job,
                pay=employee.pay,
            )

        finally:
            db.close()


@strawberry.type
class EmployeeMutation:

    @strawberry.mutation
    def create_employee(
        self,
        input: EmployeeInput,
    ) -> EmployeeType:
        db = SessionLocal()

        try:
            employee = employee_service.create_employee(
                db=db,
                employee_input=input,
            )

            return EmployeeType(
                id=employee.id,
                name=employee.name,
                email=employee.email,
                job=employee.job,
                pay=employee.pay,
            )

        finally:
            db.close()

    @strawberry.mutation
    def update_employee(
        self,
        id: int,
        input: EmployeeInput,
    ) -> EmployeeType:
        db = SessionLocal()

        try:
            employee = employee_service.update_employee(
                db=db,
                employee_id=id,
                employee_input=input,
            )

            return EmployeeType(
                id=employee.id,
                name=employee.name,
                email=employee.email,
                job=employee.job,
                pay=employee.pay,
            )

        finally:
            db.close()

    @strawberry.mutation
    def delete_employee(
        self,
        id: int,
    ) -> bool:
        db = SessionLocal()

        try:
            employee_service.delete_employee(db, id)
            return True

        finally:
            db.close()
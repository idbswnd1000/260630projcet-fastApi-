from schemas.employees.schema import Employee, EmployeeInput
import strawberry
from services.employees.service import EmployeesService
employees_service = EmployeesService()

@strawberry.type
class Mutation:
    @strawberry.mutation
    def createEmployee(self, input: EmployeeInput) -> Employee:
        return employees_service.create_employee(input)
    @strawberry.mutation
    def updateEmployee(self, id: strawberry.ID ,input: EmployeeInput) -> Employee:
        return employees_service.update_employee(int(id), input)
    @strawberry.mutation
    def deleteEmployee(self, id:strawberry.ID) -> bool:
        return employees_service.delete_employee(int(id))

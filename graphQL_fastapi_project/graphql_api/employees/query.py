from typing import Optional, List
import strawberry

from schemas.employees.schema import Employee, EmployeeInput
from services.employees.service import EmployeesService

employees_service = EmployeesService()

@strawberry.type
class Query:
    @strawberry.field
    def employeesGetAll(self) -> List[Employee]:
        return employees_service.get_all_employees()

    @strawberry.field
    def employeesGetOne(self, id: strawberry.ID) -> Optional[Employee]:
        return employees_service.get_employee_by_id(int(id))

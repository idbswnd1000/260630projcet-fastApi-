import datetime
import strawberry


# ====================================================
# Employee
# =====================================================

@strawberry.type
class EmployeeType:
    id: int
    name: str
    email: str
    job: str
    pay: int


@strawberry.input
class EmployeeInput:
    name: str
    email: str
    job: str
    pay: int
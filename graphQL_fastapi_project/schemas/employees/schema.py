import strawberry

@strawberry.type
class Employee:
    id: strawberry.ID
    name: str
    email: str
    job : str
    pay : int

@strawberry.input
class EmployeeInput:
    name: str
    email: str
    job : str
    pay : int
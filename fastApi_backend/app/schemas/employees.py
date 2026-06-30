from pydantic import BaseModel, ConfigDict

class EmployeeInput(BaseModel):
    name: str
    age: int
    job: str
    language: str
    pay: int


class Employee(EmployeeInput):
    id: int
    model_config = ConfigDict(from_attributes=True)
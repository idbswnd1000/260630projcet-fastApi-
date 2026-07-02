from pydantic import BaseModel, ConfigDict

# json 구조 파싱한다.
# Pydantic Schema : json => tuple
class EmployeeInput(BaseModel):
    name: str
    email: str
    job: str
    pay: int

class Employee(EmployeeInput):
    id: int
    model_config = ConfigDict(from_attributes=True)
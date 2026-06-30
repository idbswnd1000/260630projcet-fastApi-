from pydantic import BaseModel, ConfigDict


#  Pydantic Schema : json => tubple / json 구조 파싱한다
# post => (/emp, {}) object를 backend에서 설정
# object를 추가하는데 id가 필요 없음
class EmployeeInput(BaseModel):
    name: str
    age: int
    job: str
    language: str
    pay: int


class Employee(EmployeeInput):
    id: int
    model_config = ConfigDict(from_attributes=True)
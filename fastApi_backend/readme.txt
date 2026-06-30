import uuid

from fastapi import FastAPI, HTTPException
import uvicorn as uvicorn
from pydantic import BaseModel
from typing import List


# Model 계층
# Pydantic Modal : json => tuple(table)
class Employee(BaseModel):  # create table과 동일
    id: str
    name: str
    age: int
    job: str
    language: str
    pay: int


#  Pydantic Schema : json => tubple
# post => (/emp, {}) object를 backend에서 설정
# object를 추가하는데 id가 필요 없음
class EmployeeInput(BaseModel):
    name: str
    age: int
    job: str
    language: str
    pay: int


# Database 계층
EMPLOYEE_TABLE: List[Employee] = [
    Employee(id="1", name="Thor", age=24, job="frontend", language="react", pay=400),
    Employee(id="2", name="Peter", age=28, job="backend", language="python", pay=500),
    Employee(id="3", name="Tony", age=21, job="database", language="postgres", pay=600),
    Employee(id="4", name="Roki", age=42, job="ai", language="python", pay=700)
]

app = FastAPI()


# web 계층
@app.get("/employee", response_model=List[Employee])
def read_employees():
    return EMPLOYEE_TABLE

@app.get("/employee/{id}", response_model=Employee)
def read_employee(id: str): # next() => for문을
    employee = next((emp for emp in EMPLOYEE_TABLE if emp.id == id), None)
    if  employee is None:
        raise HTTPException(status_code=404, detail="Employee not found")
    return employee

@app.post("/employee")
def create_employee(employee_input: EmployeeInput):
    #EMPLOYEE.append(employee_input)
    EMPLOYEE_TABLE = [
        *EMPLOYEE_TABLE,
        {
            **employee_input,
            "id": str(max(int(emp.id) for emp in EMPLOYEE_TABLE)+1),
        }
    ]
    return employee_input

@app.put("/employee/{id}", response_model=Employee)
def update_employee(id: str, employee_input: Employee):
    EMPLOYEE_TABLE = [
        employee_input if emp.id == id else emp for emp in EMPLOYEE_TABLE
    ]
    # js map(item, id) id==id ? emp : item
    # python : true if id==id else false
    return employee_input

@app.delete("/employee/{id}")
def delete_employee(id: str):
    EMPLOYEE_TABLE = [
        emp for emp in EMPLOYEE_TABLE if emp.id != id
    ]
    return id

@app.get("/")
def root():
    return {"message": "FastAPI RESTFUL server running"}


if __name__ == '__main__':
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)

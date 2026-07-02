from pydantic import BaseModel
from app.database import Base
from sqlalchemy import Column, Integer, String

# ORM=> Object Relation Mapping: JPA, Django
#model 계층
# Pydantic Modal : json => tuple
class Employees(Base):
    __tablename__ = "employees"
    id = Column(Integer, primary_key=True, index=True,autoincrement=True)
    name = Column(String(50))
    email = Column(String(50))
    job = Column(String(50))
    pay = Column(Integer)
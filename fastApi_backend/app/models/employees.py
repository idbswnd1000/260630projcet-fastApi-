from app.database import Base
from sqlalchemy import Column, Integer, String

#ORM: Objcect Relation Mapping
# Pydantic Modal : json => tuple(table)
class Employees(Base):  # create table과 동일
    __tablename__ = 'employees'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50))
    age = Column(Integer)
    job = Column(String(50))
    language = Column(String(50))
    pay = Column(Integer)


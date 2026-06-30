from app.database import Base
from sqlalchemy import Column, Integer, String, Boolean


class Todos(Base):
    __tablename__ = 'todos'
    subject = Column(String(50))
    checked = Column(Boolean)
    id = Column(Integer, primary_key=True, index=True)
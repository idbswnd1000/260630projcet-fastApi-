from fastapi import FastAPI
import uvicorn
from pydantic import BaseModel
from typing import List
from fastapi.middleware.cors import CORSMiddleware
from app.database import Base, engine

from app.routers import emp_router
from app.routers import todos_router
from app.routers import users_router
from app.routers import products_router
from app.routers import auth_router
from app.routers import sales_router
import app.models

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",# Vite
        "http://localhost:5174",
        "http://127.0.0.1:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(emp_router)
app.include_router(todos_router)
app.include_router(users_router)
app.include_router(products_router)
app.include_router(auth_router)
app.include_router(sales_router)



if __name__ == '__main__':
    uvicorn.run("app.main:app", host="127.0.0.1", port=8000, reload=True)



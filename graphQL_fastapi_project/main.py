from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import strawberry
from strawberry.fastapi import GraphQLRouter

from database import SessionLocal, engine, Base
from models.employees.model import Employees
from graphql_api.employees.query import Query
from graphql_api.employees.mutation import Mutation

schema = strawberry.Schema(
    query=Query,
    mutation=Mutation,
)
app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

graphql_app = GraphQLRouter(schema)
app.include_router(graphql_app, prefix="/graphql")

@app.get("/")
def read_root():
    return {"server working..."}

@app.on_event("startup")
def on_startup():
    Base.metadata.create_all(bind=engine)
from fastapi import FastAPI, HTTPException
import uvicorn as uvicorn
from pydantic import BaseModel
from typing import List
from starlette.middleware.cors import CORSMiddleware
from app.routers import emprouter, todorouter, productrouter, salerouter, userrouter
from app.database import Base, engine
from app import models

Base.metadata.create_all(bind=engine)

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"])
app.include_router(emprouter)
app.include_router(productrouter)
app.include_router(salerouter)
app.include_router(todorouter)
app.include_router(userrouter)

@app.get("/")
def root():
    return {"message": "FastAPI RESTFUL server running"}

if __name__ == '__main__':
    uvicorn.run("app.main:app", host="127.0.0.1", port=8000, reload=True)

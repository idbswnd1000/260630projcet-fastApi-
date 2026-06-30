from app.schemas import ProductSchema, ProductInputSchema
from fastapi import APIRouter, Depends
from app.database import get_db
from typing import List
from sqlalchemy.orm import Session

import app.services.products as services

router = APIRouter(
    prefix="/products",
    tags=["products"],
)

@router.get("", response_model=List[ProductSchema])
def read_products(db: Session = Depends(get_db)):
    return services.get_all_products_service(db)


@router.get("/{id}", response_model=ProductSchema)
def read_product(id: int, db: Session = Depends(get_db)):
    return services.get_product_service(db, id)


@router.post("", response_model=ProductSchema)
def create_product(
    product_input: ProductInputSchema,
    db: Session = Depends(get_db)
):
    return services.create_product_service(db, product_input)


@router.put("/{id}", response_model=ProductSchema)
def update_product(
    id: int,
    product_input: ProductInputSchema,
    db: Session = Depends(get_db)
):
    return services.update_product_service(db, id, product_input)


@router.delete("/{id}")
def delete_product(id: int, db: Session = Depends(get_db)):
    return services.delete_product_service(db, id)
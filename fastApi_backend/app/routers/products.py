from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.products import ProductType, ProductInput
from app.services import *

router = APIRouter(
    prefix="/products",
    tags=["products"],
)


@router.get("", response_model=List[ProductType])
def web_read_products(db: Session = Depends(get_db)):
    return get_all_products(db)


@router.get("/{product_id}", response_model=ProductType)
def web_read_product(product_id: int,
                 db: Session = Depends(get_db)):
    return get_product(db, product_id)


@router.post("", response_model=ProductType)
def web_create_product(product_input: ProductInput,
                   db: Session = Depends(get_db)):

    # print("Product", product_input)
    return create_product(
        db,
        product_input
    )


@router.put("/{product_id}", response_model=ProductType)
def web_update_product(product_id: int,
                   product_input: ProductInput,
                   db: Session = Depends(get_db)):
    return update_product(
        db,
        product_id,
        product_input
    )


@router.delete("/{product_id}")
def web_delete_product(product_id: int,
                   db: Session = Depends(get_db)):
    return delete_product(
        db,
        product_id
    )
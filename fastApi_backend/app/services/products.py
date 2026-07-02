from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models import ProductsModel
from app.repositories import *
from app.schemas import ProductSchema, ProductInputSchema


def get_all_products(db: Session):
    return products_get_all(db)


def get_product(db: Session, product_id: int):

    product = products_get_by_id(db, product_id)

    if product is None:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    return product


def create_product(
        db: Session,
        product_input: ProductInputSchema
):

    product = ProductsModel(**product_input.model_dump())

    return products_create(db, product)


def update_product(
        db: Session,
        product_id: int,
        product_input: ProductInputSchema
):

    product = products_get_by_id(db, product_id)

    if product is None:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    for key, value in product_input.model_dump().items():
        setattr(product, key, value)

    return products_update(db, product)


def delete_product(
        db: Session,
        product_id: int
):

    product = products_get_by_id(db, product_id)

    if product is None:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    products_delete(db, product)

    return {"message": "Deleted"}
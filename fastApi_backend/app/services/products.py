from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models import ProductsModel
from app.repositories import *
from app.schemas.products import (
    ProductType as ProductSchema,
    ProductInput as ProductInputSchema
)


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
        product_name: str,
        color: str,
        price: int,
        sale_price: int,
        product_category_code: str,
):
    product = ProductsModel(
        product_name=product_name,
        color=color,
        price=price,
        sale_price=sale_price,
        product_category_code=product_category_code,
    )

    return products_create(db, product)


def update_product(
        db: Session,
        product_id: int,
        product_name: str,
        color: str,
        price: int,
        sale_price: int,
        product_category_code: str,
):
    product = products_get_by_id(db, product_id)

    if product is None:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    product.product_name = product_name
    product.color = color
    product.price = price
    product.sale_price = sale_price
    product.product_category_code = product_category_code

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

    return True
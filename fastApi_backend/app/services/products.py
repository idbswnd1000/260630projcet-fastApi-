from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models import ProductsModel
from app.schemas import ProductInputSchema
import app.repositories.products as repository


def get_all_products_service(db: Session):
    return repository.get_all(db)


def get_product_service(db: Session, id: int):
    product = repository.get_one_by_id(db, id)

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    return product


def create_product_service(db: Session, data: ProductInputSchema):
    product = ProductsModel(**data.model_dump())
    return repository.create(db, product)


def update_product_service(
        db: Session,
        id: int,
        data: ProductInputSchema
):
    product = repository.get_one_by_id(db, id)

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    for key, value in data.model_dump().items():
        setattr(product, key, value)

    return repository.update(db, product)


def delete_product_service(db: Session, id: int):
    product = repository.get_one_by_id(db, id)

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    repository.delete(db, product)

    return id
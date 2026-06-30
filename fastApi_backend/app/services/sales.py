
from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models import SalesModel
from app.schemas import SaleInputSchema
import app.repositories.sales as repository


def get_all_sales_service(db: Session):
    return repository.get_all(db)


def get_sale_service(db: Session, id: int):
    sale = repository.get_one_by_id(db, id)

    if not sale:
        raise HTTPException(
            status_code=404,
            detail="Sale not found"
        )

    return sale


def create_sale_service(db: Session, data: SaleInputSchema):
    sale = SalesModel(**data.model_dump())
    return repository.create(db, sale)


def update_sale_service(
        db: Session,
        id: int,
        data: SaleInputSchema
):
    sale = repository.get_one_by_id(db, id)

    if not sale:
        raise HTTPException(
            status_code=404,
            detail="Sale not found"
        )

    for key, value in data.model_dump().items():
        setattr(sale, key, value)

    return repository.update(db, sale)


def delete_sale_service(db: Session, id: int):
    sale = repository.get_one_by_id(db, id)

    if not sale:
        raise HTTPException(
            status_code=404,
            detail="Sale not found"
        )

    repository.delete(db, sale)

    return id
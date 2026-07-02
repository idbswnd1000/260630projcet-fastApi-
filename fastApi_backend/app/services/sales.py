from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.repositories import sales as sale_repository


def get_all_sales(db: Session):
    return sale_repository.get_all(db)


def get_sale(
    db: Session,
    sale_id: int,
):

    sale = sale_repository.get_by_id(
        db,
        sale_id,
    )

    if sale is None:
        raise HTTPException(
            status_code=404,
            detail="Sale not found",
        )

    return sale
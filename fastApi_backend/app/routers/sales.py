from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas import SaleSchema
from app.services import sales as sale_service

router = APIRouter(
    prefix="/sales",
    tags=["Sales"],
)


@router.get(
    "",
    response_model=List[SaleSchema],
)
def read_sales(
    db: Session = Depends(get_db),
):
    return sale_service.get_all_sales(db)


@router.get(
    "/{sale_id}",
    response_model=SaleSchema,
)
def read_sale(
    sale_id: int,
    db: Session = Depends(get_db),
):
    return sale_service.get_sale(
        db,
        sale_id,
    )
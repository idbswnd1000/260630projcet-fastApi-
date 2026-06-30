from app.schemas import SaleSchema, SaleInputSchema
from fastapi import APIRouter, Depends
from app.database import get_db
from typing import List
from sqlalchemy.orm import Session

import app.services.sales as services

router = APIRouter(
    prefix="/sales",
    tags=["sales"],
)

@router.get("", response_model=List[SaleSchema])
def read_sales(db: Session = Depends(get_db)):
    return services.get_all_sales_service(db)


@router.get("/{id}", response_model=SaleSchema)
def read_sale(id: int, db: Session = Depends(get_db)):
    return services.get_sale_service(db, id)


@router.post("", response_model=SaleSchema)
def create_sale(
    sale_input: SaleInputSchema,
    db: Session = Depends(get_db)
):
    return services.create_sale_service(db, sale_input)


@router.put("/{id}", response_model=SaleSchema)
def update_sale(
    id: int,
    sale_input: SaleInputSchema,
    db: Session = Depends(get_db)
):
    return services.update_sale_service(db, id, sale_input)


@router.delete("/{id}")
def delete_sale(id: int, db: Session = Depends(get_db)):
    return services.delete_sale_service(db, id)
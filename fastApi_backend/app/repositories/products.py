from sqlalchemy.orm import Session
from app.models import ProductsModel

def get_all(db: Session):
    return db.query(ProductsModel).all()

def get_one_by_id(db: Session, id: int):
    return (
        db.query(ProductsModel)
        .filter(ProductsModel.id == id)
        .first()
    )

def create(db: Session, data: ProductsModel):
    db.add(data)
    db.commit()
    db.refresh(data)
    return data

def update(db: Session, data: ProductsModel):
    db.commit()
    db.refresh(data)
    return data

def delete(db: Session, data: ProductsModel):
    db.delete(data)
    db.commit()
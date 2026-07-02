from sqlalchemy.orm import Session

from app.models import ProductsModel


def get_all(db: Session):
    return db.query(ProductsModel).all()


def get_by_id(db: Session, product_id: int):
    return (
        db.query(ProductsModel)
        .filter(ProductsModel.id == product_id)
        .first()
    )


def create(db: Session, product: ProductsModel):
    db.add(product)
    db.commit()
    db.refresh(product)
    return product


def update(db: Session, product: ProductsModel):
    db.commit()
    db.refresh(product)
    return product


def delete(db: Session, product: ProductsModel):
    db.delete(product)
    db.commit()
from sqlalchemy.orm import Session

from app.models import SalesModel


def get_all(db: Session):
    return (
        db.query(SalesModel)
        .order_by(SalesModel.created_at.desc())
        .all()
    )


def get_by_id(
    db: Session,
    sale_id: int,
):
    return (
        db.query(SalesModel)
        .filter(SalesModel.id == sale_id)
        .first()
    )
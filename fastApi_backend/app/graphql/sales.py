import strawberry

from app.database import SessionLocal
from app.schemas.sales import SaleType
from app.services import sales as sale_service


@strawberry.type
class SaleQuery:

    @strawberry.field
    def sales(self) -> list[SaleType]:

        db = SessionLocal()

        try:
            sales = sale_service.get_all_sales(db)

            return [
                SaleType(
                    id=s.id,
                    user_id=s.user_id,
                    product_id=s.product_id,
                    quantity=s.quantity,
                    discount_rate=s.discount_rate,
                    total_price=s.total_price,
                    created_at=s.created_at,
                )
                for s in sales
            ]

        finally:
            db.close()

    @strawberry.field
    def sale(self, id: int) -> SaleType | None:

        db = SessionLocal()

        try:
            sale = sale_service.get_sale(db, id)

            if sale is None:
                return None

            return SaleType(
                id=sale.id,
                user_id=sale.user_id,
                product_id=sale.product_id,
                quantity=sale.quantity,
                discount_rate=sale.discount_rate,
                total_price=sale.total_price,
                created_at=sale.created_at,
            )

        finally:
            db.close()
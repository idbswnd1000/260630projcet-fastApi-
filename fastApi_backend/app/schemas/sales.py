import strawberry
from datetime import date


@strawberry.type
class SaleType:
    id: int
    user_id: int
    product_id: int
    quantity: int
    discount_rate: float
    total_price: int
    created_at: date



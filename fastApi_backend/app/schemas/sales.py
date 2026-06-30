from pydantic import BaseModel, ConfigDict
from datetime import datetime

class SaleInput(BaseModel):
    date: datetime
    product_code: int
    customer_code: int
    promotion_code: int
    channel_code: int
    quantity: int

class Sale(SaleInput):
    id: int
    model_config = ConfigDict(from_attributes=True)
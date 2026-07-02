from pydantic import BaseModel, ConfigDict


class ProductInput(BaseModel):
    product_name: str
    color: str
    price: int
    sale_price: int
    category_code: str


class Product(ProductInput):
    id: int

    model_config = ConfigDict(from_attributes=True)
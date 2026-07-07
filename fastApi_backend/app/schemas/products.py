import strawberry


@strawberry.type
class ProductType:
    id: int
    product_name: str
    color: str
    price: int
    sale_price: int
    product_category_code: str


@strawberry.input
class ProductInput:
    product_name: str
    color: str
    price: int
    sale_price: int
    product_category_code: str
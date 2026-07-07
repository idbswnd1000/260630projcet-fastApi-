import strawberry

from app.database import SessionLocal
from app.schemas.products import ProductType, ProductInput
from app.services import products as product_service


@strawberry.type
class ProductQuery:

    @strawberry.field
    def products(self) -> list[ProductType]:

        db = SessionLocal()

        try:
            products = product_service.get_all_products(db)

            return [
                ProductType(
                    id=p.id,
                    product_name=p.product_name,
                    color=p.color,
                    price=p.price,
                    sale_price=p.sale_price,
                    product_category_code=p.product_category_code,
                )
                for p in products
            ]

        finally:
            db.close()

    @strawberry.field
    def product(self, id: int) -> ProductType | None:

        db = SessionLocal()

        try:
            product = product_service.get_product(db, id)

            if product is None:
                return None

            return ProductType(
                id=product.id,
                product_name=product.product_name,
                color=product.color,
                price=product.price,
                sale_price=product.sale_price,
                product_category_code=product.product_category_code,
            )

        finally:
            db.close()


@strawberry.type
class ProductMutation:

    @strawberry.mutation
    def create_product(
        self,
        input: ProductInput,
    ) -> ProductType:

        db = SessionLocal()

        try:
            product = product_service.create_product(
                db=db,
                product_name=input.product_name,
                color=input.color,
                price=input.price,
                sale_price=input.sale_price,
                product_category_code=input.product_category_code,
            )

            return ProductType(
                id=product.id,
                product_name=product.product_name,
                color=product.color,
                price=product.price,
                sale_price=product.sale_price,
                product_category_code=product.product_category_code,
            )

        finally:
            db.close()

    @strawberry.mutation
    def update_product(
        self,
        id: int,
        input: ProductInput,
    ) -> ProductType:

        db = SessionLocal()

        try:
            product = product_service.update_product(
                db=db,
                product_id=id,
                product_name=input.product_name,
                color=input.color,
                price=input.price,
                sale_price=input.sale_price,
                product_category_code=input.product_category_code,
            )

            return ProductType(
                id=product.id,
                product_name=product.product_name,
                color=product.color,
                price=product.price,
                sale_price=product.sale_price,
                product_category_code=product.product_category_code,
            )

        finally:
            db.close()

    @strawberry.mutation
    def delete_product(
        self,
        id: int,
    ) -> bool:

        db = SessionLocal()

        try:
            return product_service.delete_product(db, id)

        finally:
            db.close()
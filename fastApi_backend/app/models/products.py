from sqlalchemy import Column, String, BigInteger
from app.database import Base


class Products(Base):
    __tablename__ = "products"

    id = Column(BigInteger, primary_key=True, index=True)
    product_name = Column(String)
    color = Column(String)
    price = Column(BigInteger)
    sale_price = Column(BigInteger)
    product_category_code = Column(String)
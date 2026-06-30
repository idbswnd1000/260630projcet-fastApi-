from sqlalchemy import Column, BigInteger, DateTime
from app.database import Base


class Sales(Base):
    __tablename__ = "sales"

    id = Column(BigInteger, primary_key=True, index=True)
    date = Column(DateTime)
    product_code = Column(BigInteger)
    customer_code = Column(BigInteger)
    promotion_code = Column(BigInteger)
    channel_code = Column(BigInteger)
    quantity = Column(BigInteger)
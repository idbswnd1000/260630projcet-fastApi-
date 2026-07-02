from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
engine = create_engine('postgresql://admin:1234@localhost:5432/testdb')
sessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)
Base = declarative_base()
def get_db():
    db = sessionLocal()
    try:
        yield db
    finally:
        db.close()
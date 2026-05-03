import os

from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

load_dotenv()

SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL")

if not SQLALCHEMY_DATABASE_URL:
    raise ValueError("DATABASE_URL not defined in .env file")

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    pool_pre_ping=True  
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()

def get_db():
    """
    This creates a session with the database and closes it right after
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
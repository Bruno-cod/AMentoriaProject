# core/database.py
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

# 1. A URL de conexão. Aqui usamos o SQLite para gerar um arquivo local.
# No futuro, mudaremos para algo como "postgresql://usuario:senha@localhost/tutor_db"
SQLALCHEMY_DATABASE_URL = "sqlite:///./tutor_banco_local.db"

# 2. Cria o "Motor" que se comunica com o banco
# O connect_args é uma exigência específica do SQLite no FastAPI
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

# 3. Cria a fábrica de sessões (as conversas do nosso backend com o banco)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 4. A classe Base. Todos os nossos modelos de tabelas vão herdar dela.
Base = declarative_base()

def get_db():
    """
    Cria uma sessão de banco de dados para uma requisição e a fecha logo depois.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
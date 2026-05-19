import os
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from dotenv import load_dotenv

# Carrega as variáveis do arquivo .env
load_dotenv()

# 1. Busca a URL do .env. Se o arquivo estiver vazio, usa o SQLite como padrão de testes.
# Altere o valor padrão abaixo se quiser mudar o nome do arquivo SQLite local.
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./tutor_banco_local.db")

# 2. Cria o "Motor" adaptando-se ao banco escolhido
if SQLALCHEMY_DATABASE_URL.startswith("sqlite"):
    # Configuração específica e necessária para o SQLite funcionar com o FastAPI
    engine = create_engine(
        SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
    )
else:
    # Configuração para o PostgreSQL do Docker (usa a porta 5433 definida no seu .env)
    engine = create_engine(SQLALCHEMY_DATABASE_URL)

# 3. Cria a fábrica de sessões
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 4. A classe Base para os modelos herdarem
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
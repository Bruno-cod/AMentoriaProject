# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import auth, chat, alunos, historico, arquivos
from core.database import engine
from models import models # Importa os modelos para o SQLAlchemy saber quais tabelas criar

models.Base.metadata.create_all(bind=engine)

# Inicializa a aplicação FastAPI com metadados do projeto
app = FastAPI(
    title="Tutor Socrático ENEM",
    version="0.1.0"
)

# Configuração do CORS (Cross-Origin Resource Sharing)
# Isso é obrigatório para que o seu Frontend consiga conversar com este Backend
# sem ser bloqueado pelo navegador por questões de segurança.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Em produção, trocaremos "*" pela URL real do seu frontend
    allow_credentials=True,
    allow_methods=["*"], # Permite todos os métodos (GET, POST, PUT, DELETE)
    allow_headers=["*"], # Permite todos os cabeçalhos
)

app.include_router(chat.router, prefix="/api/chat", tags=["Tutoria e Chat"])
app.include_router(alunos.router, prefix="/api/alunos", tags=["Gestão de Alunos"])
app.include_router(historico.router, prefix="/api/historico", tags=["Histórico de Chat"])
app.include_router(arquivos.router, prefix="/api/files", tags=["Arquivos de Conhecimento"])
app.include_router(auth.router, prefix="/api/auth", tags=["Autenticação"])

# Rota básica de verificação de saúde (Health Check)
@app.get("/")
def home():
    # Retorna um JSON simples para testarmos se o servidor está no ar
    return {"status": "API do Tutor Socrático está online e aguardando conexões!"}

# Futuramente, vamos importar e incluir as rotas de alunos e professores aqui
# Exemplo: app.include_router(chat_router, prefix="/api/chat")
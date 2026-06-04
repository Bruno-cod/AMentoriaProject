# models/models.py
import uuid
from sqlalchemy import Column, String, Text, Boolean, JSON, Integer
from core.database import Base

def generate_uuid():
    return str(uuid.uuid4())

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, default=generate_uuid)
    nome = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    senha_hash = Column(String, nullable=False)
    papel = Column(String, nullable=False)      
    disciplina = Column(String, nullable=True)   
    ativo = Column(Boolean, default=True)

class Aluno(Base):
    """
    Tabela auxiliar para o painel de gerenciamento de alunos dos professores
    """
    __tablename__ = "alunos"

    id = Column(String, primary_key=True, default=generate_uuid)
    nome = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    materia = Column(String, nullable=True)
    ultima_interacao = Column(String, nullable=True)
    visto = Column(Boolean, default=False)

class ChatHistorico(Base):
    """
    Guarda o cabeçalho/sessão do chat. 
    Uma linha nesta tabela representa um atendimento inteiro.
    """
    __tablename__ = "chat_historico"

    id = Column(String, primary_key=True) 
    aluno_email = Column(String, index=True)
    topic = Column(String, default="Dúvida de Matemática")
    date = Column(String) 
    is_finished = Column(Boolean, default=False)
    last_update = Column(String, nullable=True)
    messages = Column(JSON, nullable=True)

class MensagemChat(Base):
    __tablename__ = "mensagens_chat"

    id = Column(String, primary_key=True, default=generate_uuid)
    sessao_chat_id = Column(String, index=True) 
    aluno_id = Column(String, index=True)      
    remetente = Column(String)                  # 'aluno' ou 'ia'
    conteudo = Column(Text)                     
    timestamp = Column(String)
    rating = Column(String, nullable=True)
    feedback_text = Column(String, nullable=True)                  

class ArquivoConhecimento(Base):
    __tablename__ = "arquivos_conhecimento"

    id = Column(String, primary_key=True, default=generate_uuid)
    name = Column(String)
    size = Column(String, default="0 KB")
    upload_date = Column(String)

class UsageLimitDiario(Base):
   
    __tablename__ = "usage_limit_diario"
 
    id = Column(String, primary_key=True, default=generate_uuid)
    aluno_email = Column(String, unique=True, index=True, nullable=False)
    data = Column(String, nullable=False)          # Data atual (YYYY-MM-DD)
    total_interacoes = Column(Integer, default=0)  # Contador de interações do dia
 
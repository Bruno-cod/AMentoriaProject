# models/models.py
import uuid
from sqlalchemy import Column, String, Boolean, Text
from core.database import Base

def generate_uuid():
    return str(uuid.uuid4())

class ChatHistorico(Base):
    """
    Guarda o cabeçalho/sessão do chat. 
    Uma linha nesta tabela representa um atendimento inteiro.
    """
    __tablename__ = "chat_historico"

    id = Column(String, primary_key=True) # ID da sessão (UUID gerado pelo Next.js)
    aluno_email = Column(String, index=True)
    topic = Column(String, default="Dúvida de Matemática")
    date = Column(String) 
    is_finished = Column(Boolean, default=False)
    last_update = Column(String, nullable=True)

class MensagemChat(Base):
    """
    Nova Tabela! Cada linha representa uma única mensagem individualizada.
    Muitas mensagens pertencerão a um único ChatHistorico.
    """
    __tablename__ = "mensagens_chat"

    id = Column(String, primary_key=True, default=generate_uuid)
    sessao_chat_id = Column(String, index=True) # Vincula à sessão ChatHistorico(id)
    aluno_id = Column(String, index=True)       # Vincula ao User(id)
    remetente = Column(String)                  # "aluno" ou "ia"
    conteudo = Column(Text)                     # O texto digitado
    timestamp = Column(String)                  # Data/Hora exata da mensagem

class Aluno(Base):
    __tablename__ = "alunos"

    id = Column(String, primary_key=True, default=generate_uuid)
    name = Column(String)
    email = Column(String, unique=True, index=True)
    last_interaction = Column(String, nullable=True)
    visto = Column(Boolean, default=False)

class ArquivoConhecimento(Base):
    __tablename__ = "arquivos_conhecimento"

    id = Column(String, primary_key=True, default=generate_uuid)
    name = Column(String)
    size = Column(String, default="0 KB")
    upload_date = Column(String)

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, default=generate_uuid)
    nome = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    senha_hash = Column(String, nullable=False)
    papel = Column(String, nullable=False)      # Aqui vai salvar "aluno", "monitor", "professor"
    disciplina = Column(String, nullable=True)   # preenchido se for monitor/professor
    ativo = Column(Boolean, default=True)
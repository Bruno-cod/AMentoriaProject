# models/models.py
from sqlalchemy import Column, Integer, String, Text, Boolean, ForeignKey
from core.database import Base

class Usuario(Base):
    __tablename__ = "usuarios"

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    senha_hash = Column(String) # Nunca salvamos a senha em texto puro
    papel = Column(String) # Guardará se é 'aluno' ou 'professor'
    ativo = Column(Boolean, default=True)

class MensagemChat(Base):
    __tablename__ = "mensagens_chat"

    id = Column(Integer, primary_key=True, index=True)
    aluno_id = Column(Integer, ForeignKey("usuarios.id"))
    sessao_chat_id = Column(Integer, index=True) # Agrupa as 3 interações da mesma dúvida
    remetente = Column(String) # Guardará 'aluno' ou 'ia'
    conteudo = Column(Text) # O texto da pergunta ou da dica
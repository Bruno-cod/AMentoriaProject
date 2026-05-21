# models/models.py
from sqlalchemy import Column, Integer, String, Text, Boolean, ForeignKey
from core.database import Base

class Usuario(Base):
    __tablename__ = "usuarios"

<<<<<<< Updated upstream
    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    senha_hash = Column(String) # Nunca salvamos a senha em texto puro
    papel = Column(String) # Guardará se é 'aluno' ou 'professor'
    ativo = Column(Boolean, default=True)
=======
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
>>>>>>> Stashed changes

class MensagemChat(Base):
    __tablename__ = "mensagens_chat"

<<<<<<< Updated upstream
    id = Column(Integer, primary_key=True, index=True)
    aluno_id = Column(Integer, ForeignKey("usuarios.id"))
    sessao_chat_id = Column(Integer, index=True) # Agrupa as 3 interações da mesma dúvida
    remetente = Column(String) # Guardará 'aluno' ou 'ia'
    conteudo = Column(Text) # O texto da pergunta ou da dica
=======
    id = Column(String, primary_key=True, default=generate_uuid)
    sessao_chat_id = Column(String, index=True) 
    aluno_id = Column(String, index=True)      
    remetente = Column(String)                  
    conteudo = Column(Text)                     
    timestamp = Column(String)
    rating = Column(String, nullable=True)
    feedback_text = Column(String, nullable=True)                  

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
    papel = Column(String, nullable=False)      
    disciplina = Column(String, nullable=True)   
    ativo = Column(Boolean, default=True)
>>>>>>> Stashed changes

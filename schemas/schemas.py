# schemas.py
from pydantic import BaseModel
from typing import Optional

# -------------------------------------------------------------------
# SCHEMAS DE AUTENTICAÇÃO
# -------------------------------------------------------------------

class UserCreate(BaseModel):
    name: str
    email: str
    password: str
    role: str  # "aluno" ou "professor"
    subject: Optional[str] = None

class UserLogin(BaseModel):
    email: str
    password: str

class UserResponse(BaseModel):
    id: str
    name: str
    email: str
    role: str
    subject: Optional[str] = None

    class Config:
        from_attributes = True

# -------------------------------------------------------------------
# SCHEMAS DE GESTÃO DE ALUNOS (Painel do Professor)
# -------------------------------------------------------------------

class AlunoCreateRequest(BaseModel):
    name: str
    email: str

class AlunoStatusUpdateRequest(BaseModel):
    email: str
    visto: bool

class AlunoResponse(BaseModel):
    id: str
    name: str
    email: str
    lastInteraction: Optional[str] = ""
    visto: bool

    class Config:
        from_attributes = True

# -------------------------------------------------------------------
# SCHEMAS DE ENTRADA (O que o Frontend envia para o Backend)
# -------------------------------------------------------------------

class DuvidaAlunoRequest(BaseModel):
    """
    Representa a estrutura de dados que o frontend envia quando o aluno faz uma pergunta.
    """
    aluno_id: str
    sessao_chat_id: str # Usado para puxarmos o contexto das últimas perguntas do banco
    
    # Opcionais porque o aluno pode mandar só texto, ou só a foto da questão
    texto_duvida: Optional[str] = None
    imagem_base64: Optional[str] = None # A foto da questão convertida em texto (Base64)

# -------------------------------------------------------------------
# SCHEMAS DE SAÍDA (O que o Backend devolve para o Frontend)
# -------------------------------------------------------------------

class RespostaTutorResponse(BaseModel):
    """
    Representa a resposta da IA que será exibida na tela do aluno.
    """
    mensagem_ia: str
    numero_interacao: int # Controla se estamos na dica 1, 2 ou 3 (o seu limite)
    
    # Flags para o frontend saber como mudar a interface
    limite_atingido: bool # Se True, o frontend avisa que as dicas acabaram e vai dar a resolução
    exibir_questao_fixacao: bool # Se True, significa que a dúvida foi resolvida e a IA gerou a questão final
from pydantic import BaseModel, Field
from typing import List, Optional, Any

# ===================================================================
# 1. SCHEMAS DE CHAT ORIGINAIS (O que você já tinha)
# ===================================================================

class DuvidaAlunoRequest(BaseModel):
    """
    Representa a estrutura de dados que o frontend envia quando o aluno faz uma pergunta.
    Mapeado para aceitar o camelCase do Next.js automaticamente.
    """
    aluno_id: str = Field(alias="alunoId")
    
    # NOTA: Se o seu frontend enviar como 'chatId', mude o alias abaixo para "chatId"
    sessao_chat_id: str = Field(alias="chatId") 
    
    texto_duvida: Optional[str] = Field(default=None, alias="textoDuvida")
    imagem_base64: Optional[str] = Field(default=None, alias="imagemBase64")

    class Config:
        populate_by_name = True # Permite que o Python use tanto o nome original quanto o alias

class RespostaTutorResponse(BaseModel):
    """
    Representa a resposta da IA que será exibida na tela do aluno.
    """
    mensagem_ia: str
    numero_interacao: int # Controla se estamos na dica 1, 2 ou 3 (o seu limite)
    
    # Flags para o frontend saber como mudar a interface
    limite_atingido: bool # Se True, o frontend avisa que as dicas acabaram e vai dar a resolução
    exibir_questao_fixacao: bool # Se True, significa que a dúvida foi resolvida e a IA gerou a questão final


# ===================================================================
# 2. SCHEMAS DE AUTENTICAÇÃO (Usados em auth.py)
# ===================================================================

class UserCreate(BaseModel):
    name: str
    email: str
    password: str
    role: str
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


# ===================================================================
# 3. SCHEMAS DE ALUNOS (Usados em alunos.py)
# ===================================================================

class AlunoCreate(BaseModel):
    name: str
    email: str


class AlunoUpdate(BaseModel):
    email: str
    lastInteraction: Optional[str] = None
    visto: Optional[bool] = None


class AlunoResponse(BaseModel):
    id: str
    name: str
    email: str
    lastInteraction: Optional[str] = None
    visto: bool


# ===================================================================
# 4. SCHEMAS DE HISTÓRICO (Usados em historico.py)
# ===================================================================

class HistoricoCreateUpdate(BaseModel):
    chatId: str
    alunoEmail: str
    topic: str
    messages: List[Any]
    isFinished: bool = False


class HistoricoResponse(BaseModel):
    id: str
    alunoEmail: str
    topic: str
    date: str
    messages: List[Any]
    isFinished: bool


# ===================================================================
# 5. SCHEMAS DE ARQUIVOS (Usados em files.py)
# ===================================================================

class FileCreate(BaseModel):
    name: str


class FileResponse(BaseModel):
    id: str
    name: str
    size: str
    uploadDate: str
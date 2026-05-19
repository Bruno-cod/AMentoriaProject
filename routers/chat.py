from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
from core.database import get_db
from services import crud

# ATENÇÃO: Importe o seu serviço de IA. 
# Confirme se o caminho 'services.ai_service' bate com a sua estrutura de pastas!
from services.gemini_service import GeminiService

router = APIRouter()

# O modelo agora espera 'textoDuvida' igual o frontend manda
class ChatMessage(BaseModel):
    alunoId: str
    chatId: str
    textoDuvida: str

@router.post("/enviar")
def enviar_duvida(mensagem: ChatMessage, db: Session = Depends(get_db)):
    
    # 1. Salva a mensagem do ALUNO no banco de dados (repare no mensagem.textoDuvida)
    crud.salvar_mensagem(
        db=db,
        aluno_id=mensagem.alunoId,
        sessao_chat_id=mensagem.chatId,
        remetente="aluno",
        conteudo=mensagem.textoDuvida 
    )

    # 2. Busca todo o histórico do banco para a IA ter contexto da conversa
    historico_db = crud.buscar_historico_sessao(db, mensagem.chatId)
    historico_formatado = [{"remetente": msg.remetente, "conteudo": msg.conteudo} for msg in historico_db]

    # 3. Instancia o serviço de IA e gera a resposta real
    ai_service = GeminiService()
    resposta_ia = ai_service.gerar_resposta(
        pergunta_aluno=mensagem.textoDuvida, # <- Aqui também usamos textoDuvida
        historico=historico_formatado
    )

    # 4. Salva a resposta da IA no banco de dados
    crud.salvar_mensagem(
        db=db,
        aluno_id=mensagem.alunoId,
        sessao_chat_id=mensagem.chatId,
        remetente="ia",
        conteudo=resposta_ia
    )

    # 5. Devolve a resposta gerada para o frontend
    return {"resposta": resposta_ia}
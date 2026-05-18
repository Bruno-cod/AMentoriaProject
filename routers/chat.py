# routers/chat.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from schemas.schemas import DuvidaAlunoRequest, RespostaTutorResponse
from core.database import get_db
from services import crud
from services.gemini_service import GeminiService

router = APIRouter()
_gemini: GeminiService | None = None


def get_gemini() -> GeminiService:
    global _gemini
    if _gemini is None:
        _gemini = GeminiService()
    return _gemini


@router.post("/enviar", response_model=RespostaTutorResponse)
def enviar_duvida(requisicao: DuvidaAlunoRequest, db: Session = Depends(get_db)):
    if requisicao.texto_duvida:
        crud.salvar_mensagem(
            db=db,
            aluno_id=requisicao.aluno_id,
            sessao_chat_id=requisicao.sessao_chat_id,
            remetente="aluno",
            conteudo=requisicao.texto_duvida,
        )

    mensagens_anteriores = crud.buscar_historico_sessao(db=db, sessao_chat_id=requisicao.sessao_chat_id)
    historico = [{"remetente": m.remetente, "conteudo": m.conteudo} for m in mensagens_anteriores]

    texto_resposta_ia = get_gemini().gerar_resposta(
        pergunta_aluno=requisicao.texto_duvida or "",
        historico=historico,
    )

    crud.salvar_mensagem(
        db=db,
        aluno_id=requisicao.aluno_id,
        sessao_chat_id=requisicao.sessao_chat_id,
        remetente="ia",
        conteudo=texto_resposta_ia,
    )

    total_interacoes = len([m for m in mensagens_anteriores if m.remetente == "aluno"]) + 1
    limite_atingido = total_interacoes >= 3

    return RespostaTutorResponse(
        mensagem_ia=texto_resposta_ia,
        numero_interacao=total_interacoes,
        limite_atingido=limite_atingido,
        exibir_questao_fixacao=limite_atingido,
    )


@router.get("/historico/{sessao_chat_id}")
def ver_historico(sessao_chat_id: int, db: Session = Depends(get_db)):
    return crud.buscar_historico_sessao(db=db, sessao_chat_id=sessao_chat_id)

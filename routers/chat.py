# routers/chat.py
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.orm import Session
from sqlalchemy import desc
from typing import Optional, List, Dict, Any
from datetime import datetime
from sqlalchemy.exc import IntegrityError
from schemas.schemas import RespostaTutorResponse
from core.database import get_db
from models.models import ChatHistorico, Aluno, User
from services import crud
from services.gemini_service import GeminiService
from starlette.concurrency import run_in_threadpool

from routers.auth import get_current_user

router = APIRouter()


class ChatMessage(BaseModel):
    aluno_id: str
    sessao_chat_id: str
    texto_duvida: str
    imagem_base64: Optional[str] = None


class SyncHistoryRequest(BaseModel):
    chatId: str
    alunoEmail: str
    topic: str
    messages: List[Dict[str, Any]]
    isFinished: bool


@router.post("/enviar")
async def enviar_duvida(mensagem: ChatMessage, db: Session = Depends(get_db)):

    
    user = db.query(User).filter(User.id == mensagem.aluno_id).first()
    aluno_email = user.email if user else None

    if aluno_email:
        permitido, _ = crud.verificar_e_incrementar_limite(db, aluno_email)

        if not permitido:
            mensagem_limite = (
                "⏳ **Você atingiu o limite de interações de hoje!**\n\n"
                "Não se preocupe — seu limite reinicia automaticamente à meia-noite. "
                "Aproveite para revisar o que estudamos hoje e volte amanhã com mais dúvidas! 💪\n\n"
                "> 💡 **Dica:** Use esse tempo para praticar com as questões que já vimos juntos!"
            )
            return RespostaTutorResponse(
                mensagem_ia=mensagem_limite,
                numero_interacao=crud.LIMITE_INTERACOES_DIARIAS,
                limite_atingido=True,
                exibir_questao_fixacao=False,
            )

    crud.salvar_mensagem(
        db=db,
        aluno_id=mensagem.aluno_id,
        sessao_chat_id=mensagem.sessao_chat_id,
        remetente="aluno",
        conteudo=mensagem.texto_duvida
    )

    historico_db = crud.buscar_historico_sessao(db, mensagem.sessao_chat_id)
    historico_formatado = [
        {"remetente": msg.remetente, "conteudo": msg.conteudo}
        for msg in historico_db
    ]

    ai_service = GeminiService()
    texto_resposta_ia = await run_in_threadpool(
        ai_service.gerar_resposta,
        pergunta_aluno=mensagem.texto_duvida,
        historico=historico_formatado,
        imagem_base64=mensagem.imagem_base64
    )

    crud.salvar_mensagem(
        db=db,
        aluno_id=mensagem.aluno_id,
        sessao_chat_id=mensagem.sessao_chat_id,
        remetente="ia",
        conteudo=texto_resposta_ia,
    )

    agora = datetime.now().isoformat()

    sessao_pai = db.query(ChatHistorico).filter(
        ChatHistorico.id == mensagem.sessao_chat_id
    ).first()
    if sessao_pai:
        sessao_pai.last_update = agora

    aluno_db = db.query(Aluno).filter(Aluno.id == mensagem.aluno_id).first()
    if not aluno_db and sessao_pai:
        aluno_db = db.query(Aluno).filter(
            Aluno.email == sessao_pai.aluno_email
        ).first()

    if aluno_db:
        aluno_db.ultima_interacao = agora
        aluno_db.visto = False

    db.commit()

    total_interacoes = len([m for m in historico_db if m.remetente == "aluno"])
    limite_atingido = total_interacoes >= 3

    return RespostaTutorResponse(
        mensagem_ia=texto_resposta_ia,
        numero_interacao=total_interacoes,
        limite_atingido=limite_atingido,
        exibir_questao_fixacao=limite_atingido,
    )


@router.post("/historico")
def sincronizar_historico(dados: SyncHistoryRequest, db: Session = Depends(get_db)):
    sessao = db.query(ChatHistorico).filter(ChatHistorico.id == dados.chatId).first()

    agora = datetime.now().isoformat()
    if not sessao:
        sessao = ChatHistorico(
            id=dados.chatId,
            aluno_email=dados.alunoEmail,
            topic=dados.topic,
            date=agora,
            is_finished=dados.isFinished,
            last_update=agora,
            messages=dados.messages
        )
        db.add(sessao)
    else:
        sessao.is_finished = dados.isFinished
        sessao.messages = dados.messages
        sessao.last_update = agora

    aluno_db = db.query(Aluno).filter(Aluno.email == dados.alunoEmail).first()
    if aluno_db:
        aluno_db.ultima_interacao = agora
        aluno_db.visto = False

    try:
        db.commit()
    except IntegrityError:
        db.rollback()

        sessao_existente = db.query(ChatHistorico).filter(
            ChatHistorico.id == dados.chatId
        ).first()
        if sessao_existente:
            sessao_existente.is_finished = dados.isFinished
            sessao_existente.messages = dados.messages
            sessao_existente.last_update = agora

        aluno_db = db.query(Aluno).filter(Aluno.email == dados.alunoEmail).first()
        if aluno_db:
            aluno_db.ultima_interacao = agora
            aluno_db.visto = False

        db.commit()

    return {"status": "Histórico sincronizado e status do aluno atualizado!"}


@router.get("/historico")
def listar_historico_geral(
    email: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    query = db.query(ChatHistorico)

    if current_user.papel in ["professor"]:
        if email:
            query = query.filter(ChatHistorico.aluno_email == email)
    else:
        query = query.filter(ChatHistorico.aluno_email == current_user.email)

    historicos = query.order_by(desc(ChatHistorico.last_update)).all()

    resultado_formatado = []
    for h in historicos:
        resultado_formatado.append({
            "id": h.id,
            "alunoEmail": h.aluno_email,
            "topic": h.topic,
            "date": h.date,
            "isFinished": h.is_finished,
            "last_update": h.last_update,
            "messages": getattr(h, 'messages', []) or []
        })

    return resultado_formatado


@router.get("/historico/{sessao_chat_id}")
def ver_historico_mensagens(
    sessao_chat_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    sessao = db.query(ChatHistorico).filter(
        ChatHistorico.id == sessao_chat_id
    ).first()

    if not sessao:
        raise HTTPException(status_code=404, detail="Sessão de chat não encontrada.")

    if current_user.papel not in ["professor", "monitor"] and sessao.aluno_email != current_user.email:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Acesso negado: Você não tem permissão para visualizar este chat."
        )

    return crud.buscar_historico_sessao(db=db, sessao_chat_id=sessao_chat_id)


@router.get("/usage")
def consultar_usage(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
   
    return crud.consultar_usage(db, current_user.email)
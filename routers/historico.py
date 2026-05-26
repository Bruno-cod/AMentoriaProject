import json
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from core.database import get_db
from models.models import ChatHistorico, MensagemChat, Aluno, User
from schemas.schemas import HistoricoCreateUpdate

from routers.auth import get_current_user

router = APIRouter()

@router.get("/")
def listar_historicos(
    email: str = None, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    query = db.query(ChatHistorico)
    
    if current_user.papel in ["professor"]:
        if email:
            query = query.filter(ChatHistorico.aluno_email == email)
    else:
        query = query.filter(ChatHistorico.aluno_email == current_user.email)
    
    historicos = query.order_by(ChatHistorico.date.desc()).all()
    resultado = []
    
    for h in historicos:
        mensagens_db = db.query(MensagemChat).filter(MensagemChat.sessao_chat_id == h.id).all()
        
        messages_formatadas = [
            {
                "role": m.remetente,
                "content": m.conteudo,
                "timestamp": m.timestamp,
                "rating": m.rating,              
                "feedbackText": m.feedback_text
            }
            for m in mensagens_db
        ]
        
        resultado.append({
            "id": h.id,
            "alunoEmail": h.aluno_email,
            "topic": h.topic,
            "date": h.date,
            "messages": messages_formatadas,
            "isFinished": h.is_finished
        })
        
    return resultado

@router.post("/")
def upsert_historico(
    hist: HistoricoCreateUpdate, 
    db: Session = Depends(get_db),
    # 👤 Obtém o usuário logado para garantir a posse do dado
    current_user: User = Depends(get_current_user)
):
    # 🔒 BLINDAGEM: Se for um aluno salvando/sincronizando o histórico, 
    # forçamos o e-mail dele para evitar que ele manipule o JSON e salve dados no nome de outro aluno.
    if current_user.papel not in ["professor"]:
        hist.alunoEmail = current_user.email

    db_hist = db.query(ChatHistorico).filter(ChatHistorico.id == hist.chatId).first()
    agora = datetime.utcnow().isoformat()

    if db_hist:
        # Se a sessão já existe mas pertence a outro aluno (segurança extra contra brute force de ID)
        if current_user.papel not in ["professor"] and db_hist.aluno_email != current_user.email:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Acesso negado: Você não tem permissão para alterar este histórico."
            )
        
        db_hist.is_finished = hist.isFinished
        db_hist.last_update = agora
        db_hist.topic = hist.topic
    else:
        db_hist = ChatHistorico(
            id=hist.chatId,
            aluno_email=hist.alunoEmail,
            topic=hist.topic,
            date=agora,
            is_finished=hist.isFinished,
            last_update=agora
        )
        db.add(db_hist)


    db.query(MensagemChat).filter(MensagemChat.sessao_chat_id == hist.chatId).delete()

    for msg in hist.messages:
        msg_dict = msg if isinstance(msg, dict) else msg.dict()
        
        nova_msg = MensagemChat(
            sessao_chat_id=hist.chatId,
            remetente=msg_dict.get("role", "aluno"),
            conteudo=msg_dict.get("content", ""),
            timestamp=msg_dict.get("timestamp", agora),
            rating=msg_dict.get("rating"),        
            feedback_text=msg_dict.get("feedbackText")
        )
        db.add(nova_msg)
    
    aluno_db = db.query(Aluno).filter(Aluno.email == hist.alunoEmail).first()
    if aluno_db:
        aluno_db.visto = False 
        aluno_db.ultima_interacao = agora

    db.commit()
    return {"message": "Histórico sincronizado com sucesso!"}
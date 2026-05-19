import json
from datetime import datetime
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from core.database import get_db
from models.models import ChatHistorico
from schemas.schemas import HistoricoCreateUpdate

router = APIRouter()

@router.get("/")
def listar_historicos(email: str = None, db: Session = Depends(get_db)):
    query = db.query(ChatHistorico)
    if email:
        query = query.filter(ChatHistorico.aluno_email == email)
    
    historicos = query.order_by(ChatHistorico.date.desc()).all()
    
    return [
        {
            "id": h.id,
            "alunoEmail": h.aluno_email,
            "topic": h.topic,
            "date": h.date,
            "messages": json.loads(h.messages) if h.messages else [],
            "isFinished": h.is_finished
        } for h in historicos
    ]

@router.post("/")
def upsert_historico(hist: HistoricoCreateUpdate, db: Session = Depends(get_db)):
    db_hist = db.query(ChatHistorico).filter(ChatHistorico.id == hist.chatId).first()
    
    agora = datetime.utcnow().isoformat()
    messages_json = json.dumps(hist.messages)

    if db_hist:
        db_hist.messages = messages_json
        db_hist.is_finished = hist.isFinished
        db_hist.last_update = agora
        db.commit()
        return {"message": "Histórico atualizado com sucesso!"}
    else:
        novo_hist = ChatHistorico(
            id=hist.chatId,
            aluno_email=hist.alunoEmail,
            topic=hist.topic,
            date=agora,
            messages=messages_json,
            is_finished=hist.isFinished
        )
        db.add(novo_hist)
        db.commit()
        return {"message": "Histórico criado com sucesso!"}
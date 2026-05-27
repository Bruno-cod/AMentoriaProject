from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from models import models
from datetime import datetime

def salvar_mensagem(db: Session, aluno_id: str, sessao_chat_id: str, remetente: str, conteudo: str, rating: str = None, feedback_text: str = None):
    
    agora = datetime.now().isoformat()
    
    chat_sessao = db.query(models.ChatHistorico).filter(models.ChatHistorico.id == sessao_chat_id).first()
    
    if not chat_sessao:
        user = db.query(models.User).filter(models.User.id == aluno_id).first()
        aluno_email = user.email if user else "email_desconhecido"

        chat_sessao = models.ChatHistorico(
            id=sessao_chat_id,
            aluno_email=aluno_email,
            topic="Dúvida do Aluno",
            date=agora,
            is_finished=False,
            last_update=agora
        )
        
        chat_sessao = db.merge(chat_sessao)
    else:
        chat_sessao.last_update = agora

    nova_mensagem = models.MensagemChat(
        aluno_id=aluno_id,
        sessao_chat_id=sessao_chat_id,
        remetente=remetente,
        conteudo=conteudo,
        timestamp=agora,
        rating=rating,              
        feedback_text=feedback_text
    )
    db.add(nova_mensagem) 

    try:
        db.commit() 
    except IntegrityError:
        db.rollback()
        chat_sessao = db.query(models.ChatHistorico).filter(models.ChatHistorico.id == sessao_chat_id).first()
        if chat_sessao:
            chat_sessao.last_update = agora
        db.add(nova_mensagem)
        db.commit()

    db.refresh(nova_mensagem) 
    return nova_mensagem


def buscar_historico_sessao(db: Session, sessao_chat_id: str):
    return db.query(models.MensagemChat)\
             .filter(models.MensagemChat.sessao_chat_id == sessao_chat_id)\
             .order_by(models.MensagemChat.id.asc())\
             .all()
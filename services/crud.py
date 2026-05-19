from sqlalchemy.orm import Session
from models import models
from datetime import datetime

def salvar_mensagem(db: Session, aluno_id: str, sessao_chat_id: str, remetente: str, conteudo: str):
    """
    Garante que o cabeçalho do chat existe e insere uma nova linha 
    na tabela isolada de mensagens.
    """
    agora = datetime.now().isoformat()
    
    # 1. Verifica se a sessão do chat já existe no histórico, se não, cria o cabeçalho
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
        db.add(chat_sessao)
    else:
        # Se já existe, atualiza apenas o timestamp da última interação
        chat_sessao.last_update = agora

    # 2. Salva a mensagem individual na tabela correta
    nova_mensagem = models.MensagemChat(
        sessao_chat_id=sessao_chat_id,
        aluno_id=aluno_id,
        remetente=remetente,
        conteudo=conteudo,
        timestamp=agora
    )
    db.add(nova_mensagem)
    db.commit()
    db.refresh(nova_mensagem)
    return nova_mensagem


def buscar_historico_sessao(db: Session, sessao_chat_id: str):
    """
    Busca todas as mensagens individuais daquela sessão ordenadas por tempo.
    """
    return db.query(models.MensagemChat)\
             .filter(models.MensagemChat.sessao_chat_id == sessao_chat_id)\
             .order_by(models.MensagemChat.timestamp.asc())\
             .all()
# services/crud.py
from sqlalchemy.orm import Session
from models import models

<<<<<<< Updated upstream
def salvar_mensagem(db: Session, aluno_id: int, sessao_chat_id: int, remetente: str, conteudo: str):
    """
    Salva uma nova mensagem (do aluno ou da IA) no banco de dados.
    """
=======
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
        db.add(chat_sessao)
    else:
        chat_sessao.last_update = agora

>>>>>>> Stashed changes
    nova_mensagem = models.MensagemChat(
        aluno_id=aluno_id,
        sessao_chat_id=sessao_chat_id,
        remetente=remetente,
<<<<<<< Updated upstream
        conteudo=conteudo
=======
        conteudo=conteudo,
        timestamp=agora,
        rating=rating,              
        feedback_text=feedback_text
>>>>>>> Stashed changes
    )
    db.add(nova_mensagem) # Prepara para salvar
    db.commit()           # Confirma o salvamento
    db.refresh(nova_mensagem) # Atualiza a variável com o ID gerado pelo banco
    return nova_mensagem

<<<<<<< Updated upstream
def buscar_historico_sessao(db: Session, sessao_chat_id: int):
    """
    Busca as mensagens anteriores de uma sessão específica para dar contexto à IA.
    """
=======

def buscar_historico_sessao(db: Session, sessao_chat_id: str):
   
>>>>>>> Stashed changes
    return db.query(models.MensagemChat)\
             .filter(models.MensagemChat.sessao_chat_id == sessao_chat_id)\
             .order_by(models.MensagemChat.id.asc())\
             .all()
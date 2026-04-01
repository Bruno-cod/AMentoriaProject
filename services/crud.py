# services/crud.py
from sqlalchemy.orm import Session
from models import models

def salvar_mensagem(db: Session, aluno_id: int, sessao_chat_id: int, remetente: str, conteudo: str):
    """
    Salva uma nova mensagem (do aluno ou da IA) no banco de dados.
    """
    nova_mensagem = models.MensagemChat(
        aluno_id=aluno_id,
        sessao_chat_id=sessao_chat_id,
        remetente=remetente,
        conteudo=conteudo
    )
    db.add(nova_mensagem) # Prepara para salvar
    db.commit()           # Confirma o salvamento
    db.refresh(nova_mensagem) # Atualiza a variável com o ID gerado pelo banco
    return nova_mensagem

def buscar_historico_sessao(db: Session, sessao_chat_id: int):
    """
    Busca as mensagens anteriores de uma sessão específica para dar contexto à IA.
    """
    return db.query(models.MensagemChat)\
             .filter(models.MensagemChat.sessao_chat_id == sessao_chat_id)\
             .order_by(models.MensagemChat.id.asc())\
             .all()
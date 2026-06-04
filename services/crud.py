# services/crud.py
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from models import models
from datetime import datetime, date

# ─────────────────────────────────────────────
# Mensagens de Chat
# ─────────────────────────────────────────────

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


# ─────────────────────────────────────────────
# RNF03 - Rate Limiting diário
# ─────────────────────────────────────────────

LIMITE_INTERACOES_DIARIAS = 50


def buscar_ou_criar_usage(db: Session, aluno_email: str) -> models.UsageLimitDiario:
    """
    Busca o registro de uso do aluno para hoje.
    Se não existir ou for de outro dia, cria/reseta automaticamente.
    """
    hoje = str(date.today())
    usage = db.query(models.UsageLimitDiario).filter(
        models.UsageLimitDiario.aluno_email == aluno_email
    ).first()

    if not usage:
        usage = models.UsageLimitDiario(
            aluno_email=aluno_email,
            data=hoje,
            total_interacoes=0
        )
        db.add(usage)
        db.commit()
        db.refresh(usage)
    elif usage.data != hoje:
        # Novo dia — reseta o contador
        usage.data = hoje
        usage.total_interacoes = 0
        db.commit()
        db.refresh(usage)

    return usage


def verificar_e_incrementar_limite(db: Session, aluno_email: str) -> tuple[bool, int]:
    """
    Verifica se o aluno ainda tem interações disponíveis.
    Retorna (True, restantes) se permitido, (False, 0) se bloqueado.
    """
    usage = buscar_ou_criar_usage(db, aluno_email)

    if usage.total_interacoes >= LIMITE_INTERACOES_DIARIAS:
        return False, 0

    usage.total_interacoes += 1
    db.commit()

    restantes = LIMITE_INTERACOES_DIARIAS - usage.total_interacoes
    return True, restantes


def consultar_usage(db: Session, aluno_email: str) -> dict:
    """
    Retorna o status de uso do dia do aluno.
    """
    usage = buscar_ou_criar_usage(db, aluno_email)
    restantes = max(0, LIMITE_INTERACOES_DIARIAS - usage.total_interacoes)

    return {
        "total_hoje": usage.total_interacoes,
        "limite_diario": LIMITE_INTERACOES_DIARIAS,
        "restantes": restantes,
        "limite_atingido": usage.total_interacoes >= LIMITE_INTERACOES_DIARIAS,
        "reinicia_em": "meia-noite"
    }
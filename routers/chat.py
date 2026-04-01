# routers/chat.py
from fastapi import APIRouter, Depends
from schemas.schemas import DuvidaAlunoRequest, RespostaTutorResponse 
from sqlalchemy.orm import Session
from core.database import get_db
from services import crud

router = APIRouter()

@router.post("/enviar", response_model=RespostaTutorResponse)
def enviar_duvida(requisicao: DuvidaAlunoRequest, db: Session = Depends(get_db)):
    
    # 1. Salva a pergunta do aluno no banco de dados
    if requisicao.texto_duvida:
        crud.salvar_mensagem(
            db=db,
            aluno_id=requisicao.aluno_id,
            sessao_chat_id=requisicao.sessao_chat_id,
            remetente="aluno",
            conteudo=requisicao.texto_duvida
        )

    # (FUTURO) Aqui nós buscaremos o histórico e chamaremos a API do Gemini
    
    # Resposta falsa (Mock) temporária
    texto_resposta_ia = "[MOCK] Olá! Que excelente dúvida. Antes de dar a resposta, o que você acha que acontece com a fórmula de Bhaskara nesta situação?"
    
    # 2. Salva a resposta da IA no banco de dados
    crud.salvar_mensagem(
        db=db,
        aluno_id=requisicao.aluno_id,
        sessao_chat_id=requisicao.sessao_chat_id,
        remetente="ia",
        conteudo=texto_resposta_ia
    )
    
    # 3. Devolve a resposta para o frontend
    return RespostaTutorResponse(
        mensagem_ia=texto_resposta_ia,
        numero_interacao=1,
        limite_atingido=False,
        exibir_questao_fixacao=False
    )

@router.get("/historico/{sessao_chat_id}")
def ver_historico(sessao_chat_id: int, db: Session = Depends(get_db)):
    """
    Rota temporária para testarmos se as mensagens estão sendo salvas no banco.
    """
    # Usamos a função que criamos no crud.py para buscar as mensagens
    mensagens = crud.buscar_historico_sessao(db=db, sessao_chat_id=sessao_chat_id)
    return mensagens
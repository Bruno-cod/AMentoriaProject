# routers/alunos.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from core.database import get_db
from models.models import Aluno
from schemas.schemas import AlunoCreateRequest, AlunoStatusUpdateRequest, AlunoResponse

router = APIRouter()

@router.post("", response_model=AlunoResponse)
def criar_aluno(dados: AlunoCreateRequest, db: Session = Depends(get_db)):
    aluno_existente = db.query(Aluno).filter(Aluno.email == dados.email).first()
    
    if not aluno_existente:
        novo_aluno = Aluno(
            nome=dados.name,
            email=dados.email,
            visto=False,
            ultima_interacao=""
        )
        db.add(novo_aluno)
        db.commit()
        db.refresh(novo_aluno)
        aluno_existente = novo_aluno

    return AlunoResponse(
        id=str(aluno_existente.id),
        name=aluno_existente.nome,
        email=aluno_existente.email,
        lastInteraction=aluno_existente.ultima_interacao or "",
        visto=aluno_existente.visto or False
    )

@router.patch("")
def atualizar_status_aluno(dados: AlunoStatusUpdateRequest, db: Session = Depends(get_db)):
    aluno = db.query(Aluno).filter(Aluno.email == dados.email).first()
    
    if not aluno:
        raise HTTPException(status_code=404, detail="Aluno não encontrado.")
        
    aluno.visto = dados.visto
    db.commit()
    
    return {"status": "Status atualizado com sucesso!", "visto": aluno.visto}

@router.get("", response_model=List[AlunoResponse])
def listar_todos_alunos(db: Session = Depends(get_db)):
    alunos_db = db.query(Aluno).all()
    

    return [
        AlunoResponse(
            id=str(aluno.id),
            name=aluno.nome, 
            email=aluno.email,
            lastInteraction=aluno.ultima_interacao or "",
            visto=aluno.visto or False
        ) for aluno in alunos_db
    ]
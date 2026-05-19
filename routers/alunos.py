from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from core.database import get_db
from models.models import Aluno
from schemas.schemas import AlunoCreate, AlunoUpdate, AlunoResponse

router = APIRouter()

@router.get("/", response_model=list[AlunoResponse])
def listar_alunos(db: Session = Depends(get_db)):
    alunos = db.query(Aluno).all()
    # Mapeia para o schema do front (camelCase)
    return [{"id": a.id, "name": a.name, "email": a.email, "lastInteraction": a.last_interaction, "visto": a.visto} for a in alunos]

@router.post("/", response_model=AlunoResponse, status_code=201)
def criar_aluno(aluno: AlunoCreate, db: Session = Depends(get_db)):
    novo_aluno = Aluno(name=aluno.name, email=aluno.email)
    db.add(novo_aluno)
    db.commit()
    db.refresh(novo_aluno)
    return {"id": novo_aluno.id, "name": novo_aluno.name, "email": novo_aluno.email, "lastInteraction": novo_aluno.last_interaction, "visto": novo_aluno.visto}

@router.delete("/")
def deletar_aluno(id: str, db: Session = Depends(get_db)):
    aluno = db.query(Aluno).filter(Aluno.id == id).first()
    if not aluno:
        raise HTTPException(status_code=404, detail="Aluno não encontrado")
    db.delete(aluno)
    db.commit()
    return {"message": "Aluno excluído com sucesso"}

@router.patch("/")
def atualizar_aluno(aluno: AlunoUpdate, db: Session = Depends(get_db)):
    db_aluno = db.query(Aluno).filter(Aluno.email == aluno.email).first()
    
    if not db_aluno:
        # Cria se não existir (Upsert)
        db_aluno = Aluno(name="Aluno " + aluno.email.split("@")[0], email=aluno.email)
        db.add(db_aluno)

    if aluno.lastInteraction is not None:
        db_aluno.last_interaction = aluno.lastInteraction
    if aluno.visto is not None:
        db_aluno.visto = aluno.visto

    db.commit()
    db.refresh(db_aluno)
    return {"message": "Aluno atualizado", "aluno": {"id": db_aluno.id, "name": db_aluno.name, "email": db_aluno.email, "lastInteraction": db_aluno.last_interaction, "visto": db_aluno.visto}}
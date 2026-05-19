from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from core.database import get_db
from models.models import ArquivoConhecimento
from schemas.schemas import FileCreate, FileResponse

router = APIRouter()

@router.get("/", response_model=list[FileResponse])
def listar_arquivos(db: Session = Depends(get_db)):
    arquivos = db.query(ArquivoConhecimento).all()
    return [{"id": a.id, "name": a.name, "size": a.size, "uploadDate": a.upload_date} for a in arquivos]

@router.post("/", response_model=FileResponse)
def criar_arquivo(file: FileCreate, db: Session = Depends(get_db)):
    novo_arquivo = ArquivoConhecimento(
        name=file.name, 
        upload_date=datetime.now().strftime("%d/%m/%Y")
    )
    db.add(novo_arquivo)
    db.commit()
    db.refresh(novo_arquivo)
    return {"id": novo_arquivo.id, "name": novo_arquivo.name, "size": novo_arquivo.size, "uploadDate": novo_arquivo.upload_date}

@router.delete("/")
def deletar_arquivo(id: str, db: Session = Depends(get_db)):
    arquivo = db.query(ArquivoConhecimento).filter(ArquivoConhecimento.id == id).first()
    if not arquivo:
        raise HTTPException(status_code=404, detail="Arquivo não encontrado")
    db.delete(arquivo)
    db.commit()
    return {"message": "Excluído com sucesso"}
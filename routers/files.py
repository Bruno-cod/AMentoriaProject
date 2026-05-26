from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel
import datetime

from core.database import get_db
from models.models import ArquivoConhecimento, User


from routers.auth import get_current_user

router = APIRouter()

class FileRenameRequest(BaseModel):
    name: str

class FileUploadRequest(BaseModel):
    name: str


@router.get("")
def listar_arquivos(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    arquivos = db.query(ArquivoConhecimento).all()
    return [
        {
            "id": a.id, 
            "name": a.name, 
            "size": a.size, 
            "uploadDate": a.upload_date
        } for a in arquivos
    ]


@router.post("")
def upload_arquivo(
    dados: FileUploadRequest, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if current_user.papel not in ["professor", "monitor"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Acesso negado: Apenas professores ou monitores podem enviar arquivos."
        )

    novo_arquivo = ArquivoConhecimento(
        name=dados.name,
        size="1 MB", 
        upload_date=datetime.datetime.utcnow().isoformat()
    )
    db.add(novo_arquivo)
    db.commit()
    return {"status": "Upload concluído"}


@router.patch("/{arquivo_id}")
def renomear_arquivo(
    arquivo_id: str, 
    dados: FileRenameRequest, 
    db: Session = Depends(get_db),
   
    current_user: User = Depends(get_current_user)
):
    if current_user.papel not in ["professor"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Acesso negado: Apenas professores ou monitores podem alterar arquivos."
        )

    arquivo = db.query(ArquivoConhecimento).filter(ArquivoConhecimento.id == arquivo_id).first()
    if not arquivo:
        raise HTTPException(status_code=404, detail="Arquivo não encontrado")
    
    arquivo.name = dados.name
    db.commit()
    return {"status": "Arquivo renomeado com sucesso"}


@router.delete("")
def deletar_arquivo(
    id: str, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if current_user.papel not in ["professor"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Acesso negado: Apenas professores ou monitores podem apagar arquivos."
        )

    arquivo = db.query(ArquivoConhecimento).filter(ArquivoConhecimento.id == id).first()
    if not arquivo:
        raise HTTPException(status_code=404, detail="Arquivo não encontrado")
    
    db.delete(arquivo)
    db.commit()
    return {"status": "Arquivo deletado"}
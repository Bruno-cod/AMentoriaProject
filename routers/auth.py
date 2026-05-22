from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from passlib.context import CryptContext

from core.database import get_db
# 🔥 ALTERADO: Importando 'User' em vez de 'Usuario'
from models.models import User
from schemas.schemas import UserCreate, UserLogin, UserResponse

router = APIRouter()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


@router.post("/register", response_model=UserResponse)
def register(user: UserCreate, db: Session = Depends(get_db)):
    # 🔥 ALTERADO: Consultando na tabela 'User'
    existing = db.query(User).filter(User.email == user.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Este e-mail já está cadastrado.")

    # 🔥 ALTERADO: Instanciando o modelo 'User'
    new_user = User(
        nome=user.name,
        email=user.email,
        senha_hash=pwd_context.hash(user.password),
        papel=user.role,
        disciplina=user.subject,
        ativo=True,
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return UserResponse(
        id=new_user.id,
        name=new_user.nome,
        email=new_user.email,
        role=new_user.papel,
        subject=new_user.disciplina,
    )


@router.post("/login", response_model=UserResponse)
def login(credentials: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == credentials.email).first()

    if not user or not pwd_context.verify(credentials.password, user.senha_hash):
        raise HTTPException(status_code=401, detail="E-mail ou senha incorretos.")

    return UserResponse(
        id=user.id,
        name=user.nome,
        email=user.email,
        role=user.papel,
        subject=user.disciplina,
    )
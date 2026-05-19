from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import bcrypt

from core.database import get_db
from models.models import User
from schemas.schemas import UserCreate, UserLogin, UserResponse

router = APIRouter()


@router.post("/register", response_model=UserResponse)
def register(user: UserCreate, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == user.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Este e-mail já está cadastrado.")

    password_bytes = user.password.encode('utf-8')
    salt = bcrypt.gensalt()
    senha_criptografada = bcrypt.hashpw(password_bytes, salt).decode('utf-8')

    new_user = User(
        nome=user.name,
        email=user.email,
        senha_hash=senha_criptografada,
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

    if not user:
        raise HTTPException(status_code=401, detail="E-mail ou senha incorretos.")

    password_bytes = credentials.password.encode('utf-8')
    hash_bytes = user.senha_hash.encode('utf-8')

    if not bcrypt.checkpw(password_bytes, hash_bytes):
        raise HTTPException(status_code=401, detail="E-mail ou senha incorretos.")

    return UserResponse(
        id=user.id,
        name=user.nome,
        email=user.email,
        role=user.papel,
        subject=user.disciplina,
    )
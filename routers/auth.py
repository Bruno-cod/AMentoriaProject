from fastapi import APIRouter, Depends, HTTPException, Header, status
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
from typing import Optional
import os
from dotenv import load_dotenv

from core.database import get_db
from models.models import User
from schemas.schemas import UserCreate, UserLogin

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_HOURS = 8

def criar_token(user_id: str) -> str:
    expira = datetime.utcnow() + timedelta(hours=ACCESS_TOKEN_EXPIRE_HOURS)
    return jwt.encode({"sub": str(user_id), "exp": expira}, SECRET_KEY, algorithm=ALGORITHM)


@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == user.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Este e-mail já está cadastrado.")

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

    token = criar_token(new_user.id)
    return {
        "access_token": token,
        "id": new_user.id,
        "name": new_user.nome,
        "email": new_user.email,
        "role": new_user.papel,
        "subject": new_user.disciplina,
    }


@router.post("/login")
def login(credentials: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == credentials.email).first()

    if not user or not pwd_context.verify(credentials.password, user.senha_hash):
        raise HTTPException(status_code=401, detail="E-mail ou senha incorretos.")

    token = criar_token(user.id)
    return {
        "access_token": token,
        "id": user.id,
        "name": user.nome,
        "email": user.email,
        "role": user.papel,
        "subject": user.disciplina,
    }


def get_current_user(authorization: Optional[str] = Header(None), db: Session = Depends(get_db)):
    if not authorization:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token não fornecido.")

    try:
        token = authorization.replace("Bearer ", "").strip()
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("sub")
        if not user_id:
            raise HTTPException(status_code=401, detail="Token inválido.")
    except JWTError:
        raise HTTPException(status_code=401, detail="Token inválido ou expirado.")

    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=401, detail="Usuário não encontrado.")

    return user
# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import chat, auth
from core.database import engine
from models import models

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Tutor Socrático ENEM", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/auth", tags=["Autenticação"])
app.include_router(chat.router, prefix="/api/chat", tags=["Tutoria e Chat"])


@app.get("/")
def home():
    return {"status": "API do Tutor Socrático está online!"}
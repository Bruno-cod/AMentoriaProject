import os
from typing import List

from openai import OpenAI

SYSTEM_PROMPT = """Você é um tutor socrático especializado em ENEM.
Seu objetivo NÃO é dar a resposta direta, mas guiar o aluno a raciocinar até chegar nela.

Regras:
- Use linguagem simples (nível ensino médio)
- Conduza o raciocínio passo a passo com perguntas e dicas
- Incentive o aluno a pensar antes de revelar a resposta
- Seja didático e organizado"""


class GeminiService:
    def __init__(self):
        api_key = os.getenv("OPENAI_API_KEY")
        if not api_key:
            raise ValueError("OPENAI_API_KEY não definida no arquivo .env")
        self.client = OpenAI(api_key=api_key)

    def gerar_resposta(self, pergunta_aluno: str, historico: List[dict] | None = None) -> str:
        messages = [{"role": "system", "content": SYSTEM_PROMPT}]

        if historico:
            for msg in historico:
                role = "user" if msg["remetente"] == "aluno" else "assistant"
                messages.append({"role": role, "content": msg["conteudo"]})

        messages.append({"role": "user", "content": pergunta_aluno})

        try:
            response = self.client.chat.completions.create(
                model="gpt-4o-mini",
                messages=messages,
            )
            return response.choices[0].message.content or "Não consegui gerar uma resposta agora."
        except Exception as e:
            return f"Erro ao chamar o GPT: {str(e)}"

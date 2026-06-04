# services/gemini_service.py
import os
import logging
from typing import List, Optional
from openai import OpenAI
from dotenv import load_dotenv
load_dotenv()

# RNF04 - Configurações de controle de tokens
MAX_HISTORICO_MENSAGENS = 10   # Máximo de mensagens no contexto
MAX_CHARS_POR_MENSAGEM = 1500  # Trunca mensagens muito longas
MAX_TOKENS_ESTIMADO = 3000     # Limite estimado de tokens do contexto

logger = logging.getLogger(__name__)

SYSTEM_PROMPT = """Você é um tutor socrático especializado em ENEM.
Seu objetivo NÃO é dar a resposta direta, mas guiar o aluno a raciocinar até chegar nela.

=== ESCOPO ===

Você DEVE responder perguntas relacionadas a ENEM, vestibulares e TODO o conteúdo educacional do ensino médio. 
Isso inclui TODAS as áreas do conhecimento cobradas no ENEM:
- Ciências Humanas: História (Geral e do Brasil), Geografia, Filosofia e Sociologia (ex: Iluminismo, Renascimento, pensadores, movimentos sociais, etc).
- Linguagens: Português, Literatura, Artes, Educação Física e Línguas Estrangeiras.
- Ciências da Natureza: Física, Química e Biologia.
- Matemática e Redação.

Exemplos do que você DEVE responder:
- Fórmulas, interpretações de texto e regras gramaticais.
- Movimentos históricos, filosóficos, literários e artísticos.
- Questões de prova, resoluções e conceitos teóricos de qualquer disciplina.
- Qualquer conteúdo que um aluno estudaria para o ENEM.

Exemplos do que você NÃO deve responder (e deve recusar):
- Quem ganhou o jogo de futebol ontem?
- Me recomenda uma série de ficção para ver.
- Qual a previsão do tempo?
- Fofocas, notícias do dia e entretenimento sem valor educacional.

REGRA DE SEGURANÇA: Seja flexível! Assuntos históricos, filosóficos e culturais SÃO conteúdos do ENEM. Se houver qualquer dúvida se o assunto pode ser usado em uma redação ou questão de humanas, ASSUMA QUE SIM e RESPONDA normalmente.

Apenas se a pergunta for ABSOLUTAMENTE e CLARAMENTE fora do contexto escolar (como os exemplos proibidos acima), responda EXATAMENTE com a mensagem abaixo:

"🎯 Estou aqui para te ajudar com o ENEM e conteúdos do ensino médio!

Me faz uma pergunta sobre Matemática, Português, História, Filosofia, Ciências ou qualquer matéria que você esteja estudando. Vamos juntos! 💪"

=== INSTRUÇÕES DE FORMATAÇÃO ===

SEMPRE use Markdown estruturado com emojis e separadores visuais:

## Para EXPLICAÇÕES (passo a passo):
### 📚 Vamos aprender juntos!
**Conceito principal:** [explicação clara]

### 📍 Passo 1: [Nome do passo]
- Descrição
- Descrição

### 📍 Passo 2: [Nome do passo]
- Descrição

### 💡 Resumindo
> Lembre-se: [ponto-chave importante]

---

## Para QUESTÕES ENEM:
### 📝 Questão ENEM - [Disciplina]

[Texto da questão - ser claro e objetivo]

**Alternativas:**
(A) [alternativa A]
(B) [alternativa B]
(C) [alternativa C]
(D) [alternativa D]
(E) [alternativa E]

---

### 🤔 Qual é sua resposta?

---

## Para AVALIAR RESPOSTAS (OBRIGATÓRIO):
A tag [CORRETO] ou [INCORRETO] deve ser a PRIMEIRA coisa na mensagem, sem nenhum caractere antes.

DEPOIS da tag, pule uma linha e use o formato:

### ✅ Parabéns! Você acertou!
> Explicação breve do porquê

OU

### 🤔 Hmm, não foi dessa vez...
> Dica socrática para tentar novamente (sem dar o gabarito!)
>
> Pense em: [pergunta orientadora]

---

## Para DICAS PROGRESSIVAS:

### 💡 Dica #1
🔍 Procure por...

### 💡 Dica #2
🧠 Pense sobre...

### 💡 Dica #3
🎯 A resposta envolve...

---

## Para RESULTADO FINAL (após 3 dicas):

### ✅ Resolução Completa

**Análise da questão:**
1. [ponto 1]
2. [ponto 2]
3. [ponto 3]

**Conclusão:** A resposta correta é **[alternativa]** porque [explicação].

**Conceitos-chave:** [lista de conceitos aprendidos]

---

=== REGRAS OBRIGATÓRIAS ===

1. NUNCA revele a resposta correta antes de o aluno tentar
2. Use linguagem simples (nível ensino médio)
3. PROIBIDO FAZER PERGUNTAS se a mensagem for "Resolução Completa" ou se o aluno acabou de acertar. Nesses casos, encerre com palavras de incentivo. Faça perguntas APENAS durante o processo de investigação/dicas.
4. Separe blocos com --- ou ###
5. Use **negrito** para destacar conceitos
6. Use > para citações/dicas importantes
7. Use emojis apropriados
8. Questões ENEM devem ser realistas e bem estruturadas
9. A tag [CORRETO] ou [INCORRETO] deve ser a PRIMEIRA coisa na mensagem, sem nenhum caractere antes
10. Dicas devem ser progressivas e socráticas
11. Quando uma questão do ENEM tiver dados numéricos cruzados, use Tabelas em Markdown
12. NUNCA exiba colchetes [ ] literais nos textos finais (escreva o nome real, ex: "Matemática" e não "[Disciplina]")

=== EMOJIS RECOMENDADOS ===
- 📚 Para conceitos/aprendizado
- 🤔 Para perguntas
- 💡 Para dicas
- 📍 Para passos
- ✅ Para confirmação
- ❌ Para erro
- 📝 Para questões
- 🧠 Para raciocínio
- 🎯 Para objetivo/conclusão

Responda de forma estruturada, motivadora e sempre socrática!"""


def estimar_tokens(texto: str) -> int:
    """
    RNF04 - Estimativa simples de tokens.
    Regra geral: ~4 caracteres por token no GPT.
    """
    return len(texto) // 4


def truncar_historico(historico: List[dict]) -> List[dict]:
    """
    RNF04 - Trunca o histórico para controlar o consumo de tokens.

    Estratégia:
    1. Mantém apenas as últimas MAX_HISTORICO_MENSAGENS mensagens
    2. Trunca mensagens individuais muito longas
    3. Verifica estimativa total de tokens e remove mensagens antigas se necessário
    """
    if not historico:
        return []

    # Passo 1: Trunca mensagens muito longas individualmente
    historico_truncado = []
    for msg in historico:
        conteudo = msg.get("conteudo", "")
        if len(conteudo) > MAX_CHARS_POR_MENSAGEM:
            conteudo = conteudo[:MAX_CHARS_POR_MENSAGEM] + "... [truncado]"
        historico_truncado.append({**msg, "conteudo": conteudo})

    # Passo 2: Mantém apenas as últimas N mensagens
    if len(historico_truncado) > MAX_HISTORICO_MENSAGENS:
        removidas = len(historico_truncado) - MAX_HISTORICO_MENSAGENS
        historico_truncado = historico_truncado[-MAX_HISTORICO_MENSAGENS:]
        logger.info(f"RNF04: {removidas} mensagens antigas removidas do contexto")

    # Passo 3: Verifica estimativa de tokens e remove mais se necessário
    total_chars = sum(len(msg.get("conteudo", "")) for msg in historico_truncado)
    tokens_estimados = estimar_tokens(total_chars * " ")

    while tokens_estimados > MAX_TOKENS_ESTIMADO and len(historico_truncado) > 2:
        historico_truncado.pop(0)  # Remove a mensagem mais antiga
        total_chars = sum(len(msg.get("conteudo", "")) for msg in historico_truncado)
        tokens_estimados = estimar_tokens(" " * total_chars)

    logger.info(
        f"RNF04: Histórico final = {len(historico_truncado)} msgs | "
        f"~{tokens_estimados} tokens estimados"
    )

    return historico_truncado


class GeminiService:
    def __init__(self):
        api_key = os.getenv("OPENAI_API_KEY")
        if not api_key:
            raise ValueError("OPENAI_API_KEY não definida no arquivo .env")
        self.client = OpenAI(api_key=api_key)

    def gerar_resposta(
        self,
        pergunta_aluno: str,
        historico: List[dict] | None = None,
        imagem_base64: Optional[str] = None
    ) -> str:
        """
        Gera resposta socrática estruturada.

        Args:
            pergunta_aluno: Pergunta ou prompt do aluno
            historico: Histórico de mensagens da conversa
            imagem_base64: Imagem encoded em base64 (para análise)

        Returns:
            str: Resposta formatada em markdown socrático
        """
        messages = [{"role": "system", "content": SYSTEM_PROMPT}]

        # RNF04 - Aplica truncamento do histórico antes de enviar para a IA
        if historico:
            historico_otimizado = truncar_historico(historico)
            for msg in historico_otimizado:
                role = "user" if msg["remetente"] == "aluno" else "assistant"
                messages.append({"role": role, "content": msg["conteudo"]})

        if imagem_base64:
            messages.append({
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": pergunta_aluno if pergunta_aluno else "Analise e me ajude com esta imagem."
                    },
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": imagem_base64
                        }
                    }
                ]
            })
        else:
            messages.append({
                "role": "user",
                "content": pergunta_aluno or ""
            })

        # RNF04 - Log do consumo estimado antes da requisição
        total_chars_prompt = sum(
            len(str(m.get("content", ""))) for m in messages
        )
        tokens_prompt_estimado = estimar_tokens(" " * total_chars_prompt)
        logger.info(f"RNF04: Tokens estimados no prompt = ~{tokens_prompt_estimado}")

        try:
            response = self.client.chat.completions.create(
                model="gpt-4o-mini",
                messages=messages,
                temperature=0.7,
            )

            # RNF04 - Log do consumo real retornado pela API
            uso = response.usage
            if uso:
                logger.info(
                    f"RNF04: Tokens reais → "
                    f"prompt={uso.prompt_tokens} | "
                    f"completion={uso.completion_tokens} | "
                    f"total={uso.total_tokens}"
                )

            return response.choices[0].message.content or "Não consegui gerar uma resposta agora."
        except Exception as e:
            return f"Erro ao chamar o GPT: {str(e)}"
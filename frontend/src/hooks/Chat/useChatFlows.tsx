import { ClassificationResult } from "@/types/enem";
import { Message, Suggestion } from "@/types/chat";
import { classifyMessage } from "@/lib/classifyMessage";
import { generateId } from "@/hooks/Chat/useChatState";
import { enviarMensagem } from "@/lib/services/chat";

interface ChatContext {
  alunoId: string;
  sessaoChatId: string;
}

export const chatFlowService = {
  async processInitialMessage(
    text: string,
    isFirstMessage: boolean,
    ctx: ChatContext,
    imageInput?: string | File | null // 🔥 CONSERTADO: Parâmetro adicionado para aceitar a imagem do useChat
  ): Promise<{ message: Message; classification?: ClassificationResult }> {
    let currentClassification: ClassificationResult | undefined;

    if (isFirstMessage && text) {
      currentClassification = await classifyMessage(text);
    }


    const resposta = await enviarMensagem({
      aluno_id: ctx.alunoId,
      sessao_chat_id: ctx.sessaoChatId,
      texto_duvida: text,
    });

    const message: Message = {
      id: generateId("ai"),
      role: "ai",
      content: resposta.mensagem_ia,
      suggestions: [
        { label: "📖 Explicação", value: "flow_explanation" },
        { label: "📝 Gerar Questões", value: "flow_questions" },
        { label: "💡 Dicas", value: "flow_tips" },
      ],
    };

    return { message, classification: currentClassification };
  },

  async generateExplanation(
    classification: ClassificationResult | null,
    ctx: ChatContext
  ): Promise<Message> {
    const texto = classification?.topic
      ? `Pode me explicar sobre ${classification.topic} passo a passo?`
      : "Pode me explicar esse assunto passo a passo?";

    const resposta = await enviarMensagem({
      aluno_id: ctx.alunoId,
      sessao_chat_id: ctx.sessaoChatId,
      texto_duvida: texto,
    });

    return {
      id: generateId("exp"),
      role: "ai",
      content: resposta.mensagem_ia,
      suggestions: [
        { label: "📝 Testar com Questões", value: "flow_questions" },
        { label: "💡 Ver Dicas", value: "flow_tips" },
      ],
    };
  },

  async generateQuestion(
    classification: ClassificationResult | null,
    ctx: ChatContext
  ): Promise<Message> {
    const texto = classification?.topic
      ? `Gere uma questão de múltipla escolha no estilo ENEM sobre ${classification.topic} com 5 alternativas (A, B, C, D, E) e me diga qual é a correta ao final.`
      : "Gere uma questão de múltipla escolha no estilo ENEM sobre esse assunto com 5 alternativas (A, B, C, D, E) e me diga qual é a correta ao final.";

    const resposta = await enviarMensagem({
      aluno_id: ctx.alunoId,
      sessao_chat_id: ctx.sessaoChatId,
      texto_duvida: texto,
    });

    return {
      id: generateId("q"),
      role: "ai",
      content: resposta.mensagem_ia,
      suggestions: [
        { label: "💡 Pedir Dica", value: "flow_tips" },
        { label: "📖 Ver Explicação", value: "flow_explanation" },
      ],
    };
  },

  async processAnswer(
    value: string,
    classification: ClassificationResult | null,
    ctx: ChatContext
  ): Promise<{ message: Message; isCorrect: boolean; userMsg: Message }> {
    const [, answerLabel] = value.split("|");

    const userMsg: Message = {
      id: generateId("req-ans"),
      role: "user",
      content: answerLabel ? `Minha resposta é a alternativa: **${answerLabel}**` : "Essa é minha resposta.",
    };

    const resposta = await enviarMensagem({
      aluno_id: ctx.alunoId,
      sessao_chat_id: ctx.sessaoChatId,
      texto_duvida: userMsg.content,
    });

    const aiMsg: Message = {
      id: generateId("ans"),
      role: "ai",
      content: resposta.mensagem_ia,
      suggestions: [
        { label: "💡 Pedir Dicas", value: "flow_tips" },
        { label: "📝 Tentar Novamente", value: "flow_questions" },
      ],
    };

    return { message: aiMsg, isCorrect: false, userMsg };
  },

  async generateTip(
    tipCount: number,
    classification: ClassificationResult | null,
    ctx: ChatContext
  ): Promise<{ message: Message; newTipCount: number; isFinal: boolean; userMsg: Message }> {
    const nextLevel = tipCount + 1;
    const isFinal = nextLevel > 3;

    const userMsg: Message = {
      id: generateId("req-tip"),
      role: "user",
      content: isFinal ? "Ver resultado final." : `Dica #${nextLevel}, por favor!`,
    };

    const texto = isFinal
      ? "Me dê a resolução completa e final desse problema."
      : `Me dê a dica número ${nextLevel} de 3 para resolver esse problema. Seja socrático e não entregue a resposta diretamente.`;

    const resposta = await enviarMensagem({
      aluno_id: ctx.alunoId,
      sessao_chat_id: ctx.sessaoChatId,
      texto_duvida: texto,
    });

    const suggestions: Suggestion[] = isFinal
      ? []
      : nextLevel === 3
        ? [{ label: "✅ Ver resultado final", value: "action_next_tip" }]
        : [{ label: "💡 Próxima dica", value: "action_next_tip" }];

    const aiMsg: Message = {
      id: generateId("tip"),
      role: "ai",
      content: resposta.mensagem_ia,
      suggestions,
      tipLevel: nextLevel,
    };

    return { message: aiMsg, newTipCount: isFinal ? 0 : nextLevel, isFinal, userMsg };
  },
};
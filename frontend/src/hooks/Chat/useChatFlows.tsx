import { ClassificationResult } from "@/types/enem";
import { Message, Suggestion } from "@/types/chat";
import { classifyMessage } from "@/lib/classifyMessage";
import { generateId } from "@/hooks/Chat/useChatState";
import { enviarMensagem } from "@/lib/services/chat";
 
interface ChatContext {
  alunoId: string;
  sessaoChatId: string;
}
 
// Remove as tags [CORRETO] e [INCORRETO] do texto bruto da IA
// Usa regex para cobrir casos onde a tag vem com "- ", "* " ou espaços antes
function limparTagsDeAvaliacao(texto: string): string {
  return texto
    .replace(/^[\s\-\*]*\[CORRETO\]/m, "")
    .replace(/^[\s\-\*]*\[INCORRETO\]/m, "")
    .trim();
}
 
export const chatFlowService = {
  async processInitialMessage(
    text: string,
    isFirstMessage: boolean,
    ctx: ChatContext,
    imageInput?: string | null
  ): Promise<{ message: Message; classification?: ClassificationResult }> {
    let currentClassification: ClassificationResult | undefined;
 
    if (isFirstMessage && text) {
      currentClassification = await classifyMessage(text);
    }
 
    const resposta = await enviarMensagem({
      aluno_id: ctx.alunoId,
      sessao_chat_id: ctx.sessaoChatId,
      texto_duvida: text,
      imagem_base64: imageInput,
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
      ? `Gere uma questão de múltipla escolha no estilo ENEM sobre ${classification.topic} com 5 alternativas (A, B, C, D, E). Atenção: NÃO mostre a resposta correta e NÃO dê o gabarito agora. Guarde a resposta com você e espere eu responder.`
      : "Gere uma questão de múltipla escolha no estilo ENEM sobre esse assunto com 5 alternativas (A, B, C, D, E). Atenção: NÃO mostre a resposta correta e NÃO dê o gabarito agora. Guarde a resposta com você e espere eu responder.";
 
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
        { label: "A", value: "answer_wrong|A" },
        { label: "B", value: "answer_wrong|B" },
        { label: "C", value: "answer_wrong|C" },
        { label: "D", value: "answer_wrong|D" },
        { label: "E", value: "answer_wrong|E" },
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
 
    const conteudoVisualUsuario = answerLabel
      ? `Minha resposta é a alternativa **${answerLabel}**`
      : "Essa é minha resposta.";
 
    const userMsg: Message = {
      id: generateId("req-ans"),
      role: "user",
      content: conteudoVisualUsuario,
    };
 
    const promptOcultoParaIA = answerLabel
      ? `Escolhi a alternativa **${answerLabel}**. Avalie minha resposta.
         REGRA OBRIGATÓRIA: Comece sua resposta EXATAMENTE com a tag "[CORRETO]" se a alternativa escolhida for a certa, ou "[INCORRETO]" se for a errada.
         Se eu acertei, me dê os parabéns e explique o porquê brevemente.
         Se eu errei, diga de forma amigável e me dê uma pista socrática para eu tentar novamente, sem me dar o gabarito.`
      : "Essa é minha resposta.";
 
    const resposta = await enviarMensagem({
      aluno_id: ctx.alunoId,
      sessao_chat_id: ctx.sessaoChatId,
      texto_duvida: promptOcultoParaIA,
    });
 
    const textoBruto = resposta.mensagem_ia;
    const acertou = textoBruto.includes("[CORRETO]");
    const textoLimpo = limparTagsDeAvaliacao(textoBruto);
 
    const aiMsg: Message = {
      id: generateId("ans"),
      role: "ai",
      content: textoLimpo,
      suggestions: !acertou
        ? [
            { label: "A", value: "answer_wrong|A" },
            { label: "B", value: "answer_wrong|B" },
            { label: "C", value: "answer_wrong|C" },
            { label: "D", value: "answer_wrong|D" },
            { label: "E", value: "answer_wrong|E" },
            { label: "💡 Pedir Dica", value: "flow_tips" },
            { label: "📖 Ver Explicação Completa", value: "flow_explanation" },
          ]
        : [
            { label: "📝 Gerar Outra Questão", value: "flow_questions" },
            { label: "📖 Ver Explicação Completa", value: "flow_explanation" },
          ],
    };
 
    return { message: aiMsg, isCorrect: acertou, userMsg };
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
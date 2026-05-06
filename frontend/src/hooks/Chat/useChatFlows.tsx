import { ClassificationResult } from "@/types/enem";
import { Message, Suggestion } from "@/types/chat";
import { classifyMessage } from "@/lib/classifyMessage";
import { generateId } from "@/hooks/Chat/useChatState";
import {
  mockExplanations,
  mockQuestions,
  mockTipSets,
  getQuestionSuggestions,
} from "@/mocks/chat/index";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const chatFlowService = {
  async processInitialMessage(text: string, isFirstMessage: boolean): Promise<{ message: Message; classification?: ClassificationResult }> {
    let currentClassification;

    if (isFirstMessage && text) {
      currentClassification = await classifyMessage(text);
    } else {
      await delay(1500);
    }

    const message: Message = {
      id: generateId("ai"),
      role: "ai",
      content: isFirstMessage
        ? `Identifiquei que sua dúvida é sobre **${currentClassification?.topic}**. Como você gostaria de prosseguir?`
        : "Entendido! Continuando nossa análise...",
      suggestions: isFirstMessage
        ? [
            { label: "📖 Explicação", value: "flow_explanation" },
            { label: "📝 Gerar Questões", value: "flow_questions" },
            { label: "💡 Dicas", value: "flow_tips" },
          ]
        : undefined,
    };

    return { message, classification: currentClassification };
  },

  async generateExplanation(classification: ClassificationResult | null): Promise<Message> {
    await delay(1500);
    const explanation = mockExplanations.find((e) => e.competencyCode === classification?.competencyCode) || mockExplanations[0];

    return {
      id: generateId("exp"),
      role: "ai",
      content: `Com certeza! Vamos entender mais sobre **${explanation.topic}**:\n\n${explanation.content}\n\nFicou mais claro agora? Como quer continuar?`,
      suggestions: [
        { label: "📝 Testar com Questões", value: "flow_questions" },
        { label: "💡 Ver Dicas", value: "flow_tips" },
      ],
    };
  },

  async generateQuestion(classification: ClassificationResult | null): Promise<Message> {
    await delay(1500);
    const question = mockQuestions.find((q) => q.competencyCode === classification?.competencyCode) || mockQuestions[0];

    return {
      id: generateId("q"),
      role: "ai",
      content: `Aqui está uma questão do ENEM sobre **${question.topic}** para testar seu conhecimento:\n\n${question.content}`,
      suggestions: getQuestionSuggestions(question),
    };
  },

  async processAnswer(value: string, classification: ClassificationResult | null): Promise<{ message: Message; isCorrect: boolean; userMsg: Message }> {
    const [actionType, answerLabel] = value.split("|");
    const isCorrect = actionType === "answer_correct";

    const userMsg: Message = {
      id: generateId("req-ans"),
      role: "user",
      content: answerLabel ? `Vou apostar na alternativa: **${answerLabel}**` : "Vou apostar nessa alternativa!",
    };

    await delay(1500);
    const question = mockQuestions.find((q) => q.competencyCode === classification?.competencyCode) || mockQuestions[0];

    const aiMsg: Message = {
      id: generateId("ans"),
      role: "ai",
      content: isCorrect
        ? `🎉 **Correto!** Você mandou muito bem!\n\n**Explicação:** ${question.explanation}`
        : `❌ **Quase lá!** A resposta não é essa.\n\nTente novamente ou peça uma dica para te ajudar.`,
      suggestions: isCorrect
        ? []
        : [
            { label: "💡 Pedir Dicas", value: "flow_tips" },
            { label: "📝 Tentar Novamente", value: "flow_questions" },
          ],
    };

    return { message: aiMsg, isCorrect, userMsg };
  },

  async generateTip(tipCount: number, classification: ClassificationResult | null): Promise<{ message: Message; newTipCount: number; isFinal: boolean; userMsg: Message }> {
    const nextLevel = tipCount + 1;
    const userMsg: Message = {
      id: generateId("req-tip"),
      role: "user",
      content: nextLevel <= 3 ? `Dica #${nextLevel}, por favor!` : "Ver resultado final.",
    };

    await delay(1000);
    const tipSet = mockTipSets.find((t) => t.competencyCode === classification?.competencyCode) || mockTipSets[0];

    if (nextLevel > 3) {
      const finalAiMsg: Message = {
        id: generateId("res"),
        role: "ai",
        content: `**Conclusão:**\n${tipSet.finalAnswer}`,
      };
      return { message: finalAiMsg, newTipCount: 0, isFinal: true, userMsg };
    }

    const suggestions: Suggestion[] = nextLevel === 3
        ? [{ label: "✅ Ver resultado final", value: "action_next_tip" }]
        : [{ label: "💡 Próxima dica", value: "action_next_tip" }];

    const aiMsg: Message = {
      id: generateId("tip"),
      role: "ai",
      content: tipSet.tips[nextLevel - 1].content,
      suggestions,
      tipLevel: nextLevel,
    };

    return { message: aiMsg, newTipCount: nextLevel, isFinal: false, userMsg };
  }
};
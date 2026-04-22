// src/hooks/useChat.ts (ou onde estiver o seu useChat)
"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { ClassificationResult } from "@/types/enem";
import { classifyMessage } from "@/lib/classifyMessage";
import { syncChatHistoryWithAPI } from "@/lib/services/historico"; 
import { Message, Suggestion } from "@/types/chat"; 
import { 
  mockExplanations, 
  mockQuestions, 
  mockTipSets, 
  getQuestionSuggestions 
} from "@/mocks/chat/index";

const generateId = (prefix: string) =>
    `${prefix}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [tipCount, setTipCount] = useState(0);
  const [isChatFinished, setIsChatFinished] = useState(false);
  const [classification, setClassification] = useState<ClassificationResult | null>(null);

  const chatIdRef = useRef(generateId("hist"));
  const lastProcessedUserMsgId = useRef<string | null>(null);

  const { user } = useAuthStore();

  const clearChat = useCallback(() => {
    setMessages([]);
    setIsAiThinking(false);
    setTipCount(0);
    setClassification(null);
    setIsChatFinished(false);
    lastProcessedUserMsgId.current = null;
    chatIdRef.current = generateId("hist");
  }, []);

  const handleRateMessage = useCallback((messageId: string, rating: "up" | "down") => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId
          ? { ...msg, rating: msg.rating === rating ? undefined : rating }
          : msg,
      ),
    );
  }, []);

  const handleFeedbackTextSubmit = useCallback((messageId: string, text: string) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId ? { ...msg, feedbackText: text } : msg,
      ),
    );
  }, []);

  useEffect(() => {
    if (messages.length === 0 || !user?.email) return;

    const firstUserMsg = messages.find((m) => m.role === "user");
    const topic = firstUserMsg
      ? firstUserMsg.content.length > 35
        ? firstUserMsg.content.substring(0, 35) + "..."
        : firstUserMsg.content
      : "Nova Dúvida";

    syncChatHistoryWithAPI({
      chatId: chatIdRef.current,
      email: user.email,
      topic,
      messages,
      isFinished: isChatFinished
    });

  }, [messages, isChatFinished, user?.email]);

  const handleExplanationFlow = useCallback(() => {
    const userMsgId = generateId("req-exp");

    setMessages((prev) => [...prev, { id: userMsgId, role: "user", content: "Pode me explicar isso passo a passo?" }]);
    setIsAiThinking(true);

    setTimeout(() => {
      if (lastProcessedUserMsgId.current === userMsgId) return;
      lastProcessedUserMsgId.current = userMsgId;

      const explanation = mockExplanations.find(e => e.competencyCode === classification?.competencyCode) 
                       || mockExplanations[0];

      const aiMsg: Message = {
        id: generateId("exp"),
        role: "ai",
        content: `Com certeza! Vamos entender mais sobre **${explanation.topic}**:\n\n${explanation.content}\n\nFicou mais claro agora? Como quer continuar?`,
        suggestions: [
          { label: "📝 Testar com Questões", value: "flow_questions" },
          { label: "💡 Ver Dicas", value: "flow_tips" },
        ],
      };

      setIsAiThinking(false);
      setMessages((prev) => [...prev, aiMsg]);
    }, 1500);
  }, [classification]);

  const handleQuestionFlow = useCallback(() => {
    const userMsgId = generateId("req-q");

    setMessages((prev) => [...prev, { id: userMsgId, role: "user", content: "Gostaria de resolver uma questão sobre isso." }]);
    setIsAiThinking(true);

    setTimeout(() => {
      if (lastProcessedUserMsgId.current === userMsgId) return;
      lastProcessedUserMsgId.current = userMsgId;

      const question = mockQuestions.find(q => q.competencyCode === classification?.competencyCode) 
                    || mockQuestions[0];

      const aiMsg: Message = {
        id: generateId("q"),
        role: "ai",
        content: `Aqui está uma questão do ENEM sobre **${question.topic}** para testar seu conhecimento:\n\n${question.content}`,
        suggestions: getQuestionSuggestions(question), 
      };

      setIsAiThinking(false);
      setMessages((prev) => [...prev, aiMsg]);
    }, 1500);
  }, [classification]);

  const handleAnswer = useCallback((value: string) => {
    const [actionType, answerLabel] = value.split("|");
    const isCorrect = actionType === "answer_correct";
    const userMsgId = generateId("req-ans");

    setMessages((prev) => [...prev, {
        id: userMsgId,
        role: "user",
        content: answerLabel ? `Vou apostar na alternativa: **${answerLabel}**` : "Vou apostar nessa alternativa!",
    }]);

    setIsAiThinking(true);

    setTimeout(() => {
      if (lastProcessedUserMsgId.current === userMsgId) return;
      lastProcessedUserMsgId.current = userMsgId;

      const question = mockQuestions.find(q => q.competencyCode === classification?.competencyCode) 
                    || mockQuestions[0];

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

      setIsAiThinking(false);
      setMessages((prev) => [...prev, aiMsg]);

      if (isCorrect) setIsChatFinished(true);
    }, 1500);
  }, [classification]);

  const handleTipFlow = useCallback(() => {
    const nextLevel = tipCount + 1;
    const userMsgId = generateId("req");

    const userReq: Message = {
      id: userMsgId,
      role: "user",
      content: nextLevel <= 3 ? `Dica #${nextLevel}, por favor!` : "Ver resultado final.",
    };

    setMessages((prev) => [...prev, userReq]);
    setIsAiThinking(true);

    setTimeout(() => {
      if (lastProcessedUserMsgId.current === userMsgId) return;
      lastProcessedUserMsgId.current = userMsgId;

      const tipSet = mockTipSets.find(t => t.competencyCode === classification?.competencyCode) 
                  || mockTipSets[0];

      let content = "";
      let suggestions: Suggestion[] = [];

      if (nextLevel <= 3) {
        content = tipSet.tips[nextLevel - 1].content;
        suggestions = nextLevel === 3 
          ? [{ label: "✅ Ver resultado final", value: "action_next_tip" }]
          : [{ label: "💡 Próxima dica", value: "action_next_tip" }];
      } else {
        const finalAiMsg: Message = {
          id: generateId("res"),
          role: "ai",
          content: `**Conclusão:**\n${tipSet.finalAnswer}`,
        };

        setMessages((prev) => [...prev, finalAiMsg]);
        setTipCount(0);
        setIsAiThinking(false);
        setIsChatFinished(true);
        return;
      }

      const aiMsg: Message = {
        id: generateId("tip"),
        role: "ai",
        content,
        suggestions,
        tipLevel: nextLevel,
      };

      setTipCount(nextLevel);
      setIsAiThinking(false);
      setMessages((prev) => [...prev, aiMsg]);
    }, 1000);
  }, [tipCount, classification]);

  const sendMessage = useCallback(async (text: string, image?: string | null) => {
    const userMsgId = generateId("u");
    const userMsg: Message = { id: userMsgId, role: "user", content: text || "", image };

    setMessages((prev) => [...prev, userMsg]);
    setIsAiThinking(true);

    if (lastProcessedUserMsgId.current === userMsgId) return;
    lastProcessedUserMsgId.current = userMsgId;

    try {
      const isFirstMessage = messages.filter((m) => m.role === "user").length === 0;
      let currentClassification = classification;

      if (isFirstMessage && text) {
        currentClassification = await classifyMessage(text);
        setClassification(currentClassification);
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1500));
      }

      const aiMsg: Message = {
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

      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      console.error("Erro ao processar:", error);
      setMessages((prev) => [...prev, { id: generateId("ai"), role: "ai", content: "Ops, tive um problema ao processar. Pode tentar novamente?" }]);
    } finally {
      setIsAiThinking(false);
    }
  }, [messages, classification]);

  return {
    messages,
    isAiThinking,
    sendMessage,
    handleTipFlow,
    tipCount,
    handleQuestionFlow,
    handleAnswer,
    handleExplanationFlow,
    isChatFinished,
    handleRateMessage,
    handleFeedbackTextSubmit,
    clearChat,
  };
}
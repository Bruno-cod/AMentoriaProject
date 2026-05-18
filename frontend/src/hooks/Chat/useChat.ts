"use client";

import { useState, useCallback, useRef } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { ClassificationResult } from "@/types/enem";
import { useChatState, generateId } from "@/hooks/Chat/useChatState";
import { useChatSync } from "@/hooks/Chat/useChatSync";
import { chatFlowService } from "@/hooks/Chat/useChatFlows";

export function useChat() {
  const { user } = useAuthStore();
  const [isChatFinished, setIsChatFinished] = useState(false);
  const [classification, setClassification] = useState<ClassificationResult | null>(null);
  const lastProcessedUserMsgId = useRef<string | null>(null);
  const sessaoChatIdRef = useRef<number>(Math.floor(Date.now() / 1000));

  const {
    messages,
    isAiThinking,
    setIsAiThinking,
    tipCount,
    setTipCount,
    addMessage,
    updateMessageRating,
    updateMessageFeedback,
    clearState,
  } = useChatState();

  const { resetChatId } = useChatSync({
    messages,
    isChatFinished,
    userEmail: user?.email,
  });

  const getChatContext = useCallback(() => ({
    alunoId: user?.id ?? 0,
    sessaoChatId: sessaoChatIdRef.current,
  }), [user?.id]);

  const clearChat = useCallback(() => {
    clearState();
    setClassification(null);
    setIsChatFinished(false);
    lastProcessedUserMsgId.current = null;
    sessaoChatIdRef.current = Math.floor(Date.now() / 1000);
    resetChatId();
  }, [clearState, resetChatId]);

  const handleExplanationFlow = useCallback(async () => {
    const userMsgId = generateId("req-exp");
    if (lastProcessedUserMsgId.current === userMsgId) return;
    lastProcessedUserMsgId.current = userMsgId;

    addMessage({ id: userMsgId, role: "user", content: "Pode me explicar isso passo a passo?" });
    setIsAiThinking(true);

    const aiMsg = await chatFlowService.generateExplanation(classification, getChatContext());
    addMessage(aiMsg);
    setIsAiThinking(false);
  }, [classification, addMessage, setIsAiThinking, getChatContext]);

  const handleQuestionFlow = useCallback(async () => {
    const userMsgId = generateId("req-q");
    if (lastProcessedUserMsgId.current === userMsgId) return;
    lastProcessedUserMsgId.current = userMsgId;

    addMessage({ id: userMsgId, role: "user", content: "Gostaria de resolver uma questão sobre isso." });
    setIsAiThinking(true);

    const aiMsg = await chatFlowService.generateQuestion(classification, getChatContext());
    addMessage(aiMsg);
    setIsAiThinking(false);
  }, [classification, addMessage, setIsAiThinking, getChatContext]);

  const handleAnswer = useCallback(async (value: string) => {
    setIsAiThinking(true);
    const { message, isCorrect, userMsg } = await chatFlowService.processAnswer(value, classification, getChatContext());

    if (lastProcessedUserMsgId.current === userMsg.id) return;
    lastProcessedUserMsgId.current = userMsg.id;

    addMessage(userMsg);
    addMessage(message);
    setIsAiThinking(false);

    if (isCorrect) setIsChatFinished(true);
  }, [classification, addMessage, setIsAiThinking, getChatContext]);

  const handleTipFlow = useCallback(async () => {
    setIsAiThinking(true);
    const { message, newTipCount, isFinal, userMsg } = await chatFlowService.generateTip(tipCount, classification, getChatContext());

    if (lastProcessedUserMsgId.current === userMsg.id) return;
    lastProcessedUserMsgId.current = userMsg.id;

    addMessage(userMsg);
    addMessage(message);
    setTipCount(newTipCount);
    setIsAiThinking(false);

    if (isFinal) setIsChatFinished(true);
  }, [tipCount, classification, addMessage, setIsAiThinking, setTipCount, getChatContext]);

  const sendMessage = useCallback(async (text: string, imageInput?: string | File | null) => {
    let imageUrl: string | null | undefined = null;

    if (imageInput instanceof File) {
      imageUrl = URL.createObjectURL(imageInput);
    } else if (typeof imageInput === "string") {
      imageUrl = imageInput;
    }

    const userMsgId = generateId("u");
    addMessage({ id: userMsgId, role: "user", content: text || "", image: imageUrl });
    setIsAiThinking(true);

    if (lastProcessedUserMsgId.current === userMsgId) return;
    lastProcessedUserMsgId.current = userMsgId;

    try {
      const isFirstMessage = messages.filter((m) => m.role === "user").length === 0;
      const { message, classification: newClassification } = await chatFlowService.processInitialMessage(
        text,
        isFirstMessage,
        getChatContext()
      );

      if (newClassification) setClassification(newClassification);
      addMessage(message);
    } catch (error) {
      console.error("Erro ao processar:", error);
      addMessage({ id: generateId("ai"), role: "ai", content: "Ops, tive um problema ao conectar com o servidor. O backend está rodando?" });
    } finally {
      setIsAiThinking(false);
    }
  }, [messages, addMessage, setIsAiThinking, getChatContext]);

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
    handleRateMessage: updateMessageRating,
    handleFeedbackTextSubmit: updateMessageFeedback,
    clearChat,
  };
}

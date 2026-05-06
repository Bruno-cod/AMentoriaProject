import { useState, useCallback } from "react";
import { Message } from "@/types/chat";

export const generateId = (prefix: string) =>
  `${prefix}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

export function useChatState() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [tipCount, setTipCount] = useState(0);

  const addMessage = useCallback((message: Message) => {
    setMessages((prev) => [...prev, message]);
  }, []);

  const updateMessageRating = useCallback((messageId: string, rating: "up" | "down") => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId
          ? { ...msg, rating: msg.rating === rating ? undefined : rating }
          : msg
      )
    );
  }, []);

  const updateMessageFeedback = useCallback((messageId: string, text: string) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId ? { ...msg, feedbackText: text } : msg
      )
    );
  }, []);

  const clearState = useCallback(() => {
    setMessages([]);
    setIsAiThinking(false);
    setTipCount(0);
  }, []);

  return {
    messages,
    isAiThinking,
    setIsAiThinking,
    tipCount,
    setTipCount,
    addMessage,
    updateMessageRating,
    updateMessageFeedback,
    clearState,
  };
}
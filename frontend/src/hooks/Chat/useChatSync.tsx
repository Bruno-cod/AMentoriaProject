import { useEffect, useRef, useCallback } from "react";
import { Message } from "@/types/chat";
import { syncChatHistoryWithAPI } from "@/lib/services/historico";
import { generateId } from "./useChatState";

interface UseChatSyncProps {
  messages: Message[];
  isChatFinished: boolean;
  userEmail?: string;
}

export function useChatSync({ messages, isChatFinished, userEmail }: UseChatSyncProps) {
  const chatIdRef = useRef(generateId("hist"));

  const resetChatId = useCallback(() => {
    chatIdRef.current = generateId("hist");
  }, []);

  useEffect(() => {
    if (messages.length === 0 || !userEmail) return;

    const firstUserMsg = messages.find((m) => m.role === "user");
    const topic = firstUserMsg
      ? firstUserMsg.content.length > 35
        ? firstUserMsg.content.substring(0, 35) + "..."
        : firstUserMsg.content
      : "Nova Dúvida";

    syncChatHistoryWithAPI({
      chatId: chatIdRef.current,
      email: userEmail,
      topic,
      messages,
      isFinished: isChatFinished,
    });

  }, [messages, isChatFinished, userEmail]);

  return { resetChatId };
}
import { useEffect } from "react";
import { Message } from "@/types/chat";
import { syncChatHistoryWithAPI } from "@/lib/services/historico";

interface UseChatSyncProps {
  chatId: string;
  messages: Message[];
  isChatFinished: boolean;
  userEmail?: string;
}

export function useChatSync({ chatId, messages, isChatFinished, userEmail }: UseChatSyncProps) {
  

  useEffect(() => {
    if (messages.length === 0 || !userEmail) return;

    const firstUserMsg = messages.find((m) => m.role === "user");
    const topic = firstUserMsg
      ? firstUserMsg.content.length > 35
        ? firstUserMsg.content.substring(0, 35) + "..."
        : firstUserMsg.content
      : "Nova Dúvida";

    syncChatHistoryWithAPI({
      chatId: chatId, 
      email: userEmail,
      topic,
      messages,
      isFinished: isChatFinished,
    });

  }, [chatId, messages, isChatFinished, userEmail]);
}
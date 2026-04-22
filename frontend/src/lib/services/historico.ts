import { Message } from "@/types/chat";
import { ChatHistoryData } from "@/types/chat";

interface SyncChatParams {
  chatId: string;
  email: string;
  topic: string;
  messages: Message[];
  isFinished: boolean;
}

export async function fetchAllHistory(): Promise<ChatHistoryData[]> {
  const response = await fetch("/api/historico");
  if (!response.ok) throw new Error("Falha ao buscar o histórico geral");
  return response.json();
}

export async function fetchStudentHistory(email: string): Promise<ChatHistoryData[]> {
  const response = await fetch(`/api/historico?email=${email}`);
  if (!response.ok) throw new Error("Falha ao buscar histórico do aluno");
  return response.json();
}

export async function syncChatHistoryWithAPI({ chatId, email, topic, messages, isFinished }: SyncChatParams) {
  try {
    await fetch("/api/historico", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chatId,
        alunoEmail: email,
        topic,
        messages,
        isFinished,
      }),
    });

   
    if (isFinished) {
      await fetch("/api/alunos", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          lastInteraction: new Date().toISOString()
        }),
      });
    }

    window.dispatchEvent(new Event("historyUpdated"));
    
  } catch (error) {
    console.error("Erro ao sincronizar histórico na API:", error);
  }
}
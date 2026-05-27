import { Message } from "@/types/chat";
import { ChatHistoryData } from "@/types/chat";

interface SyncChatParams {
  chatId: string;
  email: string;
  topic: string;
  messages: Message[];
  isFinished: boolean;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const getAuthHeader = () : Record<string, string> => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    return token ? { "Authorization": `Bearer ${token}` } : {};
  }
  return {};
};

export async function fetchAllHistory(): Promise<ChatHistoryData[]> {
  const response = await fetch(`${API_URL}/api/chat/historico`, {
    method: "GET",
    headers: {
      ...getAuthHeader(),
    },
  });
  
  if (!response.ok) throw new Error("Falha ao buscar o histórico geral");
  return response.json();
}

export async function fetchStudentHistory(email: string): Promise<ChatHistoryData[]> {
  const safeEmail = encodeURIComponent(email);
  
  console.log("=== DEBUG HISTÓRICO ===");
  console.log("Chave 'token' no localStorage:", localStorage.getItem("token"));
  
  const headers = getAuthHeader();
  console.log("Headers gerados para a requisição:", headers);

  const response = await fetch(`${API_URL}/api/chat/historico?email=${safeEmail}`, {
    method: "GET",
    headers: {
      ...getAuthHeader(),
    },
  });

  if (!response.ok) {
    console.error(`Erro na API de Histórico: Status ${response.status}`);
    throw new Error("Falha ao buscar histórico do aluno");
  }

  return response.json();
}

export async function syncChatHistoryWithAPI({ chatId, email, topic, messages, isFinished }: SyncChatParams) {
  try {
    await fetch(`${API_URL}/api/chat/historico`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
      body: JSON.stringify({
        chatId,
        alunoEmail: email,
        topic,
        messages,
        isFinished,
      }),
    });

    window.dispatchEvent(new Event("historyUpdated"));
    
  } catch (error) {
    console.error("Erro ao sincronizar histórico na API:", error);
  }
}
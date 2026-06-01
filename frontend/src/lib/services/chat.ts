const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface ChatRequest {
  aluno_id: string;
  sessao_chat_id: string;
  texto_duvida: string;
  imagem_base64?: string | null;
}

export interface ChatResponse {
  mensagem_ia: string;
  numero_interacao: number;
  limite_atingido: boolean;
  exibir_questao_fixacao: boolean;
}

const getAuthHeader = (): Record<string, string> => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      return { "Authorization": `Bearer ${token}` };
    }
  }
  return {};
};

export async function enviarMensagem(data: ChatRequest): Promise<ChatResponse> {
  const res = await fetch(`${API_URL}/api/chat/enviar`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Erro ao enviar mensagem para o backend.");
  }

  return res.json();
}

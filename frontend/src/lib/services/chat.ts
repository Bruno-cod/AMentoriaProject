const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface ChatRequest {
  alunoId: string;      
  chatId: string;        
  textoDuvida: string;   
  imagemBase64?: string | null; 
}

export interface ChatResponse {
  mensagem_ia: string;
  numero_interacao: number;
  limite_atingido: boolean;
  exibir_questao_fixacao: boolean;
}

export async function enviarMensagem(data: ChatRequest): Promise<ChatResponse> {
  const res = await fetch(`${API_URL}/api/chat/enviar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Erro ao enviar mensagem para o backend.");
  }

  return res.json();
}

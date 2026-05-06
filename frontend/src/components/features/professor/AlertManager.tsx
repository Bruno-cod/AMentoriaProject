"use client";

import { useState, useEffect } from "react";
import { fetchAllHistory } from "@/lib/services/historico";
import { AlertReport } from "./AlertReport";
import { AlertItem } from "@/types/alertas";
import { useOrdenacao } from "@/lib/ordenecao";

interface AlertManagerProps {
  searchTerm: string;
}

export function AlertManager({ searchTerm }: AlertManagerProps) {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadAlerts() {
      setIsLoading(true);
      try {
        const data = await fetchAllHistory();

        const flattenedAlerts: AlertItem[] = data.flatMap((chat) =>
          chat.messages
            .filter((msg) => msg.rating === "down")
            .map((msg) => ({
              chatId: chat.id,
              topic: chat.topic,
              studentEmail: chat.alunoEmail || "Email não informado",
              iaResponse: msg.content,
              studentFeedback: msg.feedbackText,
              date: chat.date,
            })),
        );

        setAlerts(flattenedAlerts);
      } catch (error) {
        console.error("Erro ao buscar alertas:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadAlerts();
  }, []);

  const alertasFiltrados = alerts.filter((alert) => {
    const term = searchTerm.toLowerCase();
    return (
      alert.studentEmail.toLowerCase().includes(term) ||
      alert.topic.toLowerCase().includes(term) ||
      (alert.studentFeedback &&
        alert.studentFeedback.toLowerCase().includes(term)) ||
      alert.iaResponse.toLowerCase().includes(term)
    );
  });

  const { dadosOrdenados } = useOrdenacao<AlertItem>(
    alertasFiltrados, 
    "recente",       
    "date",         
    "studentEmail",   
    "chatId"          
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32 text-neutras-400">
        <div className="flex items-center gap-2 text-sm">
          <div className="w-4 h-4 border-2 border-neutras-500 border-t-erro rounded-full animate-spin" />
          Carregando alertas...
        </div>
      </div>
    );
  }

  return <AlertReport alerts={dadosOrdenados} searchTerm={searchTerm} />;
}

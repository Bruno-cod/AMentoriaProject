"use client";

import { ChatHistoryData } from "@/types/chat";
import { formatLongDate } from "@/lib/formatters";

interface AlertReportProps {
  allHistoryData: ChatHistoryData[];
}

export function AlertReport({ allHistoryData }: AlertReportProps) {
  const alerts = allHistoryData.flatMap((chat) =>
    chat.messages
      .filter((msg) => msg.rating === "down")
      .map((msg) => ({
        chatId: chat.id,
        topic: chat.topic,
        studentEmail: chat.alunoEmail,
        iaResponse: msg.content,
        studentFeedback: msg.feedbackText,
        date: chat.date,
      })),
  );

  return (
    <div className="bg-neutras-900 border border-neutras-800 rounded-2xl overflow-hidden shadow-sm">
      <div className="p-5 border-b border-neutras-800">
        <h2 className="text-white font-semibold text-lg">Relatório de Alertas</h2>
        <p className="text-sm text-neutras-400 mt-1">Feedbacks negativos que precisam de atenção.</p>
      </div>

      <div className="p-6 space-y-4">
        {alerts.length === 0 ? (
          <p className="text-neutras-400 italic text-sm text-center py-8">
            Nenhum feedback negativo pendente. Bom trabalho! 
          </p>
        ) : (
          <div className="grid gap-4">
            {alerts.map((alert, index) => (
              <div
                key={index}
                className="bg-neutras-800/20 border border-erro/20 rounded-xl p-4"
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[12px] font-bold text-erro uppercase tracking-widest bg-erro/10 px-2 py-1 rounded-md">
                    Alerta de Qualidade
                  </span>
                  <span className="text-[12px] text-neutras-400">
                    {formatLongDate(alert.date)}
                  </span>
                </div>

                <div className="mb-4">
                  <p className="text-[12px] text-neutras-500 uppercase font-bold mb-1">
                    Resposta da IA ({alert.topic}):
                  </p>
                  <p className="text-[14px] leading-[20px] text-neutras-300 italic border-l-2 border-neutras-700 pl-3">
                    "{alert.iaResponse.substring(0, 150)}
                    {alert.iaResponse.length > 150 ? "..." : ""}"
                  </p>
                </div>

                <div className="bg-erro/10 border-l-2 border-erro p-3 rounded-r-lg">
                  <p className="text-[12px] text-erro uppercase font-bold mb-1">
                    Feedback do Aluno ({alert.studentEmail}):
                  </p>
                  <p className="text-[14px] leading-[20px] text-neutras-50 font-medium">
                    {alert.studentFeedback ||
                      "O aluno negativou a resposta, mas não deixou um comentário detalhado."}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    
  );
}

"use client";

import { useEffect, useState } from "react";
import { HistoryModal} from "@/components/features/chat/HistoryModal";
import { StudentHistoryCard } from "./StudentHistoryCard";
import { ChatHistoryData } from "@/types/chat";
import { X } from "@phosphor-icons/react";
import { fetchStudentHistory } from "@/lib/services/historico";

interface StudentHistoryListModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentName: string;
  studentEmail: string;
}

export function StudentHistoryListModal({
  isOpen,
  onClose,
  studentName,
  studentEmail,
}: StudentHistoryListModalProps) {
  const [history, setHistory] = useState<ChatHistoryData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedChat, setSelectedChat] = useState<ChatHistoryData | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  useEffect(() => {
    const loadHistory = async () => {
      if (!isOpen || !studentEmail) return;
      
      setIsLoading(true);
      try {
        const data = await fetchStudentHistory(studentEmail);
        setHistory(data);
      } catch (err) {
        console.error("Erro ao buscar histórico do aluno:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadHistory();
  }, [isOpen, studentEmail]);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  const handleOpenDetails = (chat: ChatHistoryData) => {
    setSelectedChat(chat);
    setIsDetailsOpen(true);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 font-poppins">
        <div className="w-full max-w-5xl flex flex-col bg-neutras-900 border border-neutras-800 rounded-2xl shadow-2xl overflow-hidden h-[85vh]">
          
          <div className="flex items-center justify-between p-6 border-b border-neutras-800 bg-neutras-900">
            <div>
              <h2 className="text-[24px] leading-[32px] font-bold text-neutras-50">
                Histórico de Dúvidas
              </h2>
              <p className="text-[14px] text-neutras-400 mt-1">
                Aluno(a): <strong className="text-primaria">{studentName}</strong>
              </p>
            </div>
            
            <button 
              onClick={onClose}
              className="p-2 text-neutras-400 hover:text-neutras-50 hover:bg-neutras-800 rounded-lg transition-colors cursor-pointer"
              title="Fechar"
            >
              <X size={24} weight="bold" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 bg-neutras-950">
            {isLoading ? (
              <div className="flex justify-center items-center h-full text-neutras-400">
                Carregando histórico...
              </div>
            ) : history.length === 0 ? (
              <div className="flex justify-center items-center h-full text-neutras-500 italic">
                Este aluno ainda não possui dúvidas registradas.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {history.map((chat) => (
                  <StudentHistoryCard 
                    key={chat.id} 
                    chat={chat} 
                    onOpenDetails={handleOpenDetails} 
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <HistoryModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        chatData={selectedChat}
      />
    </>
  );
}
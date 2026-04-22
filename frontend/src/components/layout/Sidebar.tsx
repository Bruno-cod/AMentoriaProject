"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "@/components/ui/Button"; 
import { HistoryModal } from "@/components/features/chat/HistoryModal";
import { ChatHistoryData } from "@/types/chat";
import { UploadSimple, FileText, Plus, SignOut } from "@phosphor-icons/react";
import { KnowledgeFile } from "@/types/files";
import { fetchKnowledgeFiles } from "@/lib/services/files";
import { fetchStudentHistory } from "@/lib/services/historico";
import { formatShortDate } from "@/lib/formatters";

interface SidebarProps {
  onUploadClick?: () => void;
  onManageFilesClick?: () => void;
}

export const Sidebar = ({ onUploadClick, onManageFilesClick }: SidebarProps) => {
  const [history, setHistory] = useState<ChatHistoryData[]>([]);
  const [recentFiles, setRecentFiles] = useState<KnowledgeFile[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState<ChatHistoryData | null>(null);

  const { user, logout } = useAuthStore();
  const router = useRouter();

  const loadHistory = async () => {
    if (!user?.email) return; 

    try {
      const data = await fetchStudentHistory(user.email);
      setHistory(data);
    } catch (err) {
      console.error("Erro ao carregar histórico da API:", err);
    }
  };

  const loadRecentFiles = async () => {
    try {
      const data = await fetchKnowledgeFiles();
      setRecentFiles(data.slice(-5).reverse());
    } catch (err) {
      console.error("Erro ao carregar arquivos recentes:", err);
    }
  };

  useEffect(() => {
    setIsMounted(true);
    loadHistory();
    
    if (user?.role === "professor") {
      loadRecentFiles();
    }

    window.addEventListener("historyUpdated", loadHistory);
    return () => window.removeEventListener("historyUpdated", loadHistory);
  }, [user?.role, user?.email]);

  const handleNewChat = () => {
    window.location.reload();
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handleOpenHistory = (chat: ChatHistoryData) => {
    setSelectedChat(chat);
    setIsModalOpen(true);
  };

  return (
    <>
      <aside className="w-[325px] h-screen bg-neutras-900 border-r border-neutras-800 flex flex-col p-6 z-20">
        
        {user?.role === "professor" ? (
          <>
            <div className="flex flex-col gap-4 mt-2 mb-8">
              <Button
                variant="ghost"
                onClick={onUploadClick}
                className="w-full !px-4 !py-3 !rounded-xl bg-primaria/10 !text-primaria hover:bg-primaria/20 border border-primaria/20 !text-sm font-semibold flex items-center justify-center gap-3 transition-all cursor-pointer"
              >
                <UploadSimple size={20} weight="bold" />
                Novo Upload
              </Button>
            </div>

            <div className="flex-1 flex flex-col gap-4 overflow-y-auto pr-2">
              <h4 className="text-neutras-500 text-[11px] font-bold uppercase tracking-[2px] ml-2">
                Arquivos Recentes
              </h4>

              <nav className="flex flex-col gap-2">
                {recentFiles.length === 0 ? (
                  <span className="text-neutras-500 text-xs px-2 italic">
                    Nenhum arquivo recente.
                  </span>
                ) : (
                  recentFiles.map((file) => (
                    <div
                      key={file.id}
                      onClick={onManageFilesClick}
                      className="group flex flex-col p-3 rounded-2xl hover:bg-neutras-800 transition-colors cursor-pointer border border-transparent hover:border-neutras-700"
                    >
                      <div className="flex items-center gap-2">
                        <FileText size={16} className="text-neutras-400 shrink-0" weight="fill" />
                        <span
                          className="text-neutras-50 text-sm font-medium truncate"
                          title={file.name}
                        >
                          {file.name}
                        </span>
                      </div>
                      <span className="text-neutras-500 text-[10px] ml-6 mt-1">
                        {formatShortDate(file.uploadDate)}
                      </span>
                    </div>
                  ))
                )}
              </nav>
            </div>
          </>
        ) : (
          <>
            <Button
              variant="ghost"
              onClick={handleNewChat}
              className="w-full !py-3 !px-4 !rounded-2xl border border-primaria/50 !text-neutras-50 !text-base font-medium flex items-center justify-center gap-2 hover:bg-primaria/10 transition-all mb-8 group cursor-pointer"
            >
              <span className="group-hover:rotate-90 transition-transform flex items-center justify-center">
                <Plus size={20} weight="bold" />
              </span>
              Nova Dúvida
            </Button>

            <div className="flex-1 flex flex-col gap-4 overflow-y-auto pr-2">
              <h4 className="text-neutras-500 text-[11px] font-bold uppercase tracking-[2px] ml-2">
                Histórico Recente
              </h4>

              <nav className="flex flex-col gap-2">
                {history.length === 0 ? (
                  <span className="text-neutras-500 text-xs px-2 italic">
                    Nenhuma dúvida recente.
                  </span>
                ) : (
                  history.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleOpenHistory(item)} 
                      className="group flex flex-col p-3 rounded-2xl hover:bg-neutras-800 transition-colors cursor-pointer border border-transparent hover:border-neutras-700"
                    >
                      <span
                        className="text-neutras-50 text-sm font-medium truncate"
                        title={item.topic}
                      >
                        {item.topic}
                      </span>
                      <span className="text-neutras-500 text-[10px] mt-1">
                        {formatShortDate(item.date)}
                      </span>
                    </div>
                  ))
                )}
              </nav>
            </div>
          </>
        )}

        <div className="mt-6 pt-6 border-t border-neutras-800 flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 shrink-0 rounded-full bg-[linear-gradient(176deg,var(--primary-600),var(--secondary-400))] flex items-center justify-center text-neutras-50 font-bold uppercase">
              {isMounted ? user?.name?.charAt(0) || "V" : ""}
            </div>

            <div className="flex flex-col overflow-hidden">
              <span
                className="text-neutras-50 text-sm font-bold truncate"
                title={user?.name}
              >
                {isMounted && user ? user.name : "Visitante"}
              </span>

              <span className="text-sucesso text-xs flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-sucesso rounded-full animate-pulse" />
                {isMounted && user?.role === "professor" ? "Monitor" : "Online"}
              </span>
            </div>
          </div>

          {isMounted && user && (
            <button
              onClick={handleLogout}
              className="p-2 text-neutras-500 hover:text-secundaria hover:bg-neutras-800 rounded-lg transition-all shrink-0 cursor-pointer"
              title="Sair da conta"
            >
              <SignOut size={20} weight="bold" />
            </button>
          )}
        </div>
      </aside>

      <HistoryModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        chatData={selectedChat} 
      />
    </>
  );
};
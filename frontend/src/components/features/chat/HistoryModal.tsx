"use client";

import { useEffect } from "react";
import { MessageBubble } from "@/components/features/chat/MessageBubble";
import { ChatHistoryData } from "@/types/chat";
import { X, LockKey, Eye } from "@phosphor-icons/react";
import { formatLongDate } from "@/lib/formatters";

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  chatData: ChatHistoryData | null;
}

export function HistoryModal({ isOpen, onClose, chatData }: HistoryModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !chatData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 font-poppins">
      <div className="w-full max-w-3xl flex flex-col bg-neutras-900 border border-neutras-800 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 max-h-[85vh]">
        <div className="flex items-center justify-between p-4 px-6 border-b border-neutras-800 bg-neutras-900/80 backdrop-blur-md">
          <div>
            <h2 className="text-body-large font-bold text-neutras-50 line-clamp-1">
              {chatData.topic}
            </h2>
            <span className="text-caption text-neutras-400">
              {formatLongDate(chatData.date)}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-neutras-400 hover:text-neutras-50 hover:bg-neutras-800 rounded-lg transition-colors cursor-pointer"
            title="Fechar"
            aria-label="Fechar histórico"
          >
            <X size={24} weight="bold" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8 scroll-smooth bg-[radial-gradient(circle_at_top_right,var(--primary-900),transparent_40%)]">
          <div className="max-w-[800px] mx-auto w-full">
            {chatData.messages.map((msg, index) => (
              <div
                key={msg.id || `msg-history-${index}`}
                className="pointer-events-none select-text"
              >
                <MessageBubble
                  {...msg}
                  activeTipIndex={-1}
                  onActionClick={() => {}}
                  onRate={() => {}}
                  onSubmitFeedback={() => {}}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="p-3 bg-neutras-900 border-t border-neutras-800 text-center">
          <span className="text-caption font-medium text-neutras-400 flex items-center justify-center gap-2">
            {chatData.isFinished ? (
              <>
                <LockKey size={14} weight="bold" /> Dúvida finalizada
              </>
            ) : (
              <>
                <Eye size={14} weight="bold" /> Modo de visualização de
                histórico
              </>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}

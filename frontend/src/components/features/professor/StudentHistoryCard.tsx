"use client";

import { Button } from "@/components/ui/Button";
import { ChatHistoryData } from "@/types/chat";
import { formatLongDate } from "@/lib/formatters";

interface StudentHistoryCardProps {
  chat: ChatHistoryData;
  onOpenDetails: (chat: ChatHistoryData) => void;
}

export function StudentHistoryCard({ chat, onOpenDetails }: StudentHistoryCardProps) {
  return (
    <div className="bg-neutras-900 border border-neutras-800 rounded-xl overflow-hidden flex flex-col hover:border-neutras-700 transition-colors shadow-sm">
      
      
      <div className="p-5 flex-1 flex flex-col gap-4">
        <h3 
          className="text-[16px] leading-[24px] font-semibold text-neutras-50 line-clamp-2" 
          title={chat.topic}
        >
          {chat.topic}
        </h3>
        
        <div className="flex flex-col gap-2 mt-auto pt-2 border-t border-neutras-800/50">
          <div className="flex justify-between items-center">
            <span className="text-[12px] font-semibold text-neutras-500 uppercase tracking-wider">
              DATA:
            </span>
            <span className="text-[14px] text-neutras-300">
              {formatLongDate(chat.date)}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-[12px] font-semibold text-neutras-500 uppercase tracking-wider">
              Status:
            </span>
            <span className={`text-[14px] font-medium ${chat.isFinished ? "text-sucesso" : "text-aviso"}`}>
              {chat.isFinished ? "Resolvido" : "Com dificuldade"}
            </span>
          </div>
        </div>
      </div>

      <div className="p-4 bg-neutras-800/30 border-t border-neutras-800">
        <Button 
          variant="outline" 
          onClick={() => onOpenDetails(chat)}
          className="w-full !py-2 !rounded-lg border-secundaria text-white hover:bg-neutras-800 hover:text-white transition-all cursor-pointer"
        >
          Ver detalhes
        </Button>
      </div>
      
    </div>
  );
}
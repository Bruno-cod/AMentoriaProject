"use client";

import React, { useState } from "react";
import { ImageIcon, Microphone, File } from "@phosphor-icons/react";

interface MenuContentProps {
  onSelect: (type: string) => void;
}

export const MenuContent = ({ onSelect }: MenuContentProps) => {
  const [comingSoon, setComingSoon] = useState<string | null>(null);

  const handleComingSoon = (type: string) => {
    setComingSoon(type);
    setTimeout(() => {
      setComingSoon(null);
    }, 2000);
  };

  return (
    <div className="absolute bottom-full mb-4 left-0 flex flex-col w-[235px] p-2 rounded-3xl bg-[linear-gradient(176deg,var(--primary-600)_19%,var(--secondary-400)_100%)] shadow-xl animate-in fade-in slide-in-from-bottom-2 duration-200 z-50">
      <div className="flex items-center gap-1 w-full text-white">
        
        <button 
          onClick={() => onSelect("imagem")}
          className="flex flex-col items-center justify-center gap-1.5 p-2 flex-1 rounded-2xl hover:bg-white/20 transition-colors cursor-pointer group"
        >
          <div className="w-8 h-8 flex items-center justify-center bg-white/10 rounded-full group-hover:scale-110 transition-transform">
              <ImageIcon size={20} weight="bold" />
          </div>
          <span className="text-caption font-medium">Imagem</span>
        </button>

        <button 
          onClick={() => handleComingSoon("audio")}
          className="flex flex-col items-center justify-center gap-1.5 p-2 flex-1 rounded-2xl hover:bg-white/20 transition-colors cursor-pointer group"
        >
          <div className={`w-8 h-8 flex items-center justify-center rounded-full transition-all ${comingSoon === "audio" ? "bg-secundaria text-white" : "bg-white/10 group-hover:scale-110"}`}>
              <Microphone size={20} weight="bold" />
          </div>
          <span className={`text-[10px] font-medium text-center leading-tight ${comingSoon === "audio" ? "text-secundaria-200 font-bold" : "text-white"}`}>
            {comingSoon === "audio" ? "Em breve" : "Áudio"}
          </span>
        </button>

        <button
          onClick={() => handleComingSoon("arquivo")}
          className="flex flex-col items-center justify-center gap-1.5 p-2 flex-1 rounded-2xl hover:bg-white/20 transition-colors cursor-pointer group"
        >
          <div className={`w-8 h-8 flex items-center justify-center rounded-full transition-all ${comingSoon === "arquivo" ? "bg-secundaria text-white" : "bg-white/10 group-hover:scale-110"}`}>
              <File size={20} weight="bold" />
          </div>
          <span className={`text-[10px] font-medium text-center leading-tight ${comingSoon === "arquivo" ? "text-secundaria-200 font-bold" : "text-white"}`}>
            {comingSoon === "arquivo" ? "Em breve" : "Arquivo"}
          </span>
        </button>

      </div>
    </div>
  );
};
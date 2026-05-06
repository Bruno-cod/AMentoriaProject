"use client";

import React, { useState, useEffect } from "react";
import { ImageIcon, Microphone, File, X } from "@phosphor-icons/react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface MenuContentProps {
  onSelect: (type: string) => void;
  onClose?: () => void;
}

export const MenuContent = ({ onSelect, onClose }: MenuContentProps) => {
  const [comingSoon, setComingSoon] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleComingSoon = (type: string) => {
    setComingSoon(type);
    setTimeout(() => setComingSoon(null), 2000);
  };

  const items = (
    <div className="flex w-full items-center gap-1 text-white">
      <Button variant="menuItem" size="none" onClick={() => onSelect("imagem")} className="group flex-1">
        <div className="flex h-10 w-10 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-white/10 transition-transform group-hover:scale-110">
          <ImageIcon size={20} weight="bold" />
        </div>
        <span className="text-caption font-medium">Imagem</span>
      </Button>

      <Button variant="menuItem" size="none" onClick={() => handleComingSoon("audio")} className="group flex-1">
        <div className={cn("flex h-10 w-10 sm:h-8 sm:w-8 items-center justify-center rounded-full transition-all", comingSoon === "audio" ? "bg-secundaria text-white" : "bg-white/10 group-hover:scale-110")}>
          <Microphone size={20} weight="bold" />
        </div>
        <span className={cn("text-[10px] text-center font-medium leading-tight", comingSoon === "audio" ? "font-bold text-secundaria-200" : "text-white")}>
          {comingSoon === "audio" ? "Em breve" : "Áudio"}
        </span>
      </Button>

      <Button variant="menuItem" size="none" onClick={() => handleComingSoon("arquivo")} className="group flex-1">
        <div className={cn("flex h-10 w-10 sm:h-8 sm:w-8 items-center justify-center rounded-full transition-all", comingSoon === "arquivo" ? "bg-secundaria text-white" : "bg-white/10 group-hover:scale-110")}>
          <File size={20} weight="bold" />
        </div>
        <span className={cn("text-[10px] text-center font-medium leading-tight", comingSoon === "arquivo" ? "font-bold text-secundaria-200" : "text-white")}>
          {comingSoon === "arquivo" ? "Em breve" : "Arquivo"}
        </span>
      </Button>
    </div>
  );

  if (isMobile) {
    return (
      <>
        <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px]" onClick={onClose} />
        <div className="fixed bottom-0 left-0 right-0 z-50 flex flex-col rounded-t-3xl p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] bg-[linear-gradient(176deg,var(--primary-600)_19%,var(--secondary-400)_100%)] shadow-[0_-8px_30px_rgba(0,0,0,0.2)] animate-in slide-in-from-bottom duration-300">
          <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-white/30" />
          <div className="flex items-center justify-between mb-4">
            <span className="text-white font-semibold text-sm">Anexar</span>
            <button onClick={onClose} className="text-white/60 hover:text-white transition-colors p-1 min-w-[44px] min-h-[44px] flex items-center justify-end">
              <X size={18} weight="bold" />
            </button>
          </div>
          {items}
        </div>
      </>
    );
  }

  return (
    <div className={cn("absolute bottom-full left-0 z-50 mb-4", "flex w-[235px] flex-col rounded-3xl p-2 shadow-xl", "bg-[linear-gradient(176deg,var(--primary-600)_19%,var(--secondary-400)_100%)]", "animate-in fade-in slide-in-from-bottom-2 duration-200")}>
      {items}
    </div>
  );
};
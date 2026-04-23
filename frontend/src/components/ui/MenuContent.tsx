"use client";

import React, { useState } from "react";
import { ImageIcon, Microphone, File } from "@phosphor-icons/react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

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
    <div className={cn(
      "absolute bottom-full left-0 z-50 mb-4",
      "flex w-[235px] flex-col rounded-3xl p-2 shadow-xl",
      "bg-[linear-gradient(176deg,var(--primary-600)_19%,var(--secondary-400)_100%)]",
      "animate-in fade-in slide-in-from-bottom-2 duration-200"
    )}>
      <div className="flex w-full items-center gap-1 text-white">
        

        <Button 
          variant="menuItem"
          size="none"
          onClick={() => onSelect("imagem")}
          className="group flex-1"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition-transform group-hover:scale-110">
              <ImageIcon size={20} weight="bold" />
          </div>
          <span className="text-caption font-medium">Imagem</span>
        </Button>

  
        <Button 
          variant="menuItem"
          size="none"
          onClick={() => handleComingSoon("audio")}
          className="group flex-1"
        >
          <div className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full transition-all",
            comingSoon === "audio" ? "bg-secundaria text-white" : "bg-white/10 group-hover:scale-110"
          )}>
              <Microphone size={20} weight="bold" />
          </div>
          <span className={cn(
            "text-[10px] text-center font-medium leading-tight",
            comingSoon === "audio" ? "font-bold text-secundaria-200" : "text-white"
          )}>
            {comingSoon === "audio" ? "Em breve" : "Áudio"}
          </span>
        </Button>

       
        <Button
          variant="menuItem"
          size="none"
          onClick={() => handleComingSoon("arquivo")}
          className="group flex-1"
        >
          <div className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full transition-all",
            comingSoon === "arquivo" ? "bg-secundaria text-white" : "bg-white/10 group-hover:scale-110"
          )}>
              <File size={20} weight="bold" />
          </div>
          <span className={cn(
            "text-[10px] text-center font-medium leading-tight",
            comingSoon === "arquivo" ? "font-bold text-secundaria-200" : "text-white"
          )}>
            {comingSoon === "arquivo" ? "Em breve" : "Arquivo"}
          </span>
        </Button>

      </div>
    </div>
  );
};
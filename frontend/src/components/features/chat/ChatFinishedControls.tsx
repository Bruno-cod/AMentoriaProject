"use client";

import React from "react";

interface ChatFinishedControlsProps {
  onNewChat: () => void;
}

export function ChatFinishedControls({ onNewChat }: ChatFinishedControlsProps) {
  return (
    <div className="w-full flex flex-col gap-3 animate-in fade-in zoom-in duration-300">
      <div className="w-full p-4 bg-neutras-800 border border-neutras-700 rounded-2xl text-neutras-400 text-center text-body-small font-medium italic shadow-inner">
        <span className="mr-2" aria-hidden="true">🔒</span>
        Esta dúvida foi finalizada. Para uma nova questão, inicie outro chat.
      </div>
      
      <button
        onClick={onNewChat}
        className="w-full py-3 bg-primaria text-neutras-50 font-semibold text-body-small rounded-xl hover:opacity-90 transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-primaria/10"
      >
        <span aria-hidden="true">✨</span>
        Iniciar Nova Dúvida
      </button>
    </div>
  );
}
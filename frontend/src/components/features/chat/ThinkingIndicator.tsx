"use client";

import React from "react";

export function ThinkingIndicator() {
  return (
    <div className="flex justify-start animate-in fade-in slide-in-from-left-2 duration-300 mb-6">
      <div className="bg-neutras-800 text-neutras-400 px-6 py-3 rounded-2xl border border-neutras-700 rounded-tl-none text-body-small font-medium flex items-center gap-3 shadow-sm">
        <div className="flex gap-1">
          <span className="w-1.5 h-1.5 bg-secundaria rounded-full animate-bounce [animation-delay:-0.3s]" />
          <span className="w-1.5 h-1.5 bg-secundaria rounded-full animate-bounce [animation-delay:-0.15s]" />
          <span className="w-1.5 h-1.5 bg-secundaria rounded-full animate-bounce" />
        </div>
        <span className="animate-pulse">AmentorIA está analisando...</span>
      </div>
    </div>
  );
}
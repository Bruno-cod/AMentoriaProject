"use client";

import { useEffect, useState } from "react";
import { X, ArrowsLeftRight, PaperPlaneRight } from "@phosphor-icons/react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface ImagePreviewProps {
  image: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export function ImagePreview({ image, onCancel, onConfirm }: ImagePreviewProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const actions = (
    <div className="flex gap-2 mt-3">
      <Button variant="outline" size="none" onClick={onCancel} className="flex flex-1 items-center justify-center gap-2 rounded-lg py-3 sm:py-2 min-h-[44px] border-neutras-200 text-sm font-bold text-neutras-600 hover:bg-neutras-50 hover:text-neutras-900">
        <ArrowsLeftRight size={16} weight="bold" />
        Trocar
      </Button>
      <Button size="none" onClick={onConfirm} className="flex flex-1 items-center justify-center gap-2 rounded-lg py-3 sm:py-2 min-h-[44px] bg-secundaria text-sm font-bold text-white shadow-md hover:scale-100 hover:bg-secundaria hover:opacity-90">
        <PaperPlaneRight size={16} weight="bold" />
        Enviar
      </Button>
    </div>
  );

  if (isMobile) {
    return (
      <>
        <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px]" onClick={onCancel} />
        <div className="fixed bottom-0 left-0 right-0 z-50 flex flex-col rounded-t-3xl p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] bg-white shadow-[0_-8px_30px_rgba(0,0,0,0.15)] animate-in slide-in-from-bottom duration-300">
          <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-neutras-200" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-neutras-900 font-semibold text-sm">Pré-visualização</span>
            <button onClick={onCancel} className="text-neutras-400 hover:text-neutras-700 transition-colors p-1 min-w-[44px] min-h-[44px] flex items-center justify-end">
              <X size={18} weight="bold" />
            </button>
          </div>
          <div className="relative h-[220px] w-full overflow-hidden rounded-2xl bg-neutras-100">
            <img src={image} alt="Preview" className="h-full w-full object-cover" />
          </div>
          {actions}
        </div>
      </>
    );
  }

  return (
    <div className={cn("absolute bottom-full left-0 z-50 mb-4 flex w-[290px] flex-col", "rounded-[20px] border-2 border-neutras-200 bg-white p-3 shadow-2xl", "animate-in fade-in zoom-in duration-200")}>
      <div className="relative mb-3 h-[180px] w-full overflow-hidden rounded-xl bg-neutras-100">
        <img src={image} alt="Preview" className="h-full w-full object-cover" />
        <Button size="icon" onClick={onCancel} className="absolute right-2 top-2 h-8 w-8 rounded-full bg-black/50 text-white hover:bg-black/70 hover:text-white">
          <X size={16} weight="bold" />
        </Button>
      </div>
      {actions}
    </div>
  );
}
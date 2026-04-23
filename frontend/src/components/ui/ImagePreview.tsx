"use client";

import { X, ArrowsLeftRight, PaperPlaneRight } from "@phosphor-icons/react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface ImagePreviewProps {
  image: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export function ImagePreview({
  image,
  onCancel,
  onConfirm,
}: ImagePreviewProps) {
  return (
    <div className={cn(
      "absolute bottom-full left-0 z-50 mb-4 flex w-[290px] flex-col",
      "rounded-[20px] border-2 border-neutras-200 bg-white p-3 shadow-2xl",
      "animate-in fade-in zoom-in duration-200"
    )}>
      
      <div className="relative mb-3 h-[180px] w-full overflow-hidden rounded-xl bg-neutras-100">
        <img src={image} alt="Preview" className="h-full w-full object-cover" />
        
        <Button
          size="icon" 
          onClick={onCancel}
          className={cn(
            "absolute right-2 top-2 h-8 w-8 rounded-full",
            "bg-black/50 text-white hover:bg-black/70 hover:text-white"
          )}
        >
          <X size={16} weight="bold" />
        </Button>
      </div>

      <div className="flex gap-2">
   
        <Button
          variant="outline"
          size="none"
          onClick={onCancel}
          className={cn(
            "flex flex-1 items-center justify-center gap-2 rounded-lg py-2",
            "border-neutras-200 text-sm font-bold text-neutras-600 hover:bg-neutras-50 hover:text-neutras-900"
          )}
        >
          <ArrowsLeftRight size={16} weight="bold" />
          Trocar
        </Button>

        <Button
          size="none"
          onClick={onConfirm}
          className={cn(
            "flex flex-1 items-center justify-center gap-2 rounded-lg py-2",
            "bg-secundaria text-sm font-bold text-white shadow-md transition-opacity hover:scale-100 hover:bg-secundaria hover:opacity-90"
          )}
        >
          <PaperPlaneRight size={16} weight="bold" />
          Enviar
        </Button>
      </div>
    </div>
  );
}
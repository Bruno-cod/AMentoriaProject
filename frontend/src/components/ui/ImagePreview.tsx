"use client";

import { X, ArrowsLeftRight, PaperPlaneRight } from "@phosphor-icons/react";

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
    <div className="absolute bottom-full mb-4 left-0 flex flex-col w-[290px] p-3 rounded-[20px] bg-white border-2 border-neutras-200 shadow-2xl animate-in fade-in zoom-in duration-200 z-50">
      <div className="relative w-full h-[180px] rounded-xl overflow-hidden bg-neutras-100 mb-3">
        <img src={image} alt="Preview" className="w-full h-full object-cover" />
        <button
          onClick={onCancel}
          className="absolute top-2 right-2 bg-black/50 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors cursor-pointer"
        >
          <X size={16} weight="bold" />
        </button>
      </div>

      <div className="flex gap-2">
        <button
          onClick={onCancel}
          className="flex-1 py-2 flex items-center justify-center gap-2 rounded-lg border-2 border-neutras-200 text-neutras-600 font-bold hover:bg-neutras-50 transition-colors text-sm cursor-pointer"
        >
          <ArrowsLeftRight size={16} weight="bold" />
          Trocar
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 py-2 flex items-center justify-center gap-2 rounded-lg bg-secundaria text-white font-bold hover:opacity-90 transition-opacity text-sm shadow-md cursor-pointer"
        >
          <PaperPlaneRight size={16} weight="bold" />
          Enviar
        </button>
      </div>
    </div>
  );
}

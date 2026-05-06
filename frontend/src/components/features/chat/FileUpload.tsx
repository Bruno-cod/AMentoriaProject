"use client";

import React, { useRef, useEffect, useState } from "react";
import { UploadSimple, X } from "@phosphor-icons/react";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  onClose: () => void;
}

export const FileUpload = ({ onFileSelect, onClose }: FileUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) onFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent) => e.preventDefault();

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) onFileSelect(file);
  };

  const uploadArea = (
    <>
      <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/png, image/jpeg" className="hidden" />
      <div onClick={() => fileInputRef.current?.click()} onDragOver={handleDragOver} onDrop={handleDrop} className="flex flex-col items-center gap-3 cursor-pointer w-full py-2">
        <div className="bg-white/20 p-4 rounded-full text-white transition-transform active:scale-95">
          <UploadSimple size={28} weight="bold" />
        </div>
        <div className="text-center select-none">
          <p className="font-medium text-white text-sm">
            <span className="underline decoration-white/50">{isMobile ? "Toque" : "Arraste"}</span>
            <span className="text-white/90"> ou </span>
            <span className="underline decoration-white/50">Clique</span>
            <span className="text-white/90"> aqui para enviar</span>
          </p>
          <p className="text-[10px] text-white/60 mt-1">.png, .jpg até 5MB</p>
        </div>
      </div>
    </>
  );

  if (isMobile) {
    return (
      <>
        <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px]" onClick={onClose} />
        <div className="fixed bottom-0 left-0 right-0 z-50 flex flex-col rounded-t-3xl p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] bg-[linear-gradient(176deg,var(--primary-600)_19%,var(--secondary-400)_100%)] shadow-[0_-8px_30px_rgba(0,0,0,0.2)] animate-in slide-in-from-bottom duration-300">
          <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-white/30" />
          <div className="flex items-center justify-between mb-4">
            <span className="text-white font-semibold text-sm">Enviar imagem</span>
            <button onClick={onClose} className="text-white/60 hover:text-white transition-colors p-1 min-w-[44px] min-h-[44px] flex items-center justify-end">
              <X size={18} weight="bold" />
            </button>
          </div>
          {uploadArea}
        </div>
      </>
    );
  }

  return (
    <div className="absolute bottom-full mb-4 left-0 flex flex-col w-[290px] h-[152px] items-center justify-center gap-3 px-3 py-2 rounded-[20px] bg-[linear-gradient(176deg,var(--primary-600)_19%,var(--secondary-400)_100%)] shadow-2xl animate-in fade-in zoom-in duration-200 z-50 group font-poppins">
      <button type="button" onClick={onClose} className="absolute top-3 right-3 text-white/60 hover:text-white transition-colors cursor-pointer">
        <X size={16} weight="bold" />
      </button>
      {uploadArea}
    </div>
  );
};
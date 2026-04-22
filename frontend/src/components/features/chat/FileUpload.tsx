"use client";

import React, { useRef } from "react";
import { UploadSimple, X } from "@phosphor-icons/react";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  onClose: () => void;
}

export const FileUpload = ({ onFileSelect, onClose }: FileUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      onFileSelect(file);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="absolute bottom-full mb-4 left-0 flex flex-col w-[290px] h-[152px] items-center justify-center gap-3 px-3 py-2 rounded-[20px] bg-[linear-gradient(176deg,var(--primary-600)_19%,var(--secondary-400)_100%)] shadow-2xl animate-in fade-in zoom-in duration-200 z-50 group font-poppins"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-3 right-3 text-white/60 hover:text-white transition-colors cursor-pointer"
      >
        <X size={16} weight="bold" />
      </button>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/png, image/jpeg"
        className="hidden"
      />

      <div
        onClick={() => fileInputRef.current?.click()}
        className="flex flex-col items-center gap-2 cursor-pointer w-full"
      >
        <div className="bg-white/20 p-3 rounded-full group-hover:scale-110 transition-transform duration-200 text-white">
          <UploadSimple size={24} weight="bold" />
        </div>

        <div className="text-center select-none">
          <p className="font-medium text-white text-caption">
            <span className="underline decoration-white/50">Arraste</span>
            <span className="text-white/90"> ou </span>
            <span className="underline decoration-white/50">Clique</span>
            <span className="text-white/90"> aqui para enviar</span>
          </p>

          <p className="text-[10px] text-white/60 mt-1">.png, .jpg até 5MB</p>
        </div>
      </div>
    </div>
  );
};

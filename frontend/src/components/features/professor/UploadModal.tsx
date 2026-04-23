"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { X, FileText, CloudArrowUp } from "@phosphor-icons/react";
import { formatFileSize } from "@/lib/formatters";
import { uploadKnowledgeFile } from "@/lib/services/files"; 

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function UploadModal({ isOpen, onClose, onSuccess }: UploadModalProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    
    setIsUploading(true);
    
    try {
      const success = await uploadKnowledgeFile(selectedFile);

      if (success) {
        setSelectedFile(null);
        if (onSuccess) onSuccess(); 
      } else {
        alert("Ocorreu um erro ao enviar o arquivo.");
      }
    } catch (error) {
      console.error("Erro no upload:", error);
      alert("Erro de conexão.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-neutras-900/70 backdrop-blur-sm px-4">
      <div className="bg-neutras-900 border border-neutras-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl animate-in zoom-in-95 duration-200">
        
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-h4 font-bold text-neutras-50">Base de Conhecimento</h2>
            <p className="text-caption text-neutras-400 mt-1">
              Envie PDFs, slides ou documentos para treinar a IA.
            </p>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-neutras-800 text-neutras-400 hover:text-white hover:bg-neutras-700 transition-colors"
          >
            <X size={16} weight="bold" />
          </button>
        </div>

        <div 
          className={`relative w-full h-48 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center transition-all duration-300 ${
            dragActive 
              ? "border-primaria bg-primaria-900/20" 
              : "border-neutras-700 bg-neutras-800 hover:border-neutras-500"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input 
            ref={inputRef}
            type="file" 
            className="hidden" 
            accept=".pdf,.doc,.docx,.ppt,.pptx"
            onChange={handleChange}
          />
          
          {selectedFile ? (
            <div className="text-center animate-in fade-in zoom-in duration-300">
              <div className="w-12 h-12 bg-secundaria/20 text-secundaria rounded-full flex items-center justify-center mx-auto mb-3">
                <FileText size={28} weight="duotone" />
              </div>
              <p className="text-sm font-semibold text-neutras-50">{selectedFile.name}</p>
              
              <p className="text-xs text-neutras-400 mt-1">
                {formatFileSize(selectedFile.size)}
              </p>
              
              <button 
                onClick={() => setSelectedFile(null)}
                className="mt-3 text-xs text-erro hover:underline"
              >
                Remover arquivo
              </button>
            </div>
          ) : (
            <div className="text-center px-4">
              <div className="w-12 h-12 bg-neutras-700 text-neutras-300 rounded-full flex items-center justify-center mx-auto mb-3">
                <CloudArrowUp size={28} weight="duotone" />
              </div>
              <p className="text-sm font-medium text-neutras-300">
                Arraste seu arquivo aqui ou
              </p>
              <button 
                onClick={() => inputRef.current?.click()}
                className="text-sm font-bold text-primaria hover:text-primaria-400 transition-colors mt-1"
              >
                clique para buscar no computador
              </button>
            </div>
          )}
        </div>

        <div className="flex gap-3 mt-8">
          <Button 
            variant="ghost"
            onClick={onClose}
            disabled={isUploading}
            className="flex-1 py-3 text-sm font-semibold bg-neutras-800 hover:bg-neutras-700 text-neutras-300 disabled:opacity-50"
          >
            Cancelar
          </Button>
          
          <Button 
            variant="default"
            onClick={handleUpload}
            disabled={!selectedFile || isUploading}
            className="flex-1 py-3 flex items-center justify-center gap-2 !text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUploading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Enviando...
              </>
            ) : (
              "Treinar IA"
            )}
          </Button>
        </div>

      </div>
    </div>
  );
}
"use client";

import { useRouter } from "next/navigation";
import { LockKey } from "@phosphor-icons/react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const router = useRouter();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-neutras-900/60 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="w-16 h-16 bg-secundaria/20 text-secundaria rounded-full flex items-center justify-center mx-auto mb-4">
          <LockKey size={32} weight="bold" />
        </div>
        <h3 className="text-h4 font-bold text-neutras-900 mb-2">
          Acesso Restrito
        </h3>

        <p className="text-neutras-600 text-body-small mb-6">
          Você precisa estar logado para enviar mensagens, enviar imagens e
          começar a estudar.
        </p>
        
        <div className="flex flex-col gap-3">
          <button
            onClick={() => router.push("/login")}
            className="w-full py-3 bg-primaria text-neutras-50 font-bold rounded-xl hover:bg-primaria/80 transition-all active:scale-95 cursor-pointer"
          >
            Fazer Login
          </button>
          
          <button
            onClick={onClose}
            className="w-full py-3 text-neutras-500 font-semibold hover:text-neutras-900 transition-colors cursor-pointer"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
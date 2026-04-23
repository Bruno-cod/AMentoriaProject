"use client";

import { useRouter } from "next/navigation";
import { useChatStore, fileToBase64 } from "@/store/useChatStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { SuggestionChip } from "@/components/ui/SuggestionChip";
import { Footer } from "@/components/layout/Footer";
import { ChatInput } from "@/components/ui/ChatInput";
import { MenuContent } from "@/components/ui/MenuContent";
import { FileUpload } from "@/components/features/chat/FileUpload";
import { ImagePreview } from "@/components/ui/ImagePreview";
import { AuthModal } from "@/components/features/auth/AuthModal"; 
import { HOME_SUGGESTIONS } from "@/mocks/homeSuggestions"; 

export default function Page() {
  const [searchValue, setSearchValue] = useState("");
  const [activeMenu, setActiveMenu] = useState<"none" | "options" | "upload" | "preview">("none");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [currentFile, setCurrentFile] = useState<File | null>(null);

  const { isLogged, user } = useAuthStore();
  const [isMounted, setIsMounted] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const setInitialImage = useChatStore((state) => state.setInitialImage);
  const setInitialMessage = useChatStore((state) => state.setInitialMessage);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const navigateToDashboard = () => {
    router.push(user?.role === "professor" ? "/Professor" : "/Aluno");
  };

  const checkAuthAndExecute = (action: () => void) => {
    if (!isLogged) {
      setShowAuthModal(true);
      return;
    }
    action();
  };

  const handleMenuAction = (type: string) => {
    if (type === "imagem") {
      setActiveMenu("upload");
    } else {
      setActiveMenu("none");
    }
  };

  const handleFileUpload = (file: File) => {
    setCurrentFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setActiveMenu("preview");
  };

  const cancelPreview = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setActiveMenu("upload");
  };

  const confirmUpload = async () => {
    checkAuthAndExecute(async () => {
      if (!currentFile) return;
      
      try {
        const base64 = await fileToBase64(currentFile);
        setInitialImage(base64);

        if (searchValue.trim()) setInitialMessage(searchValue);

        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
        setCurrentFile(null);
        setActiveMenu("none");

        navigateToDashboard(); 
      } catch (error) {
        console.error("Erro ao processar imagem:", error);
      }
    });
  };

  const handleStartChat = () => {
    checkAuthAndExecute(() => {
      if (searchValue.trim()) {
        setInitialMessage(searchValue);
        navigateToDashboard(); 
      }
    });
  };

  const handleSuggestionClick = (label: string) => {
    checkAuthAndExecute(() => {
      setInitialMessage(label);
      navigateToDashboard(); 
    });
  };

  return (
    <div className="min-h-screen w-full relative overflow-x-hidden font-poppins bg-secundaria text-neutras-900 antialiased before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_50%_50%,var(--primary-500)_0%,transparent_70%)] before:opacity-100">
      <Navbar />

      <main className="relative flex flex-col items-center justify-center min-h-screen max-w-[584px] mx-auto p-4 z-10">
        <div className="mb-8 text-center sm:text-left w-full">
          <h1 className="text-h1 text-neutras-900 mb-2">
            Bora passar no ENEM, <br />
            <span className="text-primaria">
              {isMounted && user ? user.name.split(" ")[0] : "Visitante"}
            </span>
            .
          </h1>
        </div>

        <div className="relative w-full">
          {activeMenu === "options" && (
            <div className="absolute bottom-full left-0 mb-4 z-[999]">
              <MenuContent onSelect={handleMenuAction} />
            </div>
          )}

          {activeMenu === "upload" && (
            <div className="absolute bottom-full left-0 mb-4 z-[999]">
              <FileUpload
                onFileSelect={handleFileUpload}
                onClose={() => setActiveMenu("none")}
              />
            </div>
          )}

          {activeMenu === "preview" && previewUrl && (
            <ImagePreview
              image={previewUrl}
              onCancel={cancelPreview}
              onConfirm={confirmUpload}
            />
          )}

          <ChatInput
            showButton={true}
            onMenuClick={() => {
              checkAuthAndExecute(() => {
                if (activeMenu === "preview") return;
                setActiveMenu(activeMenu === "none" ? "options" : "none");
              });
            }}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onSend={handleStartChat}
            placeholder="O que vamos estudar hoje?"
          />
        </div>

        <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-6">
          {HOME_SUGGESTIONS.map((item) => (
            <SuggestionChip
              key={item.label}
              label={item.label}
              active={item.active}
              onClick={() => handleSuggestionClick(item.label)}
            />
          ))}
        </div>
      </main>

      <Footer />

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </div>
  );
}
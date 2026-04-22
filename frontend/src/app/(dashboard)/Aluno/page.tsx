"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useChat } from "@/hooks/useChat";
import { MessageBubble } from "@/components/features/chat/MessageBubble";
import { ChatInput } from "@/components/ui/ChatInput";
import { Sidebar } from "@/components/layout/Sidebar";
import { Footer } from "@/components/layout/Footer";
import { MenuContent } from "@/components/ui/MenuContent";
import { FileUpload } from "@/components/features/chat/FileUpload";
import { ImagePreview } from "@/components/ui/ImagePreview";
import { useChatStore } from "@/store/useChatStore";
import { Navbar } from "@/components/layout/Navbar";

export default function ChatPage() {
  const router = useRouter();

  const {
    messages,
    isAiThinking,
    sendMessage,
    handleTipFlow,
    tipCount,
    handleAnswer,
    handleQuestionFlow,
    handleExplanationFlow,
    isChatFinished,
    handleRateMessage,
    handleFeedbackTextSubmit,
    clearChat, 
  } = useChat();

  const [inputValue, setInputValue] = useState("");
  const { initialMessage, initialImage, clearInitialData } = useChatStore();
  const [activeMenu, setActiveMenu] = useState<"none" | "options" | "upload" | "preview">("none");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const initialized = useRef(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isAiThinking]);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  useEffect(() => {
    if ((!initialMessage && !initialImage) || initialized.current) return;
    initialized.current = true;
    sendMessage(initialMessage, initialImage);
    clearInitialData();
  }, [initialMessage, initialImage, sendMessage, clearInitialData]);

  const handleAction = (value: string) => {
    const actionType = value.split("|")[0];
    switch (actionType) {
      case "flow_tips":
      case "action_next_tip":
        handleTipFlow();
        break;
      case "flow_questions":
        handleQuestionFlow();
        break;
      case "answer_correct":
      case "answer_wrong":
        handleAnswer(value);
        break;
      case "flow_explanation":
        handleExplanationFlow();
        break;
      default:
        sendMessage(value);
        break;
    }
  };

  const handleFileSelected = useCallback((file: File) => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setActiveMenu("preview");
  }, [previewUrl]);

  const handleSend = () => {
    if (!inputValue.trim() && !previewUrl) return;
    sendMessage(inputValue, previewUrl);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setInputValue("");
    setPreviewUrl(null);
    setActiveMenu("none");
  };

  const handleNovaConversa = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    clearChat?.();
    router.push("/Aluno");
  };

  return (
    <div className="flex h-screen bg-neutras-900 overflow-hidden font-poppins text-neutras-50">
      <Sidebar />

      <main className="flex-1 flex flex-col relative border-l border-neutras-800">

        <Navbar />

        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 scroll-smooth bg-[radial-gradient(circle_at_top_right,var(--primary-900),transparent_40%)]"
        >
          <div className="max-w-[800px] mx-auto w-full">
            {messages.map((msg) => (
              <MessageBubble
                key={msg.id}
                {...msg}
                activeTipIndex={tipCount}
                rating={msg.rating}
                onRate={(rating) => handleRateMessage(msg.id, rating)}
                onSubmitFeedback={(text) => handleFeedbackTextSubmit(msg.id, text)}
                onActionClick={handleAction}
              />
            ))}

            {isAiThinking && (
              <div className="flex justify-start animate-pulse mb-6">
                <div className="bg-neutras-800 text-neutras-400 px-6 py-3 rounded-2xl border border-neutras-700 rounded-tl-none text-body-small font-medium flex items-center gap-2">
                  <div className="w-2 h-2 bg-secundaria rounded-full animate-bounce" />
                  AmentorIA está analisando...
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="w-full px-6 md:px-10 pb-4 pt-2 bg-neutras-900 border-t border-neutras-800/50">
          <div className="max-w-[800px] mx-auto relative group">


            {activeMenu === "options" && (
              <div className="absolute bottom-full left-0 mb-4 animate-in slide-in-from-bottom-2 duration-200">
                <MenuContent
                  onSelect={(type) =>
                    type === "imagem" ? setActiveMenu("upload") : setActiveMenu("none")
                  }
                />
              </div>
            )}

            {activeMenu === "upload" && (
              <div className="absolute bottom-full left-0 mb-4 w-full">
                <FileUpload
                  onFileSelect={handleFileSelected}
                  onClose={() => setActiveMenu("none")}
                />
              </div>
            )}

            {activeMenu === "preview" && previewUrl && (
              <div className="absolute bottom-full left-0 mb-4 w-full">
                <ImagePreview
                  image={previewUrl}
                  onCancel={() => {
                    if (previewUrl) URL.revokeObjectURL(previewUrl); 
                    setPreviewUrl(null);
                    setActiveMenu("upload");
                  }}
                  onConfirm={handleSend}
                />
              </div>
            )}

            {!isChatFinished ? (
              <ChatInput
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onSend={handleSend}
                showButton={true}
                placeholder="Tire sua dúvida..."
                onMenuClick={() =>
                  setActiveMenu(activeMenu === "none" ? "options" : "none")
                }
              />
            ) : (
              <div className="w-full flex flex-col gap-3 animate-in fade-in zoom-in duration-300">
                <div className="w-full p-4 bg-neutras-800 border border-neutras-700 rounded-2xl text-neutras-400 text-center text-body-small font-medium italic">
                  <span aria-hidden="true">🔒</span>
                  {" "}Esta dúvida foi finalizada. Para uma nova questão, inicie outro chat.
                </div>
                <button
                  onClick={handleNovaConversa}
                  className="w-full py-3 bg-primaria text-neutras-50 font-semibold text-body-small rounded-xl hover:opacity-90 transition-all active:scale-[0.98]"
                >
                  <span aria-hidden="true">✨</span>
                  {" "}Iniciar Nova Dúvida
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="pb-2 bg-neutras-900 shrink-0">
          <Footer />
        </div>

      </main>
    </div>
  );
}
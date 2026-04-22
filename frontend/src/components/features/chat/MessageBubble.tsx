"use client";

import { MessageFeedback } from "./MessageFeedback";
import ReactMarkdown from "react-markdown"; 

interface MessageBubbleProps {
  role: "user" | "ai";
  content: string;
  image?: string | null;
  tipLevel?: number;
  suggestions?: { label: string; value: string }[];
  activeTipIndex?: number;
  rating?: "up" | "down";
  onRate?: (rating: "up" | "down") => void;
  onSubmitFeedback?: (text: string) => void; 
  onActionClick?: (value: string) => void;
}

export function MessageBubble({
  role,
  content,
  image,
  suggestions,
  tipLevel,
  activeTipIndex,
  rating,
  onRate,
  onSubmitFeedback, 
  onActionClick,
}: MessageBubbleProps) {
  const isAI = role === "ai";

  const showSuggestions =
    suggestions &&
    suggestions.length > 0 &&
    (!tipLevel || tipLevel === activeTipIndex);

  return (
    <div
      className={`flex w-full mb-6 animate-in fade-in slide-in-from-bottom-3 duration-300 ${isAI ? "justify-start" : "justify-end"}`}
    >
      <div className="flex flex-col max-w-[75%] gap-2">
        <div
          className={`px-5 py-3 rounded-3xl shadow-md ${
            isAI
              ? "bg-neutras-800 border border-neutras-700 text-neutras-100 rounded-tl-none"
              : "bg-[linear-gradient(176deg,var(--primary-600)_19%,var(--primary-700)_21%,var(--secondary-500)_100%)] text-white rounded-tr-none"
          }`}
        >
          {image && (
            <div className="mb-3 mt-1 relative overflow-hidden rounded-xl border border-white/20 shadow-sm">
              <img
                src={image}
                alt="Anexo"
                className="max-w-full h-auto object-contain max-h-[300px] w-full"
              />
            </div>
          )}

          {content && (
            <div className="text-[15px] leading-relaxed font-medium tracking-tight prose prose-invert max-w-none [&>p]:mb-2 last:[&>p]:mb-0 [&>strong]:font-bold">
              <ReactMarkdown>
                {content}
                </ReactMarkdown>
            </div>
          )}
        </div>

        {isAI && showSuggestions && (
          <div className="flex flex-wrap gap-2 mt-2 ml-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={`${suggestion.value}-${index}`}
                onClick={() => onActionClick?.(suggestion.value)}
                className="px-4 py-1.5 bg-neutras-800 border border-primaria/30 text-neutras-100 text-[12px] font-bold rounded-full hover:bg-primaria/20 hover:border-primaria transition-all cursor-pointer shadow-sm active:scale-95 whitespace-nowrap"
              >
                {suggestion.label}
              </button>
            ))}
          </div>
        )}

        {isAI && (
          <div className={`flex items-center px-2 mt-1 ${tipLevel ? "justify-between" : "justify-end"}`}>
            {tipLevel && (
              <span className="text-[10px] font-bold text-primaria uppercase tracking-widest">
                Dica #{tipLevel}
              </span>
            )}

            
            <MessageFeedback 
              rating={rating}
              onRate={onRate}
              onSubmitFeedback={onSubmitFeedback}
            />
          </div>
        )}
      </div>
    </div>
  );
}
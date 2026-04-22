"use client";

import { useState } from "react";
import { ThumbsUp, ThumbsDown } from "@phosphor-icons/react";

interface MessageFeedbackProps {
  rating?: "up" | "down";
  onRate?: (rating: "up" | "down") => void;
  onSubmitFeedback?: (text: string) => void;
}

export function MessageFeedback({
  rating,
  onRate,
  onSubmitFeedback,
}: MessageFeedbackProps) {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [tempFeedback, setTempFeedback] = useState("");

  const handleRateDown = () => {
    onRate?.("down");
    setIsFeedbackOpen(true);
  };

  const submit = () => {
    onSubmitFeedback?.(tempFeedback);
    setIsFeedbackOpen(false);
    setTempFeedback("");
  };

  return (
    <div className="relative flex items-center font-poppins">
      <div className="flex gap-3">
        <button
          onClick={() => {
            onRate?.("up");
            setIsFeedbackOpen(false);
          }}
          className={`text-body-small transition-all cursor-pointer hover:scale-125 ${
            rating === "up"
              ? "scale-125 drop-shadow-md text-primaria"
              : "text-neutras-400 hover:text-neutras-100"
          }`}
          title="Resposta útil"
        >
          <ThumbsUp size={16} weight={rating === "up" ? "fill" : "regular"} />
        </button>
        <button
          onClick={handleRateDown}
          className={`text-body-small transition-all cursor-pointer hover:scale-125 ${
            rating === "down"
              ? "scale-125 drop-shadow-md text-erro"
              : "text-neutras-400 hover:text-neutras-100"
          }`}
          title="Resposta imprecisa ou confusa"
        >
          <ThumbsDown
            size={16}
            weight={rating === "down" ? "fill" : "regular"}
          />
        </button>
      </div>

      {isFeedbackOpen && (
        <div className="absolute bottom-full right-0 mb-2 w-64 bg-neutras-800 border border-neutras-700 rounded-xl shadow-2xl p-3 z-50 animate-in zoom-in-95 duration-200">
          <p className="text-caption text-neutras-300 mb-2 font-medium">
            Como podemos melhorar essa resposta?
          </p>
          <textarea
            value={tempFeedback}
            onChange={(e) => setTempFeedback(e.target.value)}
            className="w-full h-20 bg-neutras-900 border border-neutras-700 rounded-lg p-2 text-caption text-neutras-100 focus:border-primaria outline-none resize-none transition-colors"
            placeholder="Ex: A explicação ficou muito longa..."
          />
          <div className="flex justify-end gap-3 mt-2">
            <button
              onClick={() => setIsFeedbackOpen(false)}
              className="text-caption text-neutras-400 hover:text-neutras-100 transition-colors cursor-pointer font-medium"
            >
              Cancelar
            </button>
            <button
              onClick={submit}
              className="px-3 py-1.5 bg-primaria hover:bg-primaria/80 text-neutras-50 text-caption font-bold rounded-md transition-colors cursor-pointer"
            >
              Enviar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

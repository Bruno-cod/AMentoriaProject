"use client";

import { useRef, useEffect } from "react";
import { Paperclip } from "@phosphor-icons/react";
import { Button } from "./Button";

interface InputProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  showButton?: boolean;
  icon?: React.ReactNode;
  onMenuClick?: () => void;
  onSend?: () => void;
}

export function ChatInput({ 
  showButton = false, 
  icon, 
  onMenuClick, 
  value,
  onSend, 
  className, 
  ...props 
}: InputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      const nextHeight = textarea.scrollHeight;
      textarea.style.height = nextHeight > 200 ? "200px" : `${nextHeight}px`;
    }
  }, [value]);

  return (
    <div className={`w-full relative flex items-start p-5 bg-white rounded-lg border-2 border-neutras-200 shadow-[0px_4px_15px_-3px_rgba(107,33,168,0.3)] transition-all focus-within:border-primaria/50 min-h-[72px] z-10 ${className}`}>
      
      {showButton && (
        <Button
          type="button"
          onClick={(e) => {
                e.stopPropagation(); 
                onMenuClick?.();
            }}
          className="absolute left-5 top-5 bg-secundaria p-2 rounded-lg text-white font-bold flex items-center justify-center hover:scale-110 active:scale-95 transition-transform cursor-pointer z-20"
        >
         {icon || <Paperclip size={20} weight="bold" color="currentColor" />}
        </Button>
      )}

      <textarea
        {...props}
        ref={textareaRef}
        value={value}
        rows={1}
        className={`w-full bg-transparent outline-none text-body-large text-neutras-900 placeholder:text-neutras-400 text-center resize-none overflow-y-auto scrollbar-thin scrollbar-thumb-neutras-300 transition-[height] duration-100 ease-out ${
          showButton ? "px-14" : "px-4"
        }`}
        style={{ 
          minHeight: "24px", 
          lineHeight: "32px", 
          marginTop: "4px"    
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onSend?.(); 
          }
        }}
      />
    </div>
  );
}
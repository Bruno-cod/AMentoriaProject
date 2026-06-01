"use client";

import { MessageFeedback } from "./MessageFeedback";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MessageBubbleProps {
  role: "user" | "ai";
  content: string;
  image?: string | null;
  tipLevel?: number;
  suggestions?: { label: string; value: string }[];
  activeTipIndex?: number;
  rating?: "up" | "down";
  isReadOnly?: boolean;
  isHistoryView?: boolean;
  onRate?: (rating: "up" | "down") => void;
  onSubmitFeedback?: (text: string) => void;
  onActionClick?: (value: string) => void;
}

const EducationalMarkdown = ({ content }: { content: string }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        
        h3: ({ children }) => (
          <h3 className="text-base font-bold text-primaria mt-5 mb-2 flex items-center gap-2">
            {children}
          </h3>
        ),
        h4: ({ children }) => (
          <h4 className="text-sm font-bold text-secundaria mt-4 mb-2">
            {children}
          </h4>
        ),
        h2: ({ children }) => (
          <h2 className="text-lg font-extrabold text-primaria mt-6 mb-4 border-b border-neutras-600 pb-2">
            {children}
          </h2>
        ),
        
        table: ({ children }) => (
          <div className="overflow-x-auto my-5">
            <table className="min-w-full border-collapse border border-neutras-600 text-sm">
              {children}
            </table>
          </div>
        ),
        th: ({ children }) => (
          <th className="border border-neutras-600 bg-neutras-700/50 px-3 py-2 font-bold text-primaria text-left">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="border border-neutras-600 px-3 py-2 text-neutras-100">
            {children}
          </td>
        ),
        
        a: ({ children, href }) => (
          <a href={href} target="_blank" rel="noopener noreferrer" className="text-secundaria underline hover:text-primaria transition-colors">
            {children}
          </a>
        ),
        
      
        p: ({ children }) => (
          <p className="mt-3 mb-3 leading-relaxed text-neutras-100">
            {children}
          </p>
        ),
        
       
        ul: ({ children }) => (
          <ul className="mt-3 mb-4 ml-5 space-y-2 list-disc">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="mt-3 mb-4 ml-5 space-y-2 list-decimal">
            {children}
          </ol>
        ),
        li: ({ children }) => (
          <li className="text-neutras-100 pl-1">
            {children}
          </li>
        ),
        
        strong: ({ children }) => (
          <strong className="font-bold text-primaria">
            {children}
          </strong>
        ),
        
        em: ({ children }) => (
          <em className="italic text-secundaria">
            {children}
          </em>
        ),
       
        blockquote: ({ children }) => (
          <blockquote className="my-4 pl-4 py-3 border-l-4 border-primaria bg-primaria/5 rounded text-neutras-100 italic">
            {children}
          </blockquote>
        ),
        hr: () => (
          <hr className="my-5 border-neutras-600" />
        ),
       
        code: ({ children, className }) => {
          const isCodeBlock = className?.includes('language-');
          
          return isCodeBlock ? (
            <code className="block bg-neutras-700 text-neutras-100 p-4 rounded-lg overflow-x-auto text-sm font-mono my-4">
              {children}
            </code>
          ) : (
            <code className="bg-neutras-700 text-secundaria px-2 py-0.5 rounded text-sm font-mono mx-1">
              {children}
            </code>
          );
        }
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

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
  isReadOnly,
  isHistoryView,
}: MessageBubbleProps) {
  const isAI = role === "ai";

  const showSuggestions =
    suggestions &&
    suggestions.length > 0 &&
    (!tipLevel || tipLevel === activeTipIndex);

  return (
    <div
      className={`flex w-full mb-6 animate-in fade-in slide-in-from-bottom-3 duration-300 ${
        isAI ? "justify-start" : "justify-end"
      }`}
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

          {content && isAI ? (
            <div className="text-[15px] leading-relaxed tracking-tight max-w-none">
              <EducationalMarkdown content={content} />
            </div>
          ) : (
            <div className="text-[15px] leading-relaxed font-medium tracking-tight">
              {content}
            </div>
          )}
        </div>

        {isAI && showSuggestions && (
          <div className="flex flex-wrap gap-2 mt-2 ml-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={`${suggestion.value}-${index}`}
                onClick={() => onActionClick?.(suggestion.value)}
                disabled={isReadOnly}
                className="px-4 py-1.5 bg-neutras-800 border border-primaria/30 text-neutras-100 text-[12px] font-bold rounded-full hover:bg-primaria/20 hover:border-primaria transition-all cursor-pointer shadow-sm active:scale-95 whitespace-nowrap"
              >
                {suggestion.label}
              </button>
            ))}
          </div>
        )}

        {isAI && (
          <div
            className={`flex items-center px-2 mt-1 ${
              tipLevel ? "justify-between" : "justify-end"
            }`}
          >
            {tipLevel && (
              <span className="text-[10px] font-bold text-primaria uppercase tracking-widest">
                Dica #{tipLevel}
              </span>
            )}

            <MessageFeedback
              rating={rating}
              onRate={onRate}
              onSubmitFeedback={onSubmitFeedback}
              isReadOnly={isHistoryView}
            />
          </div>
        )}
      </div>
    </div>
  );
}
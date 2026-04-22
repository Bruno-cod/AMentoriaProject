"use client";

interface SuggestionChipProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export function SuggestionChip({ label, active, onClick }: SuggestionChipProps) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2 rounded-3xl transition-all text-body-default font-medium cursor-pointer border-2 ${
        active
          ? "bg-neutras-900 border-neutras-900 text-white shadow-md hover:bg-transparent"
          : "border-neutras-900 text-neutras-900 bg-transparent hover:bg-neutras-900 hover:text-white"
      }`}
    >
      {label}
    </button>
  );
}
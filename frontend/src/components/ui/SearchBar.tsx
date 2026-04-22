"use client";

import { MagnifyingGlass } from "@phosphor-icons/react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder = "Pesquisar..." }: SearchBarProps) {
  return (
    <div className="relative w-full md:w-64">
      <input 
        type="text" 
        placeholder={placeholder} 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-neutras-800 border border-neutras-700 text-white text-sm rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:border-primaria transition-colors placeholder:text-neutras-500"
      />
      <MagnifyingGlass 
        size={20} 
        weight="bold" 
        className="absolute left-3 top-2.5 text-neutras-500 pointer-events-none" 
      />
    </div>
  );
}
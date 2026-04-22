"use client";

import { SearchBar } from "../../ui/SearchBar";
import { UploadSimple } from "@phosphor-icons/react";


interface ActionBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onUploadClick?: () => void;
}

export function ActionBar({ searchTerm, onSearchChange, onUploadClick }: ActionBarProps) {
  return (
    <div className="flex items-center gap-4 w-full md:w-auto">
      
     
      <SearchBar 
        value={searchTerm} 
        onChange={onSearchChange} 
        placeholder="Pesquisar alunos..." 
      />

      
      <button 
        onClick={onUploadClick}
        className="bg-primaria/10 text-primaria hover:bg-primaria/20 border border-primaria/20 px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all whitespace-nowrap"
      >
        <UploadSimple size={16} weight="bold" />
        <span className="hidden sm:inline">Upload de Arquivos</span>
      </button>
    </div>
  );
}
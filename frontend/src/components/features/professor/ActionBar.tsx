"use client";

import { SearchBar } from "../../ui/SearchBar";
import { UploadSimple } from "@phosphor-icons/react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface ActionBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onUploadClick?: () => void;
}

export function ActionBar({ searchTerm, onSearchChange, onUploadClick }: ActionBarProps) {
  return (
    <div className="flex w-full items-center gap-4 md:w-auto">
      
      <SearchBar 
        value={searchTerm} 
        onChange={onSearchChange} 
        placeholder="Pesquisar alunos..." 
      />

      <Button 
        variant="outline"
        size="none"
        onClick={onUploadClick}
        className={cn(
          "flex items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-semibold transition-all",
          "border-primaria/20 bg-primaria/10 text-primaria",
          "hover:border-primaria/30 hover:bg-primaria/20 hover:text-primaria"
        )}
      >
        <UploadSimple size={16} weight="bold" />
        <span className="hidden sm:inline">Upload de Arquivos</span>
      </Button>
      
    </div>
  );
}
"use client";

import { SearchBar } from "../../ui/SearchBar";
import { cn } from "@/lib/utils";

interface ActionBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onUploadClick?: () => void;
  hasFilter?: boolean;
  filterValue?: boolean;
  onFilterChange?: (value: boolean) => void;
  filterLabel?: string;
  isMobileLayout?: boolean;
}

export function ActionBar({ 
  searchTerm,
  onSearchChange,
  hasFilter = false,
  filterValue = false,
  onFilterChange,
  filterLabel = "Apenas não lidos",
isMobileLayout = false
 }: ActionBarProps) {

 return (
    
    <div className={cn("flex w-full gap-4", isMobileLayout ? "flex-col items-start" : "items-center md:w-auto")}>
      
      <div className="w-full">
        <SearchBar 
          value={searchTerm} 
          onChange={onSearchChange} 
          placeholder="Pesquisar..." 
        />
      </div>

      {hasFilter && onFilterChange && (
        <label className="flex items-center gap-3 cursor-pointer group whitespace-nowrap px-2">
          <span className="text-sm font-medium text-neutras-400 group-hover:text-neutras-300 transition-colors select-none">
            {filterLabel}
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={filterValue}
            onClick={() => onFilterChange(!filterValue)}
            className={cn(
              "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-primaria/50",
              filterValue ? "bg-primaria" : "bg-neutras-700"
            )}
          >
            <span
              className={cn(
                "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                filterValue ? "translate-x-6" : "translate-x-1"
              )}
            />
          </button>
        </label>
      )}
      
    </div>
  );
}
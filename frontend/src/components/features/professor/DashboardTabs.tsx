"use client";

import { TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { GraduationCap, Folder, WarningCircle, Icon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";


const TABS_CONFIG = [
  { value: "alunos", label: "Meus Alunos", icon: GraduationCap },
  { value: "arquivos", label: "Base de Conhecimento", icon: Folder },
  { value: "alertas", label: "Alertas de IA", icon: WarningCircle, isDanger: true },
] as const;

export function DashboardTabs() {
  return (
    <TabsList className="justify-start w-full bg-transparent border-b border-neutras-800 rounded-none h-auto p-0 gap-6">
      {TABS_CONFIG.map((tab) => (
        <TabsTrigger
          key={tab.value}
          value={tab.value}
          className={cn(
           
            "pb-3 rounded-none border-b-2 border-transparent bg-transparent px-0 text-body-small font-semibold transition-all",
            "text-neutras-500 hover:text-neutras-50",
            "data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-primaria data-[state=active]:border-primaria",
            
          )}
        >
          <tab.icon size={20} className="mr-2" weight="regular" />
          {tab.label}
        </TabsTrigger>
      ))}
    </TabsList>
  );
}
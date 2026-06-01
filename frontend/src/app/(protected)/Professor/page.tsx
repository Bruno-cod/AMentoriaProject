"use client";

import { useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/Tabs";
import { DashboardTabs } from "@/components/features/professor/DashboardTabs";
import { Sidebar } from "@/components/layout/Sidebar";
import { ActionBar } from "@/components/features/professor/ActionBar";
import { UploadModal } from "@/components/features/professor/UploadModal";
import { FileManager } from "@/components/features/professor/FileManager";
import { AlertManager } from "@/components/features/professor/AlertManager";
import { StudentsManager } from "@/components/features/professor/StudentsManager";

export default function ProfessorDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"alunos" | "arquivos" | "alertas">("alunos");
  const [refreshKey, setRefreshKey] = useState(0);
  const [mostrarNaoLidos, setMostrarNaoLidos] = useState(false);

  const handleUploadSuccess = () => {
    setRefreshKey((prev) => prev + 1);
    setIsModalOpen(false);
    setActiveTab("arquivos");
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value as "alunos" | "arquivos" | "alertas");
    setSearchTerm(""); 
  };

  const myActionBar = (isMobile: boolean) => (
    <ActionBar
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      hasFilter={activeTab === "alunos"}
      filterValue={activeTab === "alunos" ? mostrarNaoLidos : undefined}
      onFilterChange={activeTab === "alunos" ? setMostrarNaoLidos : undefined}
      filterLabel={activeTab === "alunos" ? "Apenas não lidos" : undefined}
      isMobileLayout={isMobile}
    />
  );

  return (
    <div className="flex w-full h-screen bg-neutras-900 font-poppins overflow-hidden">
      <Sidebar 
        onUploadClick={() => setIsModalOpen(true)}
        mobileActionBarSlot={myActionBar(true)} />

      <div className="flex-1 flex flex-col p-4 md:p-12 min-w-0">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
          <div>
            <h1 className="text-h2 text-neutras-50 font-bold">Painel do Monitor</h1>
            <p className="text-neutras-400 text-body-small mt-2">
              Acompanhe seus alunos e gerencie o material da IA.
            </p>
          </div>

          <div className="hidden md:block w-auto">
            {myActionBar(false)}
          </div>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className="flex-1 flex flex-col min-h-0"
        >
          <DashboardTabs />

          <div className="flex-1 min-h-0 overflow-auto pr-4 pb-4 scrollbar-thin scrollbar-thumb-neutras-700 scrollbar-track-transparent">
            
            <TabsContent value="alunos" className="m-0 focus-visible:ring-0 min-w-min">
              <StudentsManager 
                searchTerm={searchTerm} 
                mostrarNaoLidos={mostrarNaoLidos} 
              />
            </TabsContent>

            <TabsContent value="arquivos" className="m-0 focus-visible:ring-0 min-w-min">
              <FileManager refreshKey={refreshKey} searchTerm={searchTerm} />
            </TabsContent>

            <TabsContent value="alertas" className="m-0 focus-visible:ring-0 min-w-min">
              <AlertManager searchTerm={searchTerm} />
            </TabsContent>
            
          </div>
        </Tabs>
      </div>

      <UploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleUploadSuccess}
      />
    </div>
  );
}
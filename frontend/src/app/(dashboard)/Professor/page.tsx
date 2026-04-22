"use client";

import { useState, useEffect } from "react";
import { GraduationCap, Folder, WarningCircle } from "@phosphor-icons/react";

import { StudentsTable } from "@/components/features/professor/StudentsTable";
import { Sidebar } from "@/components/layout/Sidebar";
import { SearchBar } from "@/components/ui/SearchBar";
import { UploadModal } from "@/components/features/professor/UploadModal";
import { FileManager } from "@/components/features/professor/FileManager";
import { AlertReport } from "@/components/features/professor/AlertReport";
import { ChatHistoryData } from "@/types/chat";
import { Student } from "@/types/student";
import { fetchStudents } from "@/lib/services/alunos";
import { fetchAllHistory } from "@/lib/services/historico";

export default function ProfessorDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [activeTab, setActiveTab] = useState<"alunos" | "arquivos" | "alertas">(
    "alunos",
  );
  const [refreshKey, setRefreshKey] = useState(0);

  const [alunos, setAlunos] = useState<Student[]>([]);
  const [isLoadingAlunos, setIsLoadingAlunos] = useState(true);

  const [allHistory, setAllHistory] = useState<ChatHistoryData[]>([]);
  const [isLoadingAlerts, setIsLoadingAlerts] = useState(false);

  useEffect(() => {
    const loadAlunos = async () => {
      setIsLoadingAlunos(true);
      try {
        const data = await fetchStudents();
        setAlunos(data);
      } catch (error) {
        console.error("Erro ao buscar alunos:", error);
      } finally {
        setIsLoadingAlunos(false);
      }
    };

    loadAlunos();
  }, []);

  useEffect(() => {
    if (activeTab === "alertas") {
      setIsLoadingAlerts(true);
      fetchAllHistory()
        .then((data) => setAllHistory(data))
        .catch((err) => console.error("Erro ao buscar histórico geral:", err))
        .finally(() => setIsLoadingAlerts(false));
    }
  }, [activeTab]);

  const alunosFiltrados = alunos.filter(
    (aluno) =>
      aluno.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      aluno.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleUploadSuccess = () => {
    setRefreshKey((prev) => prev + 1);
    setIsModalOpen(false);
    setActiveTab("arquivos");
  };

  return (
    <div className="flex w-full h-screen bg-neutras-900 font-poppins overflow-hidden">
      <Sidebar onUploadClick={() => setIsModalOpen(true)} />

      <div className="flex-1 flex flex-col p-8 md:p-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
          <div>
            <h1 className="text-h2 text-neutras-50 font-bold">
              Painel do Monitor
            </h1>

            <p className="text-neutras-400 text-body-small mt-2">
              Acompanhe seus alunos e gerencie o material da IA.
            </p>
          </div>

          {activeTab === "alunos" && (
            <div className="w-full md:w-auto">
              <SearchBar
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder="Pesquisar alunos..."
              />
            </div>
          )}
        </div>

        <div className="flex gap-6 border-b border-neutras-800 mb-6">
          <button
            onClick={() => setActiveTab("alunos")}
            className={`pb-3 text-body-small font-semibold transition-colors border-b-2 flex items-center gap-2 ${
              activeTab === "alunos"
                ? "border-primaria text-primaria"
                : "border-transparent text-neutras-500 hover:text-neutras-50"
            }`}
          >
            <GraduationCap
              size={20}
              weight={activeTab === "alunos" ? "fill" : "regular"}
            />
            Meus Alunos
          </button>

          <button
            onClick={() => setActiveTab("arquivos")}
            className={`pb-3 text-body-small font-semibold transition-colors border-b-2 flex items-center gap-2 ${
              activeTab === "arquivos"
                ? "border-primaria text-primaria"
                : "border-transparent text-neutras-500 hover:text-neutras-50"
            }`}
          >
            <Folder
              size={20}
              weight={activeTab === "arquivos" ? "fill" : "regular"}
            />
            Base de Conhecimento
          </button>

          <button
            onClick={() => setActiveTab("alertas")}
            className={`pb-3 text-body-small font-semibold transition-colors border-b-2 flex items-center gap-2 ${
              activeTab === "alertas"
                ? "border-erro text-erro"
                : "border-transparent text-neutras-500 hover:text-neutras-50"
            }`}
          >
            <WarningCircle
              size={20}
              weight={activeTab === "alertas" ? "fill" : "regular"}
            />
            Alertas de IA
          </button>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto pr-4 pb-4 scrollbar-thin scrollbar-thumb-neutras-700 scrollbar-track-transparent">
          {activeTab === "alunos" &&
            (isLoadingAlunos ? (
              <div className="flex justify-center items-center h-32 text-neutras-400 text-body-small">
                Carregando lista de alunos...
              </div>
            ) : (
              <StudentsTable
                students={alunosFiltrados}
                searchTerm={searchTerm}
              />
            ))}

          {activeTab === "arquivos" && <FileManager refreshKey={refreshKey} />}

          {activeTab === "alertas" &&
            (isLoadingAlerts ? (
              <div className="flex justify-center items-center h-32 text-neutras-400 text-body-small">
                Carregando alertas...
              </div>
            ) : (
              <AlertReport allHistoryData={allHistory} />
            ))}
        </div>
      </div>

      <UploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleUploadSuccess}
      />
    </div>
  );
}

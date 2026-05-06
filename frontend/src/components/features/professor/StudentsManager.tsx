"use client";

import { useState, useEffect } from "react";
import { Student } from "@/types/student";
import { fetchStudents, updateStudentStatus } from "@/lib/services/alunos";
import { StudentsTable } from "@/components/features/professor/StudentsTable";

interface StudentsManagerProps {
  searchTerm: string;
  mostrarNaoLidos: boolean;
}

export function StudentsManager({ searchTerm, mostrarNaoLidos }: StudentsManagerProps) {
  const [alunos, setAlunos] = useState<Student[]>([]);
  const [isLoadingAlunos, setIsLoadingAlunos] = useState(true);

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

  const handleMarkAsRead = async (id: string | number) => {
    const alunoClicado = alunos.find(a => String(a.id) === String(id));
    if (!alunoClicado) return;

    setAlunos((prevAlunos) =>
      prevAlunos.map((aluno) =>
        String(aluno.id) === String(id) ? { ...aluno, visto: true } : aluno
      )
    );

    try {
      await updateStudentStatus(alunoClicado.email, true);
    } catch (error) {
      console.error("Erro ao salvar status de visto no banco:", error);
    }
  };

  const alunosFiltrados = alunos.filter((aluno) => {
    const matchBusca = 
      aluno.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      aluno.email.toLowerCase().includes(searchTerm.toLowerCase());
                         
    const matchFiltroNaoLido = mostrarNaoLidos ? !aluno.visto : true;

    return matchBusca && matchFiltroNaoLido;
  });

  if (isLoadingAlunos) {
    return (
      <div className="flex justify-center items-center h-32 text-neutras-400">
        <div className="flex items-center gap-2 text-sm">
          <div className="w-4 h-4 border-2 border-neutras-500 border-t-primaria rounded-full animate-spin" />
          Carregando alunos...
        </div>
      </div>
    );
  }

  return (
    <StudentsTable
      students={alunosFiltrados}
      searchTerm={searchTerm}
      onMarkAsRead={handleMarkAsRead}
      mostrarNaoLidos={mostrarNaoLidos}
    />
  );
}
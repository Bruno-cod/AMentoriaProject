"use client";

import { useState, useEffect } from "react";
import { Student } from "@/types/student";
import { fetchStudents, updateStudentStatus } from "@/lib/services/alunos";
import { StudentsTable } from "@/components/features/professor/StudentsTable";

interface StudentsManagerProps {
  searchTerm: string;
  mostrarNaoLidos: boolean;
}

// Skeleton de linha da tabela
const SkeletonRow = () => (
  <div className="flex items-center gap-4 px-4 py-3 border-b border-neutras-800 animate-pulse">
    <div className="w-8 h-8 bg-neutras-700 rounded-full shrink-0" />
    <div className="flex-1 flex flex-col gap-1.5">
      <div className="h-3.5 bg-neutras-700 rounded-full w-1/3" />
      <div className="h-2.5 bg-neutras-800 rounded-full w-1/2" />
    </div>
    <div className="h-6 w-16 bg-neutras-700 rounded-full" />
    <div className="h-6 w-20 bg-neutras-800 rounded-full" />
  </div>
);

const SkeletonTable = () => (
  <div className="flex flex-col rounded-2xl border border-neutras-800 overflow-hidden">
    {/* Header skeleton */}
    <div className="flex items-center gap-4 px-4 py-3 bg-neutras-800/50 border-b border-neutras-700">
      <div className="h-3 bg-neutras-700 rounded-full w-24" />
      <div className="h-3 bg-neutras-700 rounded-full w-16 ml-auto" />
      <div className="h-3 bg-neutras-700 rounded-full w-20" />
    </div>
    {/* Rows skeleton */}
    {[1, 2, 3, 4, 5].map((i) => (
      <SkeletonRow key={i} />
    ))}
  </div>
);

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
    return <SkeletonTable />;
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
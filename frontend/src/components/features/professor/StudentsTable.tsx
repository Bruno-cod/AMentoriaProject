"use client";

import { useState } from "react";
import { StudentHistoryListModal } from "@/components/features/professor/StudentHistoryListModal";
import { Student } from "@/types/student"; 
import { formatShortDate } from "@/lib/formatters"; 
import { Eye } from "@phosphor-icons/react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export interface StudentsTableProps {
  students: Student[];
  searchTerm: string;
}

export function StudentsTable({ students, searchTerm }: StudentsTableProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState({
    name: "",
    email: "",
  });

  const handleOpenHistory = (name: string, email: string) => {
    setSelectedStudent({ name, email });
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="bg-neutras-900 border border-neutras-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-5 border-b border-neutras-800">
          <h2 className="text-white font-semibold">Lista de alunos</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-neutras-800/50 text-neutras-500 text-xs uppercase tracking-wider">
                <th className="p-4 font-semibold">Nome</th>
                <th className="p-4 font-semibold">E-mail</th>
                <th className="p-4 font-semibold text-center">Histórico</th>
                <th className="p-4 font-semibold">Última Interação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutras-800">
              {students.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="p-8 text-center text-neutras-500 text-sm italic"
                  >
                    Nenhum aluno encontrado{" "}
                    {searchTerm && `para "${searchTerm}"`}.
                  </td>
                </tr>
              ) : (
                students.map((student) => (
                  <tr
                    key={student.id}
                    className="hover:bg-neutras-800/30 transition-colors group"
                  >
                    <td className="p-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-neutras-700 flex items-center justify-center text-white text-xs font-bold uppercase shrink-0">
                        {student.name.charAt(0)}
                      </div>
                      <span className="text-neutras-50 font-medium whitespace-nowrap">
                        {student.name}
                      </span>
                    </td>

                    <td className="p-4 text-neutras-400 text-sm whitespace-nowrap">
                      {student.email}
                    </td>

                    <td className="p-4 text-center">
                      <Button
                        variant="outline"
                        size="none"
                        onClick={() =>
                          handleOpenHistory(student.name, student.email)
                        }
                        className={cn(
                          "mx-auto flex items-center gap-1.5 rounded-lg px-3 py-1.5",
                          "border-neutras-700 bg-neutras-800 text-xs font-semibold text-neutras-400",
                          "transition-all hover:border-secundaria/50 hover:bg-neutras-800 hover:text-secundaria"
                        )}
                      >
                        <Eye size={14} weight="bold" />
                        Ver
                      </Button>
                    </td>

                    <td className="p-4 text-neutras-500 text-sm whitespace-nowrap">
                      {formatShortDate(student.lastInteraction)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <StudentHistoryListModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        studentName={selectedStudent.name}
        studentEmail={selectedStudent.email}
      />
    </>
  );
}
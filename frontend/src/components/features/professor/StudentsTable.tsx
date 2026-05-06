"use client";

import { useState } from "react";
import { StudentHistoryListModal } from "@/components/features/professor/StudentHistoryListModal";
import { Student } from "@/types/student"; 
import { formatShortDate } from "@/lib/formatters"; 
import { Eye, CaretDown, CaretUp } from "@phosphor-icons/react"; 
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { useOrdenacao } from "@/lib/ordenecao";

export interface StudentsTableProps {
  students: Student[];
  searchTerm: string;
  onMarkAsRead: (id: string | number) => void;
  mostrarNaoLidos: boolean; 
}

export function StudentsTable({ students, searchTerm, onMarkAsRead, mostrarNaoLidos }: StudentsTableProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState({
    name: "",
    email: "",
  });

  const { 
    dadosOrdenados: sortedStudents,
    ordenarPor, 
    direcao, 
    handleSort 
  } = useOrdenacao(
    students, 
    'naoVisualizado', 
    'lastInteraction', 
    'name',            
    'visto'          
  );
  
  const handleOpenHistory = (student: Student) => {
    setSelectedStudent({ name: student.name, email: student.email });
    setIsModalOpen(true);
    
    if (!student.visto) {
      onMarkAsRead(student.id);
    }
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
              <tr className="bg-neutras-800/50 text-neutras-500 text-xs uppercase tracking-wider select-none">
                
                <th 
                  className="p-4 font-semibold cursor-pointer hover:bg-neutras-800 transition-colors group"
                  onClick={() => handleSort('alfabetico')}
                >
                  <div className="flex items-center gap-2">
                    Nome
                    {direcao === 'desc' && ordenarPor === 'alfabetico' ? (
                      <CaretUp size={14} weight="bold" className="text-primaria opacity-100 transition-opacity" />
                    ) : (
                      <CaretDown 
                        size={14} 
                        weight="bold" 
                        className={cn(
                          "transition-opacity",
                          ordenarPor === 'alfabetico' ? "opacity-100 text-primaria" : "opacity-0 group-hover:opacity-50"
                        )} 
                      />
                    )}
                  </div>
                </th>

                <th className="p-4 font-semibold">E-mail</th>
                <th className="p-4 font-semibold text-center">Histórico</th>

                <th 
                  className="p-4 font-semibold cursor-pointer hover:bg-neutras-800 transition-colors group"
                  onClick={() => handleSort('recente')} 
                >
                  <div className="flex items-center gap-2">
                    Última Interação
                    {direcao === 'desc' && ordenarPor === 'recente' ? (
                       <CaretUp size={14} weight="bold" className="text-primaria opacity-100 transition-opacity" />
                    ) : (
                      <CaretDown 
                        size={14} 
                        weight="bold" 
                        className={cn(
                          "transition-opacity",
                          ordenarPor === 'recente' ? "opacity-100 text-primaria" : "opacity-0 group-hover:opacity-50"
                        )} 
                      />
                    )}
                  </div>
                </th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-neutras-800">
              {sortedStudents.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="p-8 text-center text-neutras-500 text-sm italic"
                  >
                    {mostrarNaoLidos 
                      ? "Você já visualizou todos os alunos!" 
                      : `Nenhum aluno encontrado ${searchTerm ? `para "${searchTerm}"` : ''}.`
                    }
                  </td>
                </tr>
              ) : (
                sortedStudents.map((student) => (
                  <tr
                    key={student.id}
                    className="hover:bg-neutras-800/30 transition-colors group"
                  >
                    <td className="p-4 flex items-center gap-3">
                      <div className="w-2 flex justify-center shrink-0">
                        {!student.visto && (
                          <span 
                            className="w-2.5 h-2.5 rounded-full bg-primaria animate-pulse" 
                            title="Nova interação"
                          />
                        )}
                      </div>
                      
                      <div className="w-8 h-8 rounded-full bg-neutras-700 flex items-center justify-center text-white text-xs font-bold uppercase shrink-0">
                        {student.name.charAt(0)}
                      </div>
                      
                      <span className={cn(
                        "font-medium whitespace-nowrap transition-colors",
                        !student.visto ? "text-neutras-50" : "text-neutras-400"
                      )}>
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
                        onClick={() => handleOpenHistory(student)}
                        className={cn(
                          "mx-auto flex items-center gap-1.5 rounded-lg px-3 py-1.5",
                          "border-neutras-700 bg-neutras-800 text-xs font-semibold text-neutras-400",
                          "transition-all hover:border-secundaria/50 hover:bg-neutras-800 hover:text-secundaria",
                          !student.visto && "border-primaria/30 text-primaria" 
                        )}
                      >
                        <Eye size={14} weight="bold" />
                        Ver
                      </Button>
                    </td>

                    <td className="p-4 text-neutras-500 text-sm whitespace-nowrap">
                      {formatShortDate(String(student.lastInteraction))}
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
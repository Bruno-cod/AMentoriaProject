"use client";

import { useState, useEffect } from "react";
import { FileText, PencilSimple, Trash } from "@phosphor-icons/react";
import { KnowledgeFile } from "@/types/files"; 
import { fetchKnowledgeFiles, deleteKnowledgeFile, renameKnowledgeFile } from "@/lib/services/files"; 
import { formatLongDate } from "@/lib/formatters";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";


export function FileManager({ refreshKey = 0 }: { refreshKey?: number }) {
  const [files, setFiles] = useState<KnowledgeFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  useEffect(() => {
    const loadFiles = async () => {
      setIsLoading(true);
      try {
        const data = await fetchKnowledgeFiles();
        setFiles(data);
      } catch (error) {
        console.error("Erro ao buscar arquivos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFiles();
  }, [refreshKey]);

  const handleDelete = async (id: string) => {
    if (confirm("Deseja excluir?")) {
      const success = await deleteKnowledgeFile(id);
      if (success) {
        setFiles((prev) => prev.filter((file) => file.id !== id));
      }
    }
  };

  const startEditing = (file: KnowledgeFile) => {
    setEditingId(file.id);
    setEditName(file.name);
  };

  const saveEdit = async (id: string) => {
    const success = await renameKnowledgeFile(id, editName);
    
    if (success) {
      setFiles((prev) =>
        prev.map((file) => (file.id === id ? { ...file, name: editName } : file)),
      );
    }
    setEditingId(null);
  };

  return (
    <div className="bg-neutras-900 border border-neutras-800 rounded-2xl overflow-hidden shadow-sm">
      <div className="p-5 border-b border-neutras-800 flex justify-between items-center">
        <div>
          <h2 className="text-white font-semibold">
            Base de Conhecimento da IA
          </h2>
          <p className="text-sm text-neutras-400 mt-1">
            Gerencie os arquivos que alimentam as respostas do monitor.
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-neutras-800/50 text-neutras-500 text-xs uppercase tracking-wider">
              <th className="p-4 font-semibold">Nome do Arquivo</th>
              <th className="p-4 font-semibold">Tamanho</th>
              <th className="p-4 font-semibold">Data de Envio</th>
              <th className="p-4 font-semibold text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutras-800">
            {isLoading ? (
              <tr>
                <td
                  colSpan={4}
                  className="p-8 text-center text-neutras-500 text-sm"
                >
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-neutras-500 border-t-primaria rounded-full animate-spin" />
                    Carregando arquivos...
                  </div>
                </td>
              </tr>
            ) : files.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="p-8 text-center text-neutras-500 text-sm italic"
                >
                  Nenhum arquivo na base de conhecimento.
                </td>
              </tr>
            ) : (
              files.map((file) => (
                <tr
                  key={file.id}
                  className="hover:bg-neutras-800/30 transition-colors group"
                >
                  <td className="p-4 flex items-center gap-3">
                    {editingId === file.id ? (
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="bg-neutras-800 border border-primaria text-white px-3 py-1.5 rounded-lg text-sm w-full focus:outline-none focus:ring-1 focus:ring-primaria"
                        autoFocus
                      />
                    ) : (
                      <>
                        <FileText
                          size={24}
                          weight="duotone"
                          className="text-neutras-400"
                        />
                        <span className="text-neutras-50 font-medium whitespace-nowrap">
                          {file.name}
                        </span>
                      </>
                    )}
                  </td>

                  <td className="p-4 text-neutras-400 text-sm whitespace-nowrap">
                    {file.size}
                  </td>

                  <td className="p-4 text-neutras-500 text-sm whitespace-nowrap">
                    {formatLongDate(file.uploadDate)}
                  </td>

                  <td className="p-4 flex justify-end gap-2">
                    {editingId === file.id ? (
                      <>
                        <Button
                          variant='outline'
                          size='none'
                          onClick={() => saveEdit(file.id)}
                          className={cn("text-xs font-semibold text-primaria hover:text-white border border-primaria/50 hover:bg-primaria bg-primaria/10 px-3 py-1.5 rounded-lg transition-all")} 
                        >
                          Salvar
                        </Button>
                        <Button
                          variant='outline'
                          size='none'
                          onClick={() => setEditingId(null)}
                          className={cn("text-xs font-semibold text-neutras-400 hover:text-white border border-neutras-700 bg-neutras-800 px-3 py-1.5 rounded-lg transition-all")}
                        >
                          Cancelar
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant='outline'
                          size='none'
                          onClick={() => startEditing(file)}
                          className={cn("text-xs font-semibold text-neutras-400 hover:text-white border border-neutras-700 hover:border-neutras-500 bg-neutras-800 px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5"
                        )}
                        >
                          <PencilSimple size={14} weight="bold" />
                          Editar
                        </Button>
                        <Button
                          variant='outline'
                          size='none'
                          onClick={() => handleDelete(file.id)}
                          className={cn("text-xs font-semibold text-neutras-400 hover:text-erro border border-neutras-700 hover:border-erro/50 bg-neutras-800 px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5")}
                        >
                          <Trash size={14} weight="bold" />
                          Excluir
                        </Button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
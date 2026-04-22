import { KnowledgeFile } from "@/types/files";

export async function fetchKnowledgeFiles(): Promise<KnowledgeFile[]> {
  const response = await fetch("/api/files");
  if (!response.ok) throw new Error("Falha ao buscar arquivos");
  return response.json();
}

export async function deleteKnowledgeFile(id: string): Promise<boolean> {
  const response = await fetch(`/api/files?id=${id}`, {
    method: "DELETE",
  });
  return response.ok;
}

export async function renameKnowledgeFile(id: string, newName: string): Promise<boolean> {
  
  const response = await fetch(`/api/files/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: newName })
  });
  return response.ok;

  
  return true; 
}

export async function uploadKnowledgeFile(file: File): Promise<boolean> {
  const response = await fetch("/api/files", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ 
      name: file.name 
    }),
  });

  return response.ok;
}
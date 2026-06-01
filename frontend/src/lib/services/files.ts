import { KnowledgeFile } from "@/types/files";
import { getAuthHeader } from "../validations/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";


export async function fetchKnowledgeFiles(): Promise<KnowledgeFile[]> {
  const response = await fetch(`${API_URL}/api/files`, {
    method: "GET",
    headers: {
      ...getAuthHeader(), 
    },
  });
  if (!response.ok) throw new Error("Falha ao buscar arquivos");
  return response.json();
}

export async function deleteKnowledgeFile(id: string): Promise<boolean> {
  const response = await fetch(`${API_URL}/api/files?id=${id}`, {
    method: "DELETE",
    headers: {
      ...getAuthHeader(),
    },
  });
  return response.ok;
}

export async function renameKnowledgeFile(id: string, newName: string): Promise<boolean> {
  const response = await fetch(`${API_URL}/api/files/${id}`, {
    method: 'PATCH',
    headers: { 
      'Content-Type': 'application/json',
      ...getAuthHeader(), 
    },
    body: JSON.stringify({ name: newName })
  });
  return response.ok;
}

export async function uploadKnowledgeFile(file: File): Promise<boolean> {
  const response = await fetch(`${API_URL}/api/files`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(), 
    },
    body: JSON.stringify({ 
      name: file.name 
    }),
  });

  return response.ok;
}
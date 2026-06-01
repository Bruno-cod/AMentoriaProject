import { Student } from "@/types/student";
import { getAuthHeader } from "../validations/auth";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";


  
  
export async function fetchStudents(): Promise<Student[]> {
  const response = await fetch(`${API_URL}/api/alunos`, {
    method: "GET",
    headers: {
      ...getAuthHeader(),
    },
  });
  
  if (!response.ok) {
    throw new Error("Falha ao carregar a lista de alunos.");
  }
  
  return response.json();
}

export async function createStudent(data: { name: string; email: string }): Promise<Student> {
  const response = await fetch(`${API_URL}/api/alunos`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      ...getAuthHeader(), 
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Falha ao criar o cadastro do aluno.");
  }

  return response.json();
}

export async function updateStudentStatus(email: string, visto: boolean) {
  const response = await fetch(`${API_URL}/api/alunos`, {
    method: "PATCH",
    headers: { 
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    body: JSON.stringify({ email, visto }),
  });

  if (!response.ok) {
    throw new Error("Falha ao atualizar o status do aluno.");
  }

  return response.json();
}
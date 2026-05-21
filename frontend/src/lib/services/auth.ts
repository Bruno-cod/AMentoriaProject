const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface UserData {
  id: string;
  name: string;
  email: string;
  role: "aluno" | "professor";
  subject?: string;
}

export async function registerUser(data: {
  name: string;
  email: string;
  password: string;
  role: string;
  subject?: string;
}): Promise<UserData> {
  const res = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || "Erro ao criar conta.");
  }

  return res.json();
}

export async function loginUser(data: {
  email: string;
  password: string;
}): Promise<UserData> {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || "E-mail ou senha incorretos.");
  }

  return res.json();
}

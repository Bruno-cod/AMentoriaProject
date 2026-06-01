const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
import { UserData, LoginResponse } from "@/types/user";


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

  const responseData: LoginResponse = await res.json(); 


  if (typeof window !== "undefined") {
    const token = responseData.access_token || responseData.token;
    if (token) {
      localStorage.setItem("token", token);
    }
  }

  return responseData; 
}

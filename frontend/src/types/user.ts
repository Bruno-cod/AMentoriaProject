export type UserRole = "aluno" | "professor";

export interface UserData {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  subject?: string;
}

export interface LoginResponse extends UserData {
  access_token?: string;
  token?: string;
}
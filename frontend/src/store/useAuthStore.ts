import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UserRole = "aluno" | "professor";

export interface UserData {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  subject?: string;
}

interface AuthState {
  user: UserData | null;
  isLogged: boolean;
  setUser: (userData: UserData) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLogged: false,

      setUser: (userData) => {
        set({ user: userData, isLogged: true });
      },

      logout: () => {
        set({ user: null, isLogged: false });
      },
    }),
    {
      name: "amentoria-auth",
    }
  )
);

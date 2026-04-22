import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UserRole = "aluno" | "professor";

interface UserData {
  name: string;
  email: string;
  role: UserRole;
  subject?: string;
}

interface AuthState {
  user: UserData | null;
  isLogged: boolean;
  registeredUsers: UserData[];
  register: (userData: UserData) => boolean;
  login: (email: string) => UserData | null; 
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLogged: false,
      registeredUsers: [],

      register: (userData) => {
        const currentUsers = get().registeredUsers;

        const emailJaExiste = currentUsers.some(
          (u) => u.email === userData.email
        );
        if (emailJaExiste) return false;

        set({
          registeredUsers: [...currentUsers, userData],
          user: userData,
          isLogged: true,
        });
        return true;
      },

      login: (email) => {
        const foundUser = get().registeredUsers.find(
          (u) => u.email === email
        );

        if (foundUser) {
          set({ user: foundUser, isLogged: true });
          return foundUser; 
        }
        return null;
      },

      logout: () => {
        set({ user: null, isLogged: false });
      },
    }),
    {
      name: "amentoria-auth",
      // partialize: (state) => ({ user: state.user, isLogged: state.isLogged }),
    }
  )
);
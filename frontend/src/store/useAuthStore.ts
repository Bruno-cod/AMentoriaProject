import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserData } from "@/types/user";

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
        if (typeof window !== "undefined") {
          localStorage.removeItem("token");
        }
        set({ user: null, isLogged: false });
      },
    }),
    {
      name: "amentoria-auth",
    }
  )
);

import { useAuth, useIsAuthenticated } from "@/hooks/Auth/useAuth";
import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Wrapper para rotas que requerem autenticação
 * Verifica token e redireciona para login se não autenticado
 */
export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const isAuthenticated = useIsAuthenticated();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primaria"></div>
      </div>
    );
  }

  return <>{children}</>;
};

/**
 * Layout wrapper para usar em app/(protected)/layout.tsx
 * Verifica autenticação e expiração de token em toda rota protegida
 */
export const ProtectedLayout = ({ children }: { children: ReactNode }) => {
  useAuth(); // Hook que verifica expiração continuamente

  return <>{children}</>;
};
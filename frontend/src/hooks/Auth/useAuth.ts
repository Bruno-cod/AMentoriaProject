import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

/**
 * Decodifica o payload do JWT sem validar a assinatura
 * (validação é feita apenas no servidor)
 */
const decodeToken = (token: string) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Erro ao decodificar token:', error);
    return null;
  }
};

/**
 * Verifica se o token expirou
 */
const isTokenExpired = (token: string): boolean => {
  const payload = decodeToken(token);
  if (!payload || !payload.exp) return true;

  // exp está em segundos (Unix timestamp)
  const currentTime = Math.floor(Date.now() / 1000);
  return payload.exp < currentTime;
};

/**
 * Hook para verificar e validar token
 * Redireciona para login se token expirou
 */
export const useAuth = () => {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const token = localStorage.getItem("token");

    // Se não tem token, vai para login
    if (!token) {
      router.push("/login");
      return;
    }

    // Se token expirou, faz logout e volta para login
    if (isTokenExpired(token)) {
      console.warn("Token expirado");
      logout();
      router.push("/login");
      return;
    }

    // Calcula tempo até expiração e avisa próximo de expirar
    const payload = decodeToken(token);
    if (payload && payload.exp) {
      const expiresIn = payload.exp * 1000 - Date.now();
      const minutesLeft = Math.floor(expiresIn / 1000 / 60);

      if (minutesLeft < 5 && minutesLeft > 0) {
        console.warn(`Token vai expirar em ${minutesLeft} minutos`);
        // Aqui você pode mostrar um toast ou modal avisando
      }

      // Setup verificação periódica (a cada minuto)
      const interval = setInterval(() => {
        const currentToken = localStorage.getItem("token");
        if (!currentToken || isTokenExpired(currentToken)) {
          clearInterval(interval);
          logout();
          router.push("/login");
        }
      }, 60000); // Verifica a cada 1 minuto

      return () => clearInterval(interval);
    }
  }, [user, router, logout]);

  return { user };
};

/**
 * Hook simplificado para apenas verificar se está autenticado
 */
export const useIsAuthenticated = (): boolean => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  return token !== null && !isTokenExpired(token);
};

/**
 * Hook para obter informações do token
 */
export const useTokenInfo = () => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  
  if (!token) return null;

  const payload = decodeToken(token);
  if (!payload) return null;

  return {
    userId: payload.sub,
    papel: payload.papel,
    expiresAt: new Date(payload.exp * 1000),
    expiresIn: Math.floor((payload.exp * 1000 - Date.now()) / 1000), 
    isExpired: isTokenExpired(token),
  };
};
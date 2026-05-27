"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore"; 

export default function ProfessorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLogged } = useAuthStore();
  const router = useRouter();
  
  const [hydrated, setHydrated] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    if (!isLogged || !user) {
      router.replace("/login");
    } 
    else if (user.role !== "professor") { 
      router.replace("/Aluno"); 
    } 
    else {
      setIsAuthorized(true);
    }
  }, [user, isLogged, router, hydrated]);

  if (!isAuthorized) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#0B0F19] text-white">
        <div className="text-center space-y-2">
          <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
          <p className="text-gray-400 font-medium">Verificando permissões...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
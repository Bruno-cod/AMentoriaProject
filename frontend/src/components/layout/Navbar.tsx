"use client"

import { Button } from "../ui/Button";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect, useState } from "react";

export function Navbar() {
  const router = useRouter();
  
  const { isLogged} = useAuthStore();
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleHome = () => {
    router.push("/");    
  };

  const handleLoginClick = () => {
    router.push("/login");
  };


  if (!isMounted) return <header className="fixed top-0 h-[120px] w-full bg-neutras-900 z-20" />;

  return (
    <header 
      className={`w-full flex items-center justify-between z-20 transition-all 
        ${isLogged 
          ? 'h-[100px] px-4 md:px-12 bg-neutras-900 border-b border-primaria/10' 
          : 'fixed top-0 h-[120px] px-4 md:px-[75px] bg-neutras-900'
        }`}
    >
      <div className="flex flex-col">
        <h2 
          onClick={handleHome} 
          className={`${isLogged ? 'text-h4' : 'text-h2'} text-white font-bold leading-none cursor-pointer hover:opacity-80 transition-opacity`}
        >
          amentor<span className="text-secundaria">IA</span>.
        </h2>
        <p className="text-caption text-neutras-400 font-medium uppercase tracking-wider mt-1">
          Seu tutor interativo para o ENEM 
        </p>
      </div>

      {!isLogged && (
        <Button variant="default" onClick={handleLoginClick} className="bg-[linear-gradient(176deg,var(--primary-600)_19%,var(--secondary-400)_100%)] border-0 text-white shadow-lg hover:opacity-90 hover:scale-105 transition-all"
>
          Fazer login
        </Button>
      )}
    </header>
  );
}
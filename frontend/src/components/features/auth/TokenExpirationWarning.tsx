"use client";

import { useTokenInfo } from "@/hooks/Auth/useAuth";
import { useEffect, useState } from "react";


export const TokenExpirationWarning = () => {
  const tokenInfo = useTokenInfo();
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    if (tokenInfo && tokenInfo.expiresIn < 300) { 
      setShowWarning(true);
    }
  }, [tokenInfo]);

  if (!showWarning || !tokenInfo) return null;

  return (
    <div className="fixed top-4 right-4 bg-erro text-white p-4 rounded-lg flex items-center gap-2 shadow-lg">
      <span>
        Seu token expira em {Math.floor(tokenInfo.expiresIn / 60)} minuto(s)
      </span>
    </div>
  );
};
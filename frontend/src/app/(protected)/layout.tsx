"use client";

import { ProtectedLayout } from "@/components/features/auth/ProtectedRoute";

import { ReactNode } from "react";

export default function ProtectedRootLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedLayout>
      <div className="flex">
        
        <main className="flex-1">
          {children}
        </main>
      </div>
    </ProtectedLayout>
  );
}
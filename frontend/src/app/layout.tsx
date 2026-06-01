import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { TokenExpirationWarning } from "@/components/features/auth/TokenExpirationWarning";
import "./globals.css"; 


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});


export const metadata: Metadata = {
  title: "amentorIA - Plataforma de Mentoria",
  description: "Sua mentoria inteligente para o ENEM e vestibulares.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${poppins.variable} h-full`}>
      <body className="antialiased bg-neutras-900 text-neutras-50 h-full">
        
        
        <TokenExpirationWarning /> 
        
        
        {children}
        
      </body>
    </html>
  );
}
import { Poppins } from "next/font/google";
import "./globals.css"; 

const poppins = Poppins({ 
  subsets: ["latin"], 
  weight: ["400", "600", "700"],
  variable: "--font-poppins" 
});

export default function RootLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <html lang="pt-br" className={poppins.variable}>
     
      <body className="antialiased font-poppins">
        {children}
      </body>
    </html>
  );
}
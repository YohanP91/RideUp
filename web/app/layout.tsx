import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" });

export const metadata: Metadata = {
  title: "RideUp | Travel Board",
  description: "Le travel hack ultime",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${jakarta.variable} font-sans antialiased text-abysse h-screen flex flex-col overflow-hidden relative`}>
        
        {/* LA CARTE EN FOND ABSOLU */}
        <div className="absolute inset-0 z-0">
           <iframe 
            src="https://www.openstreetmap.org/export/embed.html?bbox=117.16918945312501%2C8.559132204899144%2C126.96899414062501%2C18.677063385458925&amp;layer=mapnik" 
            className="w-full h-full border-none"
           ></iframe>
        </div>

        {/* CONTENU (Gère ses propres opacités) */}
        <div className="relative z-10 w-full h-full flex flex-col pointer-events-none">
          {children}
        </div>
      </body>
    </html>
  );
}
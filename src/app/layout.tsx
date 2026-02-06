import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Human Care - Plataforma de Cuidado e Desenvolvimento Pessoal",
  description: "Plataforma holistica de cuidado e desenvolvimento pessoal para professores. Mapeie sua vida, acompanhe seu progresso e alcance seu proposito.",
  keywords: ["cuidado", "desenvolvimento pessoal", "terapia", "coaching", "professores", "bem-estar"],
  authors: [{ name: "Better Tech" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#FFFFFC]`}
      >
        <TooltipProvider>
          {children}
        </TooltipProvider>
      </body>
    </html>
  );
}

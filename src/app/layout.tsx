import type { Metadata } from "next";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";

export const metadata: Metadata = {
  title: "Life Map - Arquitetura Humana | Desbloqueando o Potencial Humano",
  description: "Uma estrutura de cuidado integrado para navegar a disrupção transformacional e converter consciência em performance.",
  keywords: ["life map", "cuidado integrado", "arquitetura humana", "desenvolvimento humano", "terapia", "coaching"],
  authors: [{ name: "Life Map Model" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased bg-[#F5F0EB] text-[#1A1A1E]">
        <TooltipProvider>
          {children}
        </TooltipProvider>
      </body>
    </html>
  );
}

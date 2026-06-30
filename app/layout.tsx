import "./globals.css";

import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Diagnostico Guiado de Redes e CFTV",
  description: "Assistente tecnico simples para conduzir diagnosticos iniciais de rede, acesso remoto e camera offline.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}

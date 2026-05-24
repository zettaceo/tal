import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "A História da Princesa Tal — Pixel Art SNES",
  description: "Uma cutscene cinematográfica em pixel art 16-bit estilo Super Nintendo",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" style={{ height: "100%", overflow: "hidden" }}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0, padding: 0, height: "100%", overflow: "hidden", background: "#000" }}>
        {children}
      </body>
    </html>
  );
}

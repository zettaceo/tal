import type { Metadata, Viewport } from "next";
import { Press_Start_2P } from "next/font/google";
import "./globals.css";

const pixelFont = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-pixel",
});

export const metadata: Metadata = {
  title: "A História da Princesa Tal",
  description: "Experiência cinematográfica pixel art 16-bit estilo SNES",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={pixelFont.variable}>
      <body style={{ margin: 0, padding: 0, background: "#000", overflow: "hidden", width: "100vw", height: "100vh" }}>
        {children}
      </body>
    </html>
  );
}

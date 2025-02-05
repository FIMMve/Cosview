import type { Metadata } from "next";
import { Providers } from "./providers";
import { HeaderProvider } from "./HeaderProvider"

import Header from "@/components/layout/Header";

import "./globals.css";

export const metadata: Metadata = {
  title: "CAEMCA",
  description: "Sistema Integrado de Gestión",
};

export default async function RootLayout({ children } : Readonly<{ children : React.ReactNode }>) {
  return (
    <html lang="es" className="transition-background duration-1000">
      <body className="p-4">
        <Providers>
          <HeaderProvider>
            <Header />
          </HeaderProvider>

          {children}
        </Providers>
      </body>
    </html>
  );
}

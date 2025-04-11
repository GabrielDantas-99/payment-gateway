import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Phantom Gateway",
  description: "Phantom Gateway Payment System",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className}  dark min-h-screen`}>
        <Header />
        <main className="container mx-auto py-4">{children}</main>
        <footer className="py-4 text-center text-sm text-gray-400">
          © 2025 Phantom Gateway. Todos os direitos reservados.
        </footer>
      </body>
    </html>
  )
}

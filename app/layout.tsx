import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Final Space - Galería de Personajes",
  description: "Explora los personajes de Final Space en una galería interactiva - Desarrollado por ChiqoCorp",
  generator: "ChiqoCorp",
  icons: {
    icon: "/img/logo.jpg",
    shortcut: "/img/logo.jpg",
    apple: "/img/logo.jpg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/img/logo.jpg" type="image/jpeg" />
        <link rel="shortcut icon" href="/img/logo.jpg" type="image/jpeg" />
      </head>
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}

import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { SessionProvider } from "@/components/providers/session-provider"
import { TooltipProvider } from "@/components/ui/tooltip"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: "LCidiomas - Sistema de Gestion Integral",
    template: "%s | LCidiomas",
  },
  description: "Sistema de gestion integral IA-Native para academia de idiomas",
  keywords: ["academia", "idiomas", "gestion", "educacion", "lcidiomas"],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <TooltipProvider delayDuration={0}>
            {children}
          </TooltipProvider>
        </SessionProvider>
      </body>
    </html>
  )
}

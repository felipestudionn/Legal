import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TIC & Legal',
  description: 'Noticias del sector legal y de las telecomunicaciones en España',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head />
      <body className={`${inter.className} min-h-screen bg-gradient-to-br from-gray-50 to-gray-100`}>
        {children}
      </body>
    </html>
  )
}

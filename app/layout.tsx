import type { Metadata, Viewport } from 'next'
import { Lexend, Fredoka, Nunito } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/context/AuthContext'

const lexend = Lexend({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-lexend',
  display: 'swap',
})

const fredoka = Fredoka({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-fredoka',
  display: 'swap',
})

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900'],
  variable: '--font-nunito',
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  title: 'Learnly - Preschool Learning App',
  description: 'Learn to Live, Live to Learn · Where curiosity meets adventure',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${lexend.variable} ${fredoka.variable} ${nunito.variable}`}>
      <body style={{ fontFamily: 'var(--font-lexend), system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}

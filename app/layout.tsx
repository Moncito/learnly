import type { Metadata } from 'next'
import { Lexend, Fredoka } from 'next/font/google'
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

export const metadata: Metadata = {
  title: 'Learnly - Preschool Learning App',
  description: 'Learn to Live, Live to Learn · Where curiosity meets adventure',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${lexend.variable} ${fredoka.variable}`}>
      <body style={{ fontFamily: 'var(--font-lexend), system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}

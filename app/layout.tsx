import type { Metadata, Viewport } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/context/AuthContext'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
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
    <html lang="en" className={`${poppins.variable}`}>
      <body style={{ fontFamily: 'var(--font-poppins), system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
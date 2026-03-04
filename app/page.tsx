'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

import BackgroundBlobs from '@/components/ui/BackgroundBlobs'
import { Navbar } from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'
import Hero from '@/components/home/Hero'
import HowItWorks from '@/components/home/HowItWorks'
import Subjects from '@/components/home/Subjects'
import CtaBand from '@/components/home/CtaBand'

export default function HomePage() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push('/dashboard')
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading || isAuthenticated) return null

  return (
    <main style={{
      width: '100%', minHeight: '100vh',
      background: '#FFFBF0', overflowX: 'hidden', position: 'relative',
    }}>
      <BackgroundBlobs />
      <Navbar />
      <Hero />
      <HowItWorks />
      <Subjects />
      <CtaBand />
      <Footer />
    </main>
  )
}
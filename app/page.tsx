'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

import BackgroundBlobs from '@/components/ui/BackgroundBlobs'
import { Navbar } from '@/components/ui/Navbar'
import AuthModal from '@/components/ui/Authmodal'
import Footer from '@/components/ui/Footer'
import Hero from '@/components/home/Hero'
import HowItWorks from '@/components/home/HowItWorks'
import Subjects from '@/components/home/Subjects'
import CtaBand from '@/components/home/CtaBand'

export default function HomePage() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  // ── ALL hooks must be before any early return ──
  const [modalOpen, setModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login')

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push('/dashboard')
    }
  }, [isAuthenticated, isLoading, router])

  // ── Early returns AFTER all hooks ──
  if (isLoading || isAuthenticated) return null

  const openModal = (tab: 'login' | 'signup') => {
    setActiveTab(tab)
    setModalOpen(true)
  }

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

      {/* CtaBand now handles its own routing internally */}
      <CtaBand />

      <Footer />

      {modalOpen && (
        <AuthModal
          initialTab={activeTab}
          onClose={() => setModalOpen(false)}
        />
      )}

    </main>
  )
}
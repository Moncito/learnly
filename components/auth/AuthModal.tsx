'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { signInWithEmail, signInWithGoogle } from '@/lib/auth'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  initialTab?: 'login' | 'signup'
}

export function AuthModal({ isOpen, onClose, initialTab = 'login' }: AuthModalProps) {
  const [tab, setTab] = useState<'login' | 'signup'>(initialTab)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      await signInWithEmail(email, password)
      onClose()
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message || 'Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setError('')
    setIsLoading(true)

    try {
      await signInWithGoogle()
      onClose()
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message || 'Google sign-in failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Account">
      {/* Tabs */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => {
            setTab('login')
            setError('')
          }}
          className={`flex-1 py-2 text-center font-bold border-b-4 transition ${
            tab === 'login'
              ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
              : 'border-[var(--color-muted)] text-[var(--color-muted)]'
          }`}
        >
          🔑 Log In
        </button>
        <button
          onClick={() => {
            setTab('signup')
            setError('')
          }}
          className={`flex-1 py-2 text-center font-bold border-b-4 transition ${
            tab === 'signup'
              ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
              : 'border-[var(--color-muted)] text-[var(--color-muted)]'
          }`}
        >
          ✨ Sign Up
        </button>
      </div>

      {/* Login Tab */}
      {tab === 'login' && (
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block font-bold mb-2 text-[1.125rem]">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="w-full px-4 py-3 border-2 border-[var(--color-text)] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>

          <div>
            <label className="block font-bold mb-2 text-[1.125rem]">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-3 border-2 border-[var(--color-text)] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>

          {error && (
            <div className="p-4 bg-[var(--color-accent)] text-white rounded-2xl text-[1.125rem] font-bold">
              {error}
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? '⏳ Logging in...' : '🔑 Log In'}
          </Button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-[var(--color-muted)]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-[var(--color-muted)] font-bold">
                or
              </span>
            </div>
          </div>

          <Button
            type="button"
            variant="secondary"
            size="lg"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full"
          >
            🔐 Sign In with Google
          </Button>
        </form>
      )}

      {/* Signup Tab */}
      {tab === 'signup' && (
        <div className="space-y-4 text-center">
          <p className="text-[1.125rem] font-bold text-[var(--color-text)]">
            Please sign up with the dedicated page
          </p>
          <Link href="/signup">
            <Button variant="primary" size="lg" className="w-full">
              ✨ Go to Sign Up Page
            </Button>
          </Link>
        </div>
      )}
    </Modal>
  )
}

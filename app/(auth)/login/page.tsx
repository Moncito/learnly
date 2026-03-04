'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Navbar } from '@/components/ui/Navbar'
import { signInWithEmail, signInWithGoogle } from '@/lib/auth'
import { useAuth } from '@/context/AuthContext'
import './login.css'

export default function LoginPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const isValidEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    setIsLoading(true)
    try {
      await signInWithEmail(email, password)
      router.push('/dashboard')
    } catch (err: any) {
      const code = err?.code as string | undefined

      switch (code) {
        case 'auth/invalid-email':
          setError('That email address looks invalid. Please check and try again.')
          break
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          setError('Incorrect email or password. Please try again.')
          break
        case 'auth/too-many-requests':
          setError('Too many attempts. Please wait a moment and try again.')
          break
        default:
          setError(err.message || 'Login failed. Please check your credentials.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      router.replace('/dashboard')
    }
  }, [authLoading, isAuthenticated, router])

  const handleGoogleSignIn = async () => {
    setError('')
    setIsLoading(true)
    try {
      await signInWithGoogle()
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message || 'Google sign-in failed.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="login-page">
      {/* ── BACKGROUND BLOBS ── */}
      <div className="login-blobs">
        <div
          className="login-blob"
          style={{
            width: 400,
            height: 400,
            background: '#FFD93D',
            top: '-100px',
            right: '-80px',
          }}
        />
        <div
          className="login-blob"
          style={{
            width: 300,
            height: 300,
            background: '#6BCB77',
            bottom: '10%',
            left: '-60px',
          }}
        />
      </div>

      <Navbar />

      <div className="login-body">
        {/* ── LEFT PANEL ── */}
        <div className="login-left">
          <div className="left-logo">
            <span>Learn</span>ly
          </div>

          <h2 className="left-headline">
            Welcome back,
            <br />
            little explorer! 🌟
          </h2>

          <p className="left-desc">
            Log in to continue your learning adventure. Your progress, badges,
            and lessons are waiting for you!
          </p>

          <div className="left-features">
            {[
              { icon: '🔢', text: 'Continue your Math lessons' },
              { icon: '📖', text: 'Keep reading with English' },
              { icon: '🔬', text: 'Explore Science wonders' },
              { icon: '🏆', text: 'Collect more badges & stars' },
            ].map((f) => (
              <div key={f.text} className="left-feature">
                <span className="left-feature-icon">{f.icon}</span>
                <span className="left-feature-text">{f.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div className="login-right">
          <div className="login-card">
            {/* Header */}
            <div className="card-header">
              <div className="card-icon">🔑</div>
              <div>
                <h1 className="card-title">Log In</h1>
                <p className="card-sub">Pick up where you left off!</p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="login-form">
              <div className="field">
                <label className="field-label">Email</label>
                <input
                  className="field-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div className="field">
                <label className="field-label">Password</label>
                <input
                  className="field-input"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>

              {error && (
                <div className="login-error">
                  ⚠️ {error}
                </div>
              )}

              <button
                type="submit"
                className="btn-login"
                disabled={isLoading}
              >
                {isLoading ? '⏳ Logging in...' : '🔑 Log In'}
              </button>
            </form>

            <div className="divider">or</div>

            <button
              type="button"
              className="btn-google"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
            >
              <svg width="20" height="20" viewBox="0 0 48 48">
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                />
                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                />
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                />
              </svg>
              Continue with Google
            </button>

            <p className="card-footer">
              Don&apos;t have an account?{' '}
              <Link href="/signup">Sign up free</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
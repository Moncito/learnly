'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Navbar } from '@/components/ui/Navbar'
import { signUpWithEmail, signInWithGoogle } from '@/lib/auth'
import { useAuth } from '@/context/AuthContext'
import '../login/login.css'

export default function SignupPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuth()
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const isValidEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!displayName.trim()) {
      setError('Please enter your name.')
      return
    }

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setIsLoading(true)

    try {
      await signUpWithEmail(email, password, displayName)
      router.push('/dashboard')
    } catch (err: any) {
      const code = err?.code as string | undefined

      switch (code) {
        case 'auth/email-already-in-use':
          setError('That email is already in use. Try logging in instead.')
          break
        case 'auth/invalid-email':
          setError('That email address looks invalid. Please check and try again.')
          break
        case 'auth/weak-password':
          setError('Password is too weak. Try a longer, stronger password.')
          break
        default:
          setError(err.message || 'Sign up failed. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setError('')
    setIsLoading(true)

    try {
      await signInWithGoogle()
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message || 'Google sign-up failed')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      router.replace('/dashboard')
    }
  }, [authLoading, isAuthenticated, router])

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
            Join the adventure,
            <br />
            little explorer! 🌟
          </h2>

          <p className="left-desc">
            Create your account to unlock playful lessons, badges, and daily
            learning quests.
          </p>

          <div className="left-features">
            {[
              { icon: '🧠', text: 'Smart lessons for curious minds' },
              { icon: '⭐', text: 'Earn stars and badges as you learn' },
              { icon: '📊', text: 'Track progress with friendly charts' },
              { icon: '👨‍👩‍👧', text: 'Built for kids, guided by parents' },
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
              <div className="card-icon">✨</div>
              <div>
                <h1 className="card-title">Create Account</h1>
                <p className="card-sub">
                  Set up your parent account to begin.
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSignup} className="login-form">
              <div className="field">
                <label className="field-label">Your Name</label>
                <input
                  type="text"
                  className="field-input"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className="field">
                <label className="field-label">Email</label>
                <input
                  type="email"
                  className="field-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div className="field">
                <label className="field-label">Password</label>
                <input
                  type="password"
                  className="field-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="field">
                <label className="field-label">Confirm Password</label>
                <input
                  type="password"
                  className="field-input"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>

              {error && <div className="login-error">⚠️ {error}</div>}

              <button
                type="submit"
                className="btn-login"
                disabled={isLoading}
              >
                {isLoading ? '⏳ Creating account...' : '✨ Create Account'}
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
              Sign up with Google
            </button>

            <p className="card-footer">
              Already have an account?{' '}
              <Link href="/login">Log in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'

type AuthModalProps = {
  initialTab?: 'login' | 'signup'
  onClose: () => void
}

export default function AuthModal({ initialTab = 'login', onClose }: AuthModalProps) {
  const [tab, setTab] = useState<'login' | 'signup'>(initialTab)

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.5)',
        zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1rem',
      }}
    >
      <div style={{
        background: '#FFFFFF',
        border: '3px solid #2D2D2D',
        borderRadius: 28,
        boxShadow: '10px 10px 0 #2D2D2D',
        padding: '2.5rem',
        maxWidth: 420, width: '100%',
        position: 'relative',
      }}>
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: '1rem', right: '1rem',
            width: 36, height: 36, borderRadius: '50%',
            border: '2px solid #2D2D2D', background: '#FFFBF0',
            fontFamily: "'Poppins', system-ui, sans-serif", fontWeight: 900,
            fontSize: '1rem', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.15s, color 0.15s',
          }}
          onMouseEnter={e => { (e.target as HTMLElement).style.background = '#FF6B6B'; (e.target as HTMLElement).style.color = '#fff' }}
          onMouseLeave={e => { (e.target as HTMLElement).style.background = '#FFFBF0'; (e.target as HTMLElement).style.color = '#2D2D2D' }}
        >✕</button>

        {/* Heading */}
        <h2 style={{ fontFamily: "'Poppins', system-ui, sans-serif", fontSize: '2.25rem', color: '#2D2D2D', marginBottom: '0.25rem' }}>
          {tab === 'login' ? 'Welcome back! 👋' : 'Join Learnly! 🎉'}
        </h2>
        <p style={{ fontFamily: "'Poppins', system-ui, sans-serif", fontWeight: 600, fontSize: '1rem', color: '#7A7A7A', marginBottom: '1.5rem' }}>
          {tab === 'login' ? 'Log in to continue your learning journey.' : 'Create a free account and start exploring.'}
        </p>

        {/* Tabs */}
        <div style={{
          display: 'flex', background: '#FFFBF0',
          border: '2px solid #2D2D2D', borderRadius: 9999,
          padding: 4, gap: 4, marginBottom: '1.5rem',
        }}>
          {(['login', 'signup'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              flex: 1, fontFamily: "'Poppins', system-ui, sans-serif", fontWeight: 900,
              fontSize: '1rem', border: 'none', borderRadius: 9999,
              padding: '0.5rem', cursor: 'pointer',
              background: tab === t ? '#FFD93D' : 'transparent',
              color: tab === t ? '#2D2D2D' : '#7A7A7A',
              boxShadow: tab === t ? '2px 2px 0 #2D2D2D' : 'none',
              transition: 'all 0.15s',
            }}>
              {t === 'login' ? 'Log In' : 'Sign Up'}
            </button>
          ))}
        </div>

        {/* Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
          {tab === 'signup' && <FormField label="Your Name" type="text" placeholder="e.g. Maria Santos" />}
          <FormField label="Email" type="email" placeholder="you@email.com" />
          <FormField label="Password" type="password" placeholder="••••••••" />

          <button className="btn btn-yellow" style={{
            width: '100%', padding: '0.875rem',
            fontSize: '1.1rem', fontWeight: 900,
            border: '2.5px solid #2D2D2D', borderRadius: 9999,
            boxShadow: '4px 4px 0 #2D2D2D', marginTop: '0.25rem',
          }}>
            {tab === 'login' ? '🔑 Log In' : '🚀 Create Account'}
          </button>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem',
            fontFamily: "'Poppins', system-ui, sans-serif", fontWeight: 800,
            fontSize: '0.85rem', color: '#7A7A7A' }}>
            <div style={{ flex: 1, height: 1.5, background: '#EDE8D0' }} />
            or
            <div style={{ flex: 1, height: 1.5, background: '#EDE8D0' }} />
          </div>

          {/* Google */}
          <button className="btn btn-white" style={{
            width: '100%', padding: '0.75rem 1.5rem',
            fontSize: '1rem', boxShadow: '3px 3px 0 #2D2D2D',
          }}>
            <svg width="20" height="20" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  )
}

function FormField({ label, type, placeholder }: { label: string; type: string; placeholder: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
      <label style={{
        fontFamily: "'Poppins', system-ui, sans-serif", fontWeight: 900,
        fontSize: '0.75rem', textTransform: 'uppercase',
        letterSpacing: 1, color: '#2D2D2D',
      }}>{label}</label>
      <input type={type} placeholder={placeholder} style={{
        fontFamily: "'Poppins', system-ui, sans-serif", fontWeight: 600,
        fontSize: '1rem', border: '2.5px solid #2D2D2D',
        borderRadius: 14, padding: '0.75rem 1rem',
        background: '#FFFBF0', outline: 'none', color: '#2D2D2D',
      }} />
    </div>
  )
}
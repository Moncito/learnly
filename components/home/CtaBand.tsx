'use client'

import { useRouter } from 'next/navigation'

export default function CtaBand() {
  const router = useRouter()

  return (
    <div style={{
      position: 'relative', zIndex: 5,
      maxWidth: 900, margin: '0 auto',
      padding: '2rem 1.5rem 5rem',
    }}>
      <div style={{
        background: '#4D96FF',
        border: '3px solid #2D2D2D',
        borderRadius: 32,
        boxShadow: '8px 8px 0 #2D2D2D',
        padding: '4rem 3rem',
        textAlign: 'center',
        animation: 'floatSoft 5.5s ease-in-out infinite',
      }}>
        <h2 style={{
          fontFamily: "'Fredoka One', cursive",
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          color: '#FFFFFF', marginBottom: '0.75rem',
        }}>
          Ready to start the adventure? 🌈
        </h2>
        <p style={{
          fontFamily: "'Lexend', system-ui, sans-serif",
          fontWeight: 700, fontSize: '1.1rem',
          color: 'rgba(255,255,255,0.85)',
          marginBottom: '2rem', maxWidth: 440,
          marginLeft: 'auto', marginRight: 'auto',
        }}>
          Join thousands of little learners already exploring,
          growing, and having a blast every day.
        </p>
        <div style={{
          display: 'flex', gap: '1rem',
          justifyContent: 'center', flexWrap: 'wrap',
        }}>
          <button
            className="btn btn-white btn-lg"
            onClick={() => router.push('/signup')}
          >
            🚀 Create Free Account
          </button>
          <button
            className="btn btn-outline-white btn-lg"
            onClick={() => router.push('/login')}
          >
            Already have one? Log In
          </button>
        </div>
      </div>
    </div>
  )
}
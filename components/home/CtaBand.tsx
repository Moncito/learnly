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
        background: 'linear-gradient(135deg, #4D96FF 0%, #C77DFF 100%)',
        border: '3px solid #2D2D2D',
        borderRadius: 32,
        boxShadow: '8px 8px 0 #2D2D2D',
        padding: '4rem 3rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        animation: 'floatSoft 5.5s ease-in-out infinite',
      }}>
        {/* Decorative circles */}
        <div style={{
          position: 'absolute', top: -40, right: -40,
          width: 180, height: 180, borderRadius: '50%',
          background: 'rgba(255,255,255,0.1)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: -60, left: -30,
          width: 220, height: 220, borderRadius: '50%',
          background: 'rgba(255,255,255,0.08)',
          pointerEvents: 'none',
        }} />

        <h2 style={{
          fontFamily: "'Poppins', system-ui, sans-serif",
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          color: '#FFFFFF', marginBottom: '0.75rem',
          position: 'relative', zIndex: 1,
        }}>
          Ready to start the adventure? 🌈
        </h2>
        <p style={{
          fontFamily: "'Poppins', system-ui, sans-serif",
          fontWeight: 700, fontSize: '1.1rem',
          color: 'rgba(255,255,255,0.9)',
          marginBottom: '2rem', maxWidth: 440,
          marginLeft: 'auto', marginRight: 'auto',
          position: 'relative', zIndex: 1,
        }}>
          Join thousands of little learners already exploring,
          growing, and having a blast every day.
        </p>
        <div style={{
          display: 'flex', gap: '1rem',
          justifyContent: 'center', flexWrap: 'wrap',
          position: 'relative', zIndex: 1,
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
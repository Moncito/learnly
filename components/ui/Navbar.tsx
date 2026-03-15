'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { signOut } from '@/lib/auth'
import { LogOut, Menu, X } from 'lucide-react'

export function Navbar() {
  const { isAuthenticated, user } = useAuth()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = async () => {
    try {
      await signOut()
      router.push('/')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      width: '100%',
      padding: '0.9rem 1.5rem',
      background: 'rgba(255,251,240,0.97)',
      borderBottom: '2.5px solid #2D2D2D',
      backdropFilter: 'blur(12px)',
      boxShadow: '0 2px 0 #2D2D2D',
    }}>
      <div
        style={{
          maxWidth: 1120,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem',
        }}
      >
        {/* ── LOGO ── */}
        <Link href={isAuthenticated ? '/dashboard' : '/'} style={{ textDecoration: 'none' }}>
          <span style={{
            fontFamily: "'Poppins', system-ui, sans-serif",
            fontSize: '2rem',
            color: '#2D2D2D',
            lineHeight: 1,
          }}>
            <span style={{ color: '#4D96FF' }}>Learn</span>ly
          </span>
        </Link>

        {/* ── DESKTOP NAV LINKS ── */}
        <div
          style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}
          className="hide-on-mobile"
        >
          {isAuthenticated && (
            <>
              <Link href="/dashboard" style={navLinkStyle}>Dashboard</Link>
              <Link href="/progress" style={navLinkStyle}>Progress</Link>
            </>
          )}
        </div>

        {/* ── DESKTOP AUTH ── */}
        <div
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}
          className="hide-on-mobile"
        >
          {isAuthenticated ? (
            <>
              <span style={{ fontFamily: "'Poppins', system-ui, sans-serif", fontWeight: 700, fontSize: '0.95rem', color: '#2D2D2D' }}>
                Hello, {user?.displayName}! 👋
              </span>
              <button
                onClick={handleLogout}
                style={{
                  ...btnBase,
                  background: '#FF6B6B',
                  color: '#FFFFFF',
                  boxShadow: '3px 3px 0 #2D2D2D',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                }}
              >
                <LogOut size={16} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login">
                <button
                  style={{
                    ...btnBase,
                    background: '#FFFFFF',
                    boxShadow: '3px 3px 0 #2D2D2D',
                  }}
                >
                  Log In
                </button>
              </Link>
              <Link href="/signup">
                <button
                  style={{
                    ...btnBase,
                    background: '#FFD93D',
                    boxShadow: '3px 3px 0 #2D2D2D',
                  }}
                >
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>

        {/* ── MOBILE HAMBURGER ── */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="show-on-mobile"
          style={{
            background: 'none',
            border: '2px solid #2D2D2D',
            borderRadius: 10,
            padding: '0.3rem',
            cursor: 'pointer',
            color: '#2D2D2D',
            display: 'none', // overridden by .show-on-mobile CSS
          }}
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* ── MOBILE DRAWER ── */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: '#FFFBF0',
            borderTop: '2.5px solid #2D2D2D',
            borderBottom: '2.5px solid #2D2D2D',
            padding: '0.85rem 1.5rem 1.25rem',
            zIndex: 49,
          }}
        >
          <div
            style={{
              maxWidth: 1120,
              margin: '0 auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.875rem',
            }}
          >
            {isAuthenticated ? (
              <>
                <Link href="/dashboard" onClick={() => setIsOpen(false)} style={mobileLinkStyle}>
                  🗺️ Dashboard
                </Link>
                <Link href="/progress" onClick={() => setIsOpen(false)} style={mobileLinkStyle}>
                  📊 Progress
                </Link>
                <button
                  onClick={() => { handleLogout(); setIsOpen(false) }}
                  style={{
                    ...btnBase,
                    background: '#FF6B6B',
                    color: '#FFFFFF',
                    width: '100%',
                    boxShadow: '3px 3px 0 #2D2D2D',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                  }}
                >
                  <LogOut size={16} /> Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  <button
                    style={{
                      ...btnBase,
                      background: '#FFFFFF',
                      width: '100%',
                      boxShadow: '3px 3px 0 #2D2D2D',
                    }}
                  >
                    Log In
                  </button>
                </Link>
                <Link href="/signup" onClick={() => setIsOpen(false)}>
                  <button
                    style={{
                      ...btnBase,
                      background: '#FFD93D',
                      width: '100%',
                      boxShadow: '3px 3px 0 #2D2D2D',
                    }}
                  >
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── RESPONSIVE STYLES ── */}
      <style>{`
        @media (max-width: 768px) {
          .hide-on-mobile { display: none !important; }
          .show-on-mobile { display: flex !important; }
        }
      `}</style>

    </nav>
  )
}

/* ── STYLE CONSTANTS ── */
const btnBase: React.CSSProperties = {
  fontFamily: "'Poppins', system-ui, sans-serif",
  fontWeight: 800, fontSize: '1rem',
  padding: '0.5rem 1.25rem',
  borderRadius: 9999,
  border: '2.5px solid #2D2D2D',
  cursor: 'pointer',
  color: '#2D2D2D',
  transition: 'transform 0.15s ease, box-shadow 0.15s ease',
  textDecoration: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
}

const navLinkStyle: React.CSSProperties = {
  fontFamily: "'Poppins', system-ui, sans-serif",
  fontWeight: 800, fontSize: '1rem',
  color: '#2D2D2D', textDecoration: 'none',
  transition: 'color 0.15s',
}

const mobileLinkStyle: React.CSSProperties = {
  fontFamily: "'Poppins', system-ui, sans-serif",
  fontWeight: 800, fontSize: '1.1rem',
  color: '#2D2D2D', textDecoration: 'none',
  padding: '0.5rem 0',
  borderBottom: '1.5px solid #EDE8D0',
}
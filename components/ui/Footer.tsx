export default function Footer() {
  return (
    <footer style={{
      position: 'relative', zIndex: 5,
      background: '#2D2D2D',
      color: '#FFFBF0',
    }}>
      <div style={{
        maxWidth: 1100,
        margin: '0 auto',
        padding: '3.5rem 1.5rem 2rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '2.5rem',
      }}>
        {/* Brand */}
        <div>
          <div style={{
            fontFamily: "'Poppins', system-ui, sans-serif",
            fontSize: '2rem', marginBottom: '0.75rem',
          }}>
            <span style={{ color: '#4D96FF' }}>Learn</span>
            <span style={{ color: '#FFD93D' }}>ly</span>
          </div>
          <p style={{
            fontFamily: "'Poppins', system-ui, sans-serif",
            fontWeight: 600, fontSize: '0.9rem',
            color: 'rgba(255,251,240,0.7)', lineHeight: 1.7,
            maxWidth: 220,
          }}>
            A fun, safe, interactive learning world built for little minds aged 3–6.
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
            {['🔢 Math', '📖 English', '🔬 Science'].map((tag) => (
              <span key={tag} style={{
                fontFamily: "'Poppins', system-ui, sans-serif",
                fontWeight: 700, fontSize: '0.75rem',
                background: 'rgba(255,251,240,0.1)',
                border: '1.5px solid rgba(255,251,240,0.25)',
                borderRadius: 9999, padding: '0.2rem 0.7rem',
                color: 'rgba(255,251,240,0.85)',
              }}>{tag}</span>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{
            fontFamily: "'Poppins', system-ui, sans-serif",
            fontSize: '1.1rem', color: '#FFD93D',
            marginBottom: '1rem', letterSpacing: 0.5,
          }}>Quick Links</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {[
              { href: '/signup', label: '🚀 Get Started' },
              { href: '/login',  label: '🔑 Log In' },
              { href: '/dashboard', label: '🗺️ Dashboard' },
              { href: '/progress',  label: '📊 My Progress' },
            ].map((link) => (
              <li key={link.href}>
                <a href={link.href} style={{
                  fontFamily: "'Poppins', system-ui, sans-serif",
                  fontWeight: 700, fontSize: '0.9rem',
                  color: 'rgba(255,251,240,0.75)',
                  textDecoration: 'none',
                  transition: 'color 0.15s',
                }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#FFD93D')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,251,240,0.75)')}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Subjects */}
        <div>
          <h4 style={{
            fontFamily: "'Poppins', system-ui, sans-serif",
            fontSize: '1.1rem', color: '#FFD93D',
            marginBottom: '1rem', letterSpacing: 0.5,
          }}>Subjects</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {[
              { label: '🔢 Math', color: '#FF6B6B' },
              { label: '📖 English', color: '#4D96FF' },
              { label: '🔬 Science', color: '#6BCB77' },
            ].map((sub) => (
              <li key={sub.label}>
                <span style={{
                  fontFamily: "'Poppins', system-ui, sans-serif",
                  fontWeight: 700, fontSize: '0.9rem',
                  color: sub.color,
                }}>{sub.label}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Trust */}
        <div>
          <h4 style={{
            fontFamily: "'Poppins', system-ui, sans-serif",
            fontSize: '1.1rem', color: '#FFD93D',
            marginBottom: '1rem', letterSpacing: 0.5,
          }}>Why Learnly?</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {[
              '✅ 100% Kid-Safe',
              '🎮 Game-Based Learning',
              '🏆 Earn Badges & Stars',
              '📱 Works on Any Device',
              '🆓 Always Free',
            ].map((item) => (
              <li key={item}>
                <span style={{
                  fontFamily: "'Poppins', system-ui, sans-serif",
                  fontWeight: 600, fontSize: '0.9rem',
                  color: 'rgba(255,251,240,0.75)',
                }}>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        borderTop: '1.5px solid rgba(255,251,240,0.12)',
        padding: '1.25rem 1.5rem',
        textAlign: 'center',
        fontFamily: "'Poppins', system-ui, sans-serif",
        fontWeight: 600, fontSize: '0.85rem',
        color: 'rgba(255,251,240,0.45)',
      }}>
        Made with{' '}
        <span style={{ color: '#FF6B6B' }}>♥</span>
        {' '}for little learners everywhere · © 2026 Learnly
      </div>
    </footer>
  )
}
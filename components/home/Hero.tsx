type HeroProps = {
  onGetStarted: () => void
  onLogin: () => void
}

const CHIPS = [
  { color: '#FF6B6B', label: '🔢 Math' },
  { color: '#4D96FF', label: '📖 English' },
  { color: '#6BCB77', label: '🔬 Science' },
  { color: '#FFD93D', label: '🏆 Badges' },
]

const STATS = [
  { num: '3+',   label: 'Subjects to Explore' },
  { num: '30+',  label: 'Fun Lessons' },
  { num: '🏅',   label: 'Earn Cool Badges' },
  { num: '100%', label: 'Kid-Safe Platform' },
]

export default function Hero({ onGetStarted, onLogin }: HeroProps) {
  return (
    <section style={{
      position: 'relative', zIndex: 5,
      width: '100%', display: 'flex',
      flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', textAlign: 'center',
      padding: '5rem 1.5rem 4rem',
    }}>

      {/* Badge */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
        background: '#FFFFFF', border: '2.5px solid #2D2D2D',
        borderRadius: 9999, padding: '0.4rem 1.25rem',
        fontFamily: "'Lexend', system-ui, sans-serif", fontWeight: 700,
        fontSize: '0.9rem', boxShadow: '3px 3px 0 #2D2D2D',
        marginBottom: '2rem',
      }}>
        <span style={{
          width: 8, height: 8, borderRadius: '50%',
          background: '#6BCB77', display: 'inline-block',
          animation: 'pulse 2s ease-in-out infinite',
          flexShrink: 0,
        }} />
        🎉 Free for all young learners
      </div>

      {/* Headline — single font-size, color-only spans */}
      <h1 style={{
        fontFamily: "'Lexend', system-ui, sans-serif",
        fontSize: 'clamp(2.6rem, 7vw, 4.4rem)',
        fontWeight: 800,
        letterSpacing: '-0.03em',
        lineHeight: 1.1,
        color: '#2D2D2D',
        maxWidth: 900,
        marginBottom: '1rem',
        textAlign: 'center',
      }}>
        <span style={{ color: '#4D96FF', fontFamily: 'inherit', fontSize: 'inherit' }}>Learn</span>
        {' '}to{' '}
        <span style={{ color: '#FF6B6B', fontFamily: 'inherit', fontSize: 'inherit' }}>Live</span>
        ,{' '}Live to{' '}
        <span style={{ color: '#4D96FF', fontFamily: 'inherit', fontSize: 'inherit' }}>Learn</span>
      </h1>

      {/* Tagline */}
      <p style={{
        fontFamily: "'Lexend', system-ui, sans-serif",
        fontSize: '1.1rem',
        fontWeight: 600,
        color: '#7A7A7A',
        letterSpacing: '0.02em',
        marginBottom: '1.5rem',
      }}>
        Where curiosity meets adventure · Every day is a discovery
      </p>

      {/* Description */}
      <p style={{
        fontFamily: "'Lexend', system-ui, sans-serif",
        fontSize: '1.125rem', fontWeight: 600,
        color: '#7A7A7A', maxWidth: 520,
        lineHeight: 1.7, marginBottom: '2.5rem',
      }}>
        A fun, safe, and{' '}
        <strong style={{ color: '#2D2D2D', fontFamily: 'inherit' }}>interactive learning world</strong>
        {' '}built for little minds aged 3–6. Explore{' '}
        <strong style={{ color: '#2D2D2D', fontFamily: 'inherit' }}>Math, English, and Science</strong>
        {' '}through games, quizzes, and rewards.
      </p>

      {/* CTA Buttons */}
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
        <button className="btn btn-yellow btn-lg" onClick={onGetStarted}>
          🚀 Get Started — It&apos;s Free
        </button>
        <button className="btn btn-white btn-lg" onClick={onLogin}>
          🔑 Log In
        </button>
      </div>

      {/* Subject Chips */}
      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '4rem' }}>
        {CHIPS.map((chip, index) => (
          <div key={chip.label} style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: '#FFFFFF', border: '2.5px solid #2D2D2D',
            borderRadius: 9999, padding: '0.5rem 1.25rem',
            fontFamily: "'Lexend', system-ui, sans-serif", fontWeight: 700,
            fontSize: '1rem', boxShadow: '3px 3px 0 #2D2D2D',
            animation: 'fadeInUp 0.6s ease-out forwards',
            animationDelay: `${index * 0.08 + 0.1}s`,
          }}>
            <span style={{ width: 12, height: 12, borderRadius: '50%', background: chip.color, display: 'inline-block', flexShrink: 0 }} />
            {chip.label}
          </div>
        ))}
      </div>

      {/* Stats */}
      <div style={{ display: 'flex', gap: '1.25rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        {STATS.map((s, index) => (
          <div
            key={s.label}
            style={{
              background: '#FFFFFF',
              border: '2.5px solid #2D2D2D',
              borderRadius: 20,
              boxShadow: '4px 4px 0 #2D2D2D',
              padding: '1.25rem 2rem',
              textAlign: 'center',
              minWidth: 140,
              animation: 'floatSoft 4s ease-in-out infinite',
              animationDelay: `${index * 0.25}s`,
            }}
          >
            <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: '2.5rem', color: '#2D2D2D', lineHeight: 1 }}>
              {s.num}
            </div>
            <div style={{ fontFamily: "'Lexend', system-ui, sans-serif", fontSize: '0.85rem', fontWeight: 700, color: '#7A7A7A', marginTop: '0.25rem' }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

    </section>
  )
}
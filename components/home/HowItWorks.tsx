const STEPS = [
  { n: '01', color: '#FFD93D', icon: '👤', title: 'Create an Account',  desc: "Sign up in seconds and add your child's name and avatar to get started." },
  { n: '02', color: '#4D96FF', icon: '🗺️', title: 'Pick a Subject',     desc: 'Choose from Math, English, or Science — each with colorful bite-sized lessons.' },
  { n: '03', color: '#FF6B6B', icon: '🎮', title: 'Play & Learn',       desc: 'Answer questions, match pictures, and complete challenges — it feels like a game!' },
  { n: '04', color: '#6BCB77', icon: '🏆', title: 'Earn Badges',        desc: 'Every lesson earns a star. Collect enough to unlock shiny badges!' },
]

export default function HowItWorks() {
  return (
    <section className="section-wrap" style={{ position: 'relative', zIndex: 5 }}>
      <p className="section-eyebrow">How It Works</p>
      <h2 className="section-title">Learning made simple 🎯</h2>

      <div className="grid-4">
        {STEPS.map((step) => (
          <div
            key={step.n}
            className="card-brutal"
            style={{
              background: '#FFFFFF',
              border: '2.5px solid #2D2D2D',
              borderTop: `5px solid ${step.color}`,
              borderRadius: 24,
              boxShadow: '5px 5px 0 #2D2D2D',
              padding: '1.75rem',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translate(-4px,-4px)'
              e.currentTarget.style.boxShadow = '9px 9px 0 #2D2D2D'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translate(0,0)'
              e.currentTarget.style.boxShadow = '5px 5px 0 #2D2D2D'
            }}
          >
            {/* Step number badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: 44, height: 44, borderRadius: 14,
              background: step.color, border: '2.5px solid #2D2D2D',
              fontFamily: "'Fredoka One', cursive",
              fontSize: '1.25rem', lineHeight: 1,
              color: '#2D2D2D', marginBottom: '0.75rem',
              boxShadow: '2px 2px 0 #2D2D2D',
            }}>
              {step.n}
            </div>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{step.icon}</div>
            <h3 style={{
              fontFamily: "'Fredoka One', cursive",
              fontSize: '1.5rem', color: '#2D2D2D', marginBottom: '0.5rem',
            }}>
              {step.title}
            </h3>
            <p style={{
              fontFamily: "'Lexend', system-ui, sans-serif",
              fontSize: '1rem', fontWeight: 600,
              color: '#7A7A7A', lineHeight: 1.6,
            }}>
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
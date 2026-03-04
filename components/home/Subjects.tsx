const SUBJECTS = [
  {
    bg: '#FFF0F0', color: '#FF6B6B', emoji: '🔢', tag: 'Math',
    title: 'Numbers & Counting',
    desc: 'From counting apples to simple addition — kids build number confidence through colorful challenges.',
    pills: ['Counting', 'Shapes', 'Addition', 'Patterns'],
  },
  {
    bg: '#F0F5FF', color: '#4D96FF', emoji: '📖', tag: 'English',
    title: 'Letters & Words',
    desc: 'Explore the alphabet, phonics, and new words through games and stories.',
    pills: ['Alphabet', 'Phonics', 'Vocabulary', 'Reading'],
  },
  {
    bg: '#F0FFF4', color: '#6BCB77', emoji: '🔬', tag: 'Science',
    title: 'The World Around Us',
    desc: 'Discover animals, plants, weather, and the human body through fun questions.',
    pills: ['Animals', 'Plants', 'Weather', 'Body'],
  },
]

export default function Subjects() {
  return (
    <section className="section-wrap" style={{ position: 'relative', zIndex: 5, paddingTop: '1rem' }}>
      <p className="section-eyebrow">What We Teach</p>
      <h2 className="section-title">Three worlds of wonder ✨</h2>

      <div className="grid-3">
        {SUBJECTS.map((s) => (
          <div key={s.tag} style={{
            background: s.bg,
            border: '2.5px solid #2D2D2D',
            borderRadius: 28,
            boxShadow: '5px 5px 0 #2D2D2D',
            padding: '2rem',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            cursor: 'default',
          }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.transform = 'translate(-4px,-4px)'
              ;(e.currentTarget as HTMLElement).style.boxShadow = '9px 9px 0 #2D2D2D'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.transform = 'translate(0,0)'
              ;(e.currentTarget as HTMLElement).style.boxShadow = '5px 5px 0 #2D2D2D'
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{s.emoji}</div>

            <div style={{
              display: 'inline-block',
              fontFamily: "'Lexend', system-ui, sans-serif", fontWeight: 900,
              fontSize: '0.75rem', textTransform: 'uppercase',
              letterSpacing: 2, padding: '0.2rem 0.8rem',
              borderRadius: 9999, border: `2px solid ${s.color}`,
              color: s.color, marginBottom: '0.75rem',
            }}>
              {s.tag}
            </div>

            <h3 style={{
              fontFamily: "'Fredoka One', cursive",
              fontSize: '1.75rem', color: '#2D2D2D', marginBottom: '0.5rem',
            }}>
              {s.title}
            </h3>

            <p style={{
              fontFamily: "'Lexend', system-ui, sans-serif",
              fontSize: '1rem', fontWeight: 600,
              color: '#7A7A7A', lineHeight: 1.6, marginBottom: '1.25rem',
            }}>
              {s.desc}
            </p>

            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {s.pills.map((pill) => (
                <span key={pill} style={{
                  fontFamily: "'Lexend', system-ui, sans-serif", fontWeight: 700,
                  fontSize: '0.85rem', background: '#FFFFFF',
                  border: '2px solid #2D2D2D', borderRadius: 9999,
                  padding: '0.2rem 0.75rem', color: '#2D2D2D',
                }}>
                  {pill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
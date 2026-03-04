export default function Footer() {
  return (
    <footer style={{
      position: 'relative', zIndex: 5,
      textAlign: 'center', padding: '2rem',
      fontFamily: "'Nunito', sans-serif",
      fontWeight: 600, fontSize: '0.9rem',
      color: '#7A7A7A',
      borderTop: '2px solid #EDE8D0',
    }}>
      Made with{' '}
      <span style={{ color: '#FF6B6B' }}>♥</span>
      {' '}for little learners everywhere · © 2025 Learnly
    </footer>
  )
}
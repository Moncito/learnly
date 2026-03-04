export default function BackgroundBlobs() {
  return (
    <div style={{
      position: 'fixed', inset: 0,
      pointerEvents: 'none', zIndex: 0, overflow: 'hidden',
    }}>
      {[
        { w: 500, h: 500, bg: '#FFD93D', top: '-130px', left: '-100px' },
        { w: 400, h: 400, bg: '#4D96FF', top: '33%',   right: '-100px' },
        { w: 350, h: 350, bg: '#FF6B6B', bottom: '40px', left: '25%' },
        { w: 280, h: 280, bg: '#6BCB77', bottom: '25%', right: '40px' },
      ].map((b, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: b.w, height: b.h,
          borderRadius: '50%',
          background: b.bg,
          filter: 'blur(80px)',
          opacity: 0.15,
          top: b.top, left: b.left,
          right: b.right, bottom: b.bottom,
        }} />
      ))}
    </div>
  )
}
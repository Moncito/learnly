'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { Navbar } from '@/components/ui/Navbar'
// import { SubjectCard } from '@/components/lessons/SubjectCard'
import { useProgress, getSubjectCompletion } from '@/hooks/useProgress'
import { SUBJECTS, LESSONS } from '@/constants/subjects'

export default function DashboardPage() {
  const { isAuthenticated, isLoading, user } = useAuth()
  const router = useRouter()
  const { progress } = useProgress(null)

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, isLoading, router])


  if (isLoading) {
    return (
      <div style={{
        width: '100%', minHeight: '100vh',
        background: '#FFFBF0',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: '1rem',
        fontFamily: "'Nunito', sans-serif",
      }}>
        <div style={{ fontSize: '4rem', animation: 'spin 1s linear infinite' }}>⏳</div>
        <p style={{ fontFamily: "'Fredoka One', cursive",
          fontSize: '2rem', color: '#2D2D2D' }}>
          Loading your adventure...
        </p>
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      </div>
    )
  }


  if (!isAuthenticated) {
    return null
  }


  // Fix: fallback for displayName
  const displayName = user?.displayName?.trim() || user?.email?.split('@')[0] || 'Explorer';
  const lessonsStarted = progress.length;
  const lessonsCompleted = progress.filter((p) => p.status === 'completed').length;
  const totalActiveLessons = LESSONS.filter(l => l.isActive).length;
  const completionPercentage = totalActiveLessons > 0 ? Math.round((lessonsCompleted / totalActiveLessons) * 100) : 0;
  const overallProgress = completionPercentage;
  const subjectStats = SUBJECTS.map((subject) => {
    const totalLessons = LESSONS.filter(
      (l) => l.subjectId === subject.id && l.isActive
    ).length;
    const completedLessons = getSubjectCompletion(progress, subject.id);
    return { subject, totalLessons, completedLessons };
  });

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        background: '#FFFBF0',
        fontFamily: "'Nunito', sans-serif",
        overflowX: 'hidden',
        position: 'relative',
      }}
    >
      {/* Blobs — behind everything */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: '#FFD93D', filter: 'blur(80px)', opacity: 0.1, top: -130, left: -100 }} />
        <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: '#4D96FF', filter: 'blur(80px)', opacity: 0.1, top: '33%', right: -100 }} />
        <div style={{ position: 'absolute', width: 350, height: 350, borderRadius: '50%', background: '#6BCB77', filter: 'blur(80px)', opacity: 0.1, bottom: 40, left: '25%' }} />
      </div>

      {/* Navbar OUTSIDE main — full width, sticky */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <Navbar />
      </div>

      {/* Main content */}
      <main style={{ position: 'relative', zIndex: 5, maxWidth: 1100, margin: '0 auto', padding: '2.5rem 2rem' }}>
        {/* Responsive style tag */}
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@400;600;700;800;900&display=swap');
          html, body {
            background: #FFFBF0 !important;
            margin: 0; padding: 0;
            overflow-x: hidden;
          }
          @media (max-width: 900px) {
            .stats-strip  { grid-template-columns: repeat(2,1fr) !important; }
            .subject-grid { grid-template-columns: repeat(2,1fr) !important; }
          }
          @media (max-width: 600px) {
            .subject-grid  { grid-template-columns: 1fr !important; }
            .stats-strip   { grid-template-columns: repeat(2,1fr) !important; }
            .dashboard-greeting { flex-direction: column !important; align-items: flex-start !important; }
          }
        `}</style>

        {/* Greeting Section */}
        <div
          className="dashboard-greeting"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '2.5rem',
            marginBottom: '2.5rem',
          }}
        >
          <div>
            <h1 style={{ fontFamily: "'Fredoka One', cursive", fontSize: '3rem', color: '#2D2D2D', fontWeight: 900, lineHeight: 1.1, marginBottom: '0.15rem' }}>Hello, {displayName}! <span style={{ fontSize: '2.2rem' }}>👋</span></h1>
            <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 600, fontSize: '1.15rem', color: '#7A7A7A', marginTop: '0.15rem' }}>What do you want to learn today?</p>
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#FFFFFF', border: '2.5px solid #2D2D2D', borderRadius: 9999, padding: '0.6rem 1.25rem', boxShadow: '3px 3px 0 #2D2D2D', fontFamily: "'Nunito', sans-serif", fontWeight: 900, fontSize: '1rem', color: '#2D2D2D', whiteSpace: 'nowrap' }}>
            ⭐ Keep it up! <span style={{ color: '#FF6B6B', fontWeight: 900 }}>{overallProgress}% complete</span>
          </div>
        </div>

        {/* Stats Strip */}
        <div
          className="stats-strip"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1rem',
            marginBottom: '2.5rem',
          }}
        >
          {[
            { icon: '🔥', bg: '#FFF0F0', num: '—', label: 'Day Streak' },
            { icon: '📚', bg: '#F0F5FF', num: lessonsCompleted, label: 'Lessons Done' },
            { icon: '🏆', bg: '#F0FFF4', num: '—', label: 'Badges Earned' },
            { icon: '⭐', bg: '#FFF9E6', num: `${overallProgress}%`, label: 'Overall Progress' },
          ].map((s) => (
            <div key={s.label} style={{
              background: '#FFFFFF',
              border: '2.5px solid #2D2D2D',
              borderRadius: 20,
              boxShadow: '4px 4px 0 #2D2D2D',
              padding: '1.25rem 1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: 14,
                background: s.bg, border: '2px solid #2D2D2D',
                display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '1.5rem',
                flexShrink: 0,
              }}>
                {s.icon}
              </div>
              <div>
                <div style={{ fontFamily: "'Fredoka One', cursive",
                  fontSize: '1.75rem', color: '#2D2D2D', lineHeight: 1 }}>
                  {s.num}
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.8rem',
                  color: '#7A7A7A', marginTop: '0.1rem' }}>
                  {s.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Section Title for Subjects */}
        <div style={{ marginBottom: '2.5rem' }}>
          <p
            style={{
              fontFamily: "'Nunito', sans-serif",
              fontWeight: 900,
              fontSize: '0.8rem',
              color: '#7A7A7A',
              letterSpacing: 3,
              textTransform: 'uppercase',
              marginBottom: '0.4rem',
            }}
          >
            Choose a Subject
          </p>
          <h2
            style={{
              fontFamily: "'Fredoka One', cursive",
              fontSize: '2rem',
              color: '#2D2D2D',
            }}
          >
            What do you want to explore? ✨
          </h2>
        </div>

        {/* Subject Cards Grid */}
        <div
          className="subject-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5rem',
            marginBottom: '3.5rem',
          }}
        >
          {subjectStats.map(({ subject, totalLessons, completedLessons }) => {
            let cardBg = '#FFFFFF', titleColor = '#2D2D2D';
            if (subject.id === 'math') {
              cardBg = '#FFF0F0';
              titleColor = '#FF6B6B';
            } else if (subject.id === 'english') {
              cardBg = '#F0F5FF';
              titleColor = '#4D96FF';
            } else if (subject.id === 'science') {
              cardBg = '#F0FFF4';
              titleColor = '#6BCB77';
            }
            const percentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
            const subjectColor = titleColor;
            return (
              <a
                key={subject.id}
                href={`/lessons/${subject.id}`}
                style={{
                  border: '2.5px solid #2D2D2D',
                  borderRadius: 24,
                  boxShadow: '5px 5px 0 #2D2D2D',
                  padding: '2rem 1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  gap: '0.75rem',
                  background: cardBg,
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  cursor: 'pointer',
                  position: 'relative',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translate(-4px,-4px)';
                  e.currentTarget.style.boxShadow = '9px 9px 0 #2D2D2D';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translate(0,0)';
                  e.currentTarget.style.boxShadow = '5px 5px 0 #2D2D2D';
                }}
              >
                <div style={{ fontSize: '3.25rem', marginBottom: 16 }}>{subject.icon}</div>
                <div style={{ marginBottom: 12 }}>
                  <h3
                    style={{
                      fontFamily: "'Fredoka One', cursive",
                      fontSize: '1.85rem',
                      color: titleColor,
                      marginBottom: 8,
                    }}
                  >
                    {subject.name}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Nunito', sans-serif",
                      fontWeight: 600,
                      fontSize: '1.08rem',
                      color: '#7A7A7A',
                      lineHeight: 1.6,
                    }}
                  >
                    {subject.description}
                  </p>
                </div>
                {/* Progress bar section */}
                <div style={{ alignSelf: 'stretch', width: '100%', marginBottom: 8 }}>
                  <p
                    style={{
                      fontFamily: "'Nunito', sans-serif",
                      fontWeight: 700,
                      fontSize: '1rem',
                      color: '#7A7A7A',
                      textAlign: 'left',
                      marginBottom: 6,
                    }}
                  >
                    ⭐ {completedLessons}/{totalLessons} lessons
                  </p>
                  <div
                    style={{
                      width: '100%',
                      height: 12,
                      background: '#EDE8D0',
                      borderRadius: 9999,
                      border: '1.5px solid #2D2D2D',
                      overflow: 'hidden',
                      marginBottom: 4,
                    }}
                  >
                    <div
                      style={{
                        height: '100%',
                        width: `${percentage}%`,
                        background: subjectColor,
                        borderRadius: 9999,
                        transition: 'width 0.4s ease',
                      }}
                    />
                  </div>
                </div>
                {/* Start Learning Button */}
                <button
                  style={{
                    fontFamily: "'Nunito', sans-serif",
                    fontWeight: 900,
                    fontSize: '1.08rem',
                    background: '#FFD93D',
                    color: '#2D2D2D',
                    border: '2.5px solid #2D2D2D',
                    borderRadius: 9999,
                    padding: '0.85rem 2.25rem',
                    width: '100%',
                    cursor: 'pointer',
                    boxShadow: '3px 3px 0 #2D2D2D',
                    marginTop: 'auto',
                    transition: 'transform 0.15s, box-shadow 0.15s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translate(-2px,-2px)';
                    e.currentTarget.style.boxShadow = '5px 5px 0 #2D2D2D';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translate(0,0)';
                    e.currentTarget.style.boxShadow = '3px 3px 0 #2D2D2D';
                  }}
                  onClick={ev => {
                    ev.preventDefault();
                    window.location.href = `/lessons/${subject.id}`;
                  }}
                >
                  {subject.id === 'math' && '🔢 '}
                  {subject.id === 'english' && '📖 '}
                  {subject.id === 'science' && '🔬 '}
                  Start Learning
                </button>
              </a>
            );
          })}
        </div>

        {/* Progress Section */}
        <div
          style={{
            background: '#FFFFFF',
            border: '2.5px solid #2D2D2D',
            borderRadius: 24,
            boxShadow: '5px 5px 0 #2D2D2D',
            padding: '2.75rem',
            marginTop: '2.5rem',
          }}
        >
          <h2
            style={{
              fontFamily: "'Fredoka One', cursive",
              fontSize: '1.75rem',
              color: '#2D2D2D',
              marginBottom: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            📊 Your Progress
          </h2>
          {lessonsStarted === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '2.5rem 1rem',
                fontFamily: "'Nunito', sans-serif",
              }}
            >
              <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🚀</div>
              <p style={{ fontWeight: 800, fontSize: '1.1rem', color: '#2D2D2D', marginBottom: '0.5rem' }}>
                No lessons started yet!
              </p>
              <p style={{ fontWeight: 600, fontSize: '1rem', color: '#7A7A7A' }}>
                Pick a subject above to begin your first learning adventure!
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {subjectStats.map(({ subject, totalLessons, completedLessons }) => {
                const pct = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
                const color = subject.id === 'math' ? '#FF6B6B' : subject.id === 'english' ? '#4D96FF' : '#6BCB77';
                return (
                  <div key={subject.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 800, fontSize: '1rem', color: '#2D2D2D' }}>
                        {subject.icon} {subject.name}
                      </span>
                      <span style={{ fontWeight: 800, fontSize: '0.9rem', color: '#7A7A7A' }}>
                        {completedLessons}/{totalLessons} · {pct}%
                      </span>
                    </div>
                    <div style={{ width: '100%', height: 12, background: '#EDE8D0', borderRadius: 9999, border: '1.5px solid #2D2D2D', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: 9999, transition: 'width 0.4s ease' }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

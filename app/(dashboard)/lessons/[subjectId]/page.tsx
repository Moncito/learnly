'use client'

import React, { useEffect } from 'react'
import { use } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { Navbar } from '@/components/ui/Navbar'
import { useSubject, useLessonsForSubject } from '@/hooks/useLessons'
import { Lesson } from '@/types'
import { useProgress, getSubjectCompletion } from '@/hooks/useProgress'

interface LessonPageProps {
  params: Promise<{ subjectId: string }>
}

export default function LessonsPage({ params }: LessonPageProps) {
  const { subjectId } = use(params)
  const { isAuthenticated, isLoading, user } = useAuth()
  const router = useRouter()
  const subject = useSubject(subjectId)
  const { lessons } = useLessonsForSubject(subjectId)
  const { progress } = useProgress(null, user?.uid ?? undefined)

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading || !subject) {
    return (
      <div style={{
        minHeight: '100vh', background: '#FFFBF0',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: '2rem', color: '#2D2D2D' }}>
          ⏳ Loading...
        </div>
      </div>
    )
  }

  const subjectProgress = getSubjectCompletion(progress, subjectId)
  const completionPercentage = lessons.length > 0
    ? Math.round((subjectProgress / lessons.length) * 100)
    : 0
  const completedCount = subjectProgress

  const subjectColor =
    subjectId === 'math' ? '#FF6B6B'
      : subjectId === 'english' ? '#4D96FF'
        : '#6BCB77'

  const subjectBg =
    subjectId === 'math' ? '#FFF0F0'
      : subjectId === 'english' ? '#F0F5FF'
        : '#F0FFF4'

  // Debug logs for progress and lessons
  console.log('Progress records:', progress)
  console.log('Lessons:', lessons.map(l => ({ id: l.id, order: l.order })))

  // Robust unlock logic
  const isLessonUnlocked = (lesson: Lesson) => {
    if (lesson.order === 1) return true
    const previousLesson = lessons.find((l) => l.order === lesson.order - 1)
    if (!previousLesson) return true
    const previousProgress = progress.find((p) => p.lessonId === previousLesson.id)
    console.log(
      `Checking unlock for lesson ${lesson.id}:`,
      'Previous lesson:', previousLesson.id,
      'Previous progress:', previousProgress,
      'Status:', previousProgress?.status
    )
    return previousProgress?.status === 'completed'
  }

  return (
    <div style={{
      width: '100%', minHeight: '100vh',
      background: '#FFFBF0', overflowX: 'hidden',
      fontFamily: "'Lexend', system-ui, sans-serif", position: 'relative',
    }}>
      <style>{`
        html, body {
          background: #FFFBF0 !important;
          margin: 0; padding: 0; overflow-x: hidden;
        }
        .lesson-card-unlocked {
          background: #FFFFFF;
          border: 2.5px solid #2D2D2D;
          border-radius: 24px;
          box-shadow: 5px 5px 0 #2D2D2D;
          padding: 1.75rem;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          position: relative;
          text-decoration: none;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .lesson-card-unlocked:hover {
          transform: translate(-4px, -4px);
          box-shadow: 9px 9px 0 #2D2D2D;
        }
        .lesson-card-locked {
          background: #F5F5F5;
          border: 2.5px solid #BDBDBD;
          border-radius: 24px;
          box-shadow: 3px 3px 0 #BDBDBD;
          padding: 1.75rem;
          cursor: not-allowed;
          opacity: 0.65;
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .lessons-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }
        @media (max-width: 640px) {
          .lessons-grid { grid-template-columns: 1fr !important; }
        }
        .back-btn {
          font-family: 'Lexend', system-ui, sans-serif;
          font-weight: 800;
          font-size: 0.95rem;
          background: #FFFFFF;
          color: #2D2D2D;
          border: 2.5px solid #2D2D2D;
          border-radius: 9999px;
          padding: 0.5rem 1.25rem;
          cursor: pointer;
          box-shadow: 3px 3px 0 #2D2D2D;
          margin-bottom: 2rem;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: transform 0.15s, box-shadow 0.15s;
        }
        .back-btn:hover {
          transform: translate(-2px, -2px);
          box-shadow: 5px 5px 0 #2D2D2D;
        }
      `}</style>

      {/* Background blobs */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', width: 500, height: 500,
          borderRadius: '50%', background: '#FFD93D',
          filter: 'blur(80px)', opacity: 0.1, top: -130, left: -100,
        }} />
        <div style={{
          position: 'absolute', width: 400, height: 400,
          borderRadius: '50%', background: '#4D96FF',
          filter: 'blur(80px)', opacity: 0.1, top: '33%', right: -100,
        }} />
        <div style={{
          position: 'absolute', width: 350, height: 350,
          borderRadius: '50%', background: '#6BCB77',
          filter: 'blur(80px)', opacity: 0.1, bottom: 40, left: '25%',
        }} />
      </div>

      {/* Navbar */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <Navbar />
      </div>

      {/* Main content */}
      <main style={{
        position: 'relative', zIndex: 5,
        maxWidth: 1100, margin: '0 auto',
        padding: '2.5rem 2rem',
      }}>

        {/* Back button */}
        <button
          className="back-btn"
          onClick={() => router.push('/dashboard')}
        >
          ← Back to Dashboard
        </button>

        {/* Subject header panel */}
        <div style={{
          background: subjectBg,
          border: '2.5px solid #2D2D2D',
          borderRadius: 24,
          boxShadow: '5px 5px 0 #2D2D2D',
          padding: '2rem',
          marginBottom: '2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.5rem',
        }}>

          {/* Left: icon + title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{
              width: 72, height: 72, borderRadius: 20,
              background: '#FFFFFF', border: '2.5px solid #2D2D2D',
              boxShadow: '3px 3px 0 #2D2D2D',
              display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: '2.5rem',
              flexShrink: 0,
            }}>
              {subject?.icon}
            </div>
            <div>
              <h1 style={{
                fontFamily: "'Fredoka One', cursive",
                fontSize: 'clamp(2rem, 5vw, 3rem)',
                color: subjectColor, lineHeight: 1.1,
                marginBottom: '0.25rem', margin: 0,
              }}>
                {subject?.name}
              </h1>
              <p style={{
                fontWeight: 600, fontSize: '1.05rem',
                color: '#7A7A7A', margin: 0,
              }}>
                {subject?.description}
              </p>
            </div>
          </div>

          {/* Right: progress pill */}
          <div style={{
            display: 'flex', flexDirection: 'column',
            alignItems: 'flex-end', gap: '0.5rem', minWidth: 180,
          }}>
            <div style={{
              fontFamily: "'Lexend', system-ui, sans-serif",
              fontWeight: 800, fontSize: '0.9rem', color: '#7A7A7A',
              display: 'flex', justifyContent: 'space-between',
              width: '100%',
            }}>
              <span>Progress</span>
              <span style={{ color: subjectColor }}>{completionPercentage}%</span>
            </div>
            <div style={{
              width: '100%', height: 14,
              background: '#EDE8D0', borderRadius: 9999,
              border: '1.5px solid #2D2D2D', overflow: 'hidden',
            }}>
              <div style={{
                height: '100%',
                width: `${completionPercentage}%`,
                background: subjectColor,
                borderRadius: 9999,
                transition: 'width 0.5s ease',
              }} />
            </div>
            <p style={{
              fontWeight: 700, fontSize: '0.85rem',
              color: '#7A7A7A', margin: 0,
            }}>
              {completedCount} / {lessons.length} lessons complete
            </p>
          </div>

        </div>

        {/* Section header */}
        <div style={{ marginBottom: '1.25rem' }}>
          <p style={{
            fontWeight: 900, fontSize: '0.75rem', color: '#7A7A7A',
            letterSpacing: 3, textTransform: 'uppercase',
            marginBottom: '0.3rem', margin: '0 0 0.3rem 0',
          }}>
            {lessons.length} Lessons Available
          </p>
          <h2 style={{
            fontFamily: "'Fredoka One', cursive",
            fontSize: '2rem', color: '#2D2D2D',
            margin: 0,
          }}>
            Pick a lesson to start! 🎯
          </h2>
        </div>

        {/* Lessons grid */}
        <div className="lessons-grid">
          {lessons.map((lesson) => {
            const isCompleted = progress.some(
              (p) => p.lessonId === lesson.id && p.status === 'completed'
            )
            const isUnlocked = isLessonUnlocked(lesson)
            if (isUnlocked) {
              return (
                <div
                  key={lesson.id}
                  className="lesson-card-unlocked"
                  onClick={() => router.push(`/quiz/${lesson.id}`)}
                >
                  {/* Top row */}
                  <div style={{
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'space-between', marginBottom: '0.5rem',
                  }}>
                    <div style={{
                      fontFamily: "'Fredoka One', cursive",
                      fontSize: '1rem', color: subjectColor,
                      background: subjectBg,
                      border: `2px solid ${subjectColor}`,
                      borderRadius: 9999, padding: '0.2rem 0.75rem',
                    }}>
                      Lesson {lesson.order}
                    </div>
                    <div style={{
                      width: 36, height: 36, borderRadius: '50%',
                      background: subjectColor, border: '2px solid #2D2D2D',
                      display: 'flex', alignItems: 'center',
                      justifyContent: 'center', fontSize: '1rem', color: '#FFFFFF',
                    }}>
                      {isCompleted ? '✓' : '▶'}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 style={{
                    fontFamily: "'Fredoka One', cursive",
                    fontSize: '1.4rem', color: subjectColor,
                    marginBottom: '0.25rem', margin: '0 0 0.25rem 0',
                  }}>
                    {lesson.title}
                  </h3>

                  {/* Description */}
                  <p style={{
                    fontWeight: 600, fontSize: '0.95rem',
                    color: '#7A7A7A', lineHeight: 1.5,
                    marginBottom: '0.75rem', margin: '0 0 0.75rem 0',
                  }}>
                    {lesson.description}
                  </p>

                  {/* Difficulty stars */}
                  <div style={{ display: 'flex', gap: '0.25rem', marginTop: 'auto' }}>
                    {Array.from({ length: lesson.difficulty }).map((_, i) => (
                      <span key={i} style={{ fontSize: '1.1rem' }}>⭐</span>
                    ))}
                  </div>

                  {/* Completed badge */}
                  {isCompleted && (
                    <div style={{
                      marginTop: '0.875rem',
                      padding: '0.4rem 0.875rem',
                      background: '#F0FFF4',
                      border: '1.5px solid #6BCB77',
                      borderRadius: 9999,
                      fontWeight: 800, fontSize: '0.8rem',
                      color: '#6BCB77', alignSelf: 'flex-start',
                    }}>
                      ✓ Completed
                    </div>
                  )}
                </div>
              )
            }
            // Locked card
            return (
              <div key={lesson.id} className="lesson-card-locked">
                <div style={{
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'space-between', marginBottom: '0.5rem',
                }}>
                  <div style={{
                    fontFamily: "'Fredoka One', cursive",
                    fontSize: '1rem', color: '#BDBDBD',
                    background: '#EEEEEE', border: '2px solid #BDBDBD',
                    borderRadius: 9999, padding: '0.2rem 0.75rem',
                  }}>
                    Lesson {lesson.order}
                  </div>
                  <div style={{
                    width: 36, height: 36, borderRadius: '50%',
                    background: '#EEEEEE', border: '2px solid #BDBDBD',
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontSize: '1rem',
                  }}>
                    🔒
                  </div>
                </div>

                <h3 style={{
                  fontFamily: "'Fredoka One', cursive",
                  fontSize: '1.4rem', color: '#BDBDBD',
                  marginBottom: '0.25rem', margin: '0 0 0.25rem 0',
                }}>
                  {lesson.title}
                </h3>

                <p style={{
                  fontWeight: 600, fontSize: '0.95rem',
                  color: '#BDBDBD', lineHeight: 1.5,
                  marginBottom: '0.75rem', margin: '0 0 0.75rem 0',
                }}>
                  {lesson.description}
                </p>

                <div style={{ display: 'flex', gap: '0.25rem', marginTop: 'auto' }}>
                  {Array.from({ length: lesson.difficulty }).map((_, i) => (
                    <span key={i} style={{ fontSize: '1.1rem', opacity: 0.4 }}>⭐</span>
                  ))}
                </div>

                <div style={{
                  marginTop: '0.875rem',
                  padding: '0.5rem 0.875rem',
                  background: '#EEEEEE',
                  border: '1.5px solid #BDBDBD',
                  borderRadius: 9999,
                  fontWeight: 800, fontSize: '0.8rem',
                  color: '#BDBDBD', textAlign: 'center',
                  alignSelf: 'flex-start',
                }}>
                  🔒 Complete previous lesson to unlock
                </div>
              </div>
            )
          })}
        </div>

      </main>
    </div>
  )
}

'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useAuth } from '@/context/AuthContext'
import { Navbar } from '@/components/ui/Navbar'
import { useProgress, getSubjectCompletion } from '@/hooks/useProgress'
import { useSubjects } from '@/hooks/useLessons'
import { SUBJECTS } from '@/constants/subjects'

export default function ProgressPage() {
  const { isAuthenticated, isLoading, user } = useAuth()
  const router = useRouter()
  const { progress } = useProgress(null, user?.uid ?? undefined)
  // ...existing code...
  useSubjects(); // keep hook call for side effects if any, but do not destructure unused 'subjects'

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
        gap: '1rem', fontFamily: "'Nunito', sans-serif",
      }}>
        <div style={{ fontSize: '4rem', animation: 'spin 1s linear infinite' }}>⏳</div>
        <p style={{
          fontFamily: "'Fredoka One', cursive",
          fontSize: '2rem', color: '#2D2D2D',
        }}>
          Loading your progress...
        </p>
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const completedLessons = progress.filter((p) => p.status === 'completed')
  const avgScore =
    completedLessons.length > 0
      ? Math.round(
          completedLessons.reduce((sum, p) => sum + p.score, 0) /
            completedLessons.length
        )
      : 0

  // --- NEW COMPUTED VARIABLES ---
  const displayName = user?.displayName?.trim() || user?.email?.split('@')[0] || 'Explorer';
  const subjectStats = SUBJECTS.map((subject) => {
    const totalLessons = 5;
    const completed = getSubjectCompletion(progress, subject.id);
    const pct = Math.round((completed / totalLessons) * 100);
    const color = subject.id === 'math' ? '#FF6B6B'
      : subject.id === 'english' ? '#4D96FF' : '#6BCB77';
    const bg = subject.id === 'math' ? '#FFF0F0'
      : subject.id === 'english' ? '#F0F5FF' : '#F0FFF4';
    return { subject, totalLessons, completed, pct, color, bg };
  });
  const statsStrip = [
    { icon: '📚', bg: '#F0F5FF', num: progress.length,         label: 'Lessons Started' },
    { icon: '✅', bg: '#F0FFF4', num: completedLessons.length, label: 'Lessons Completed' },
    { icon: '⭐', bg: '#FFF9E6', num: `${avgScore}%`,           label: 'Average Score' },
    { icon: '🏆', bg: '#FFF0F0', num: 0,                       label: 'Badges Earned' },
  ];

  // --- NEW RETURN ---
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@400;600;700;800;900&display=swap');
        html, body {
          background: #FFFBF0 !important;
          margin: 0; padding: 0; overflow-x: hidden;
        }
        .prog-card {
          background: #FFFFFF;
          border: 2.5px solid #2D2D2D;
          border-radius: 24px;
          box-shadow: 5px 5px 0 #2D2D2D;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .prog-card:hover {
          transform: translate(-3px,-3px);
          box-shadow: 8px 8px 0 #2D2D2D;
        }
        .stat-card {
          background: #FFFFFF;
          border: 2.5px solid #2D2D2D;
          border-radius: 20px;
          box-shadow: 4px 4px 0 #2D2D2D;
          padding: 1.25rem 1.5rem;
          display: flex; align-items: center; gap: 1rem;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .stat-card:hover {
          transform: translate(-3px,-3px);
          box-shadow: 7px 7px 0 #2D2D2D;
        }
        .lesson-row {
          display: flex; align-items: center;
          justify-content: space-between; gap: 1rem;
          padding: 1rem 1.25rem;
          background: #FFFBF0;
          border: 2px solid #EDE8D0;
          border-radius: 16px;
          transition: border-color 0.15s ease;
        }
        .lesson-row:hover { border-color: #2D2D2D; }
        @media (max-width: 900px) {
          .stats-strip { grid-template-columns: repeat(2,1fr) !important; }
          .subj-grid   { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 600px) {
          .stats-strip { grid-template-columns: repeat(2,1fr) !important; }
          .subj-grid   { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div style={{
        width: '100%', minHeight: '100vh',
        background: '#FFFBF0', overflowX: 'hidden',
        fontFamily: "'Nunito', sans-serif", position: 'relative',
      }}>

        {/* BACKGROUND BLOBS */}
        <div style={{ position:'fixed', inset:0, zIndex:0,
          pointerEvents:'none', overflow:'hidden' }}>
          <div style={{ position:'absolute', width:500, height:500,
            borderRadius:'50%', background:'#FFD93D',
            filter:'blur(80px)', opacity:0.1, top:-130, left:-100 }} />
          <div style={{ position:'absolute', width:400, height:400,
            borderRadius:'50%', background:'#4D96FF',
            filter:'blur(80px)', opacity:0.1, top:'33%', right:-100 }} />
          <div style={{ position:'absolute', width:350, height:350,
            borderRadius:'50%', background:'#6BCB77',
            filter:'blur(80px)', opacity:0.1, bottom:40, left:'25%' }} />
        </div>

        {/* NAVBAR */}
        <div style={{ position:'relative', zIndex:10 }}>
          <Navbar />
        </div>

        {/* PAGE CONTENT */}
        <motion.main
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            position: 'relative', zIndex: 5,
            maxWidth: 1100, margin: '0 auto',
            padding: '2.5rem 2rem',
          }}
        >

          {/* PAGE HEADER */}
          <motion.div variants={itemVariants} style={{ marginBottom: '2.5rem' }}>
            <div style={{
              display: 'flex', alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap', gap: '1rem',
            }}>
              <div>
                <h1 style={{
                  fontFamily: "'Fredoka One', cursive",
                  fontSize: 'clamp(2rem, 5vw, 3rem)',
                  color: '#2D2D2D', lineHeight: 1.1,
                  marginBottom: '0.25rem',
                }}>
                  📊 Your Progress
                </h1>
                <p style={{ fontWeight: 600, fontSize: '1.05rem', color: '#7A7A7A' }}>
                  Keep going, {displayName}! You&apos;re doing amazing! 🌟
                </p>
              </div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                background: '#FFFFFF', border: '2.5px solid #2D2D2D',
                borderRadius: 9999, padding: '0.6rem 1.25rem',
                boxShadow: '3px 3px 0 #2D2D2D',
                fontWeight: 800, fontSize: '0.95rem',
                color: '#2D2D2D', whiteSpace: 'nowrap',
              }}>
                🎯 <span style={{ color: '#4D96FF' }}>
                  {completedLessons.length} lessons done!
                </span>
              </div>
            </div>
          </motion.div>

          {/* STATS STRIP */}
          <motion.div
            variants={itemVariants}
            className="stats-strip"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4,1fr)',
              gap: '1rem', marginBottom: '2.5rem',
            }}
          >
            {statsStrip.map((s) => (
              <div key={s.label} className="stat-card">
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
                  <div style={{
                    fontFamily: "'Fredoka One', cursive",
                    fontSize: '1.75rem', color: '#2D2D2D', lineHeight: 1,
                  }}>
                    {s.num}
                  </div>
                  <div style={{
                    fontWeight: 700, fontSize: '0.8rem',
                    color: '#7A7A7A', marginTop: '0.1rem',
                  }}>
                    {s.label}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* SUBJECT SECTION HEADER */}
          <motion.div variants={itemVariants} style={{ marginBottom: '1.25rem' }}>
            <p style={{
              fontWeight: 900, fontSize: '0.75rem', color: '#7A7A7A',
              letterSpacing: 3, textTransform: 'uppercase',
              marginBottom: '0.3rem',
            }}>
              Subject Breakdown
            </p>
            <h2 style={{
              fontFamily: "'Fredoka One', cursive",
              fontSize: '2rem', color: '#2D2D2D',
              marginBottom: '1.5rem',
            }}>
              How are you doing? 🎯
            </h2>
          </motion.div>

          {/* SUBJECT CARDS */}
          <motion.div
            variants={itemVariants}
            className="subj-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3,1fr)',
              gap: '1.5rem', marginBottom: '2.5rem',
            }}
          >
            {subjectStats.map(({ subject, totalLessons, completed, pct, color, bg }) => (
              <div key={subject.id} className="prog-card" style={{ padding: '2rem 1.75rem' }}>

                {/* Subject header */}
                <div style={{
                  display: 'flex', alignItems: 'center',
                  gap: '0.75rem', marginBottom: '1.25rem',
                }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: 16,
                    background: bg, border: '2px solid #2D2D2D',
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontSize: '1.75rem',
                    flexShrink: 0,
                  }}>
                    {subject.icon}
                  </div>
                  <div>
                    <h3 style={{
                      fontFamily: "'Fredoka One', cursive",
                      fontSize: '1.5rem', color, lineHeight: 1,
                    }}>
                      {subject.name}
                    </h3>
                    <p style={{
                      fontWeight: 700, fontSize: '0.85rem', color: '#7A7A7A',
                    }}>
                      {completed} / {totalLessons} lessons
                    </p>
                  </div>
                </div>

                {/* Big percentage */}
                <div style={{
                  fontFamily: "'Fredoka One', cursive",
                  fontSize: '3.5rem', color, lineHeight: 1,
                  marginBottom: '1rem',
                }}>
                  {pct}%
                </div>

                {/* Progress bar */}
                <div style={{
                  width: '100%', height: 14,
                  background: '#EDE8D0', borderRadius: 9999,
                  border: '1.5px solid #2D2D2D',
                  overflow: 'hidden', marginBottom: '1rem',
                }}>
                  <div style={{
                    height: '100%', width: `${pct}%`,
                    background: color, borderRadius: 9999,
                    transition: 'width 0.5s ease',
                    minWidth: pct > 0 ? 8 : 0,
                  }} />
                </div>

                {/* Status badge */}
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                  background: pct === 0 ? '#F5F5F5'
                    : pct === 100 ? '#F0FFF4' : '#FFF9E6',
                  border: `2px solid ${pct === 0 ? '#BDBDBD'
                    : pct === 100 ? '#6BCB77' : '#FFD93D'}`,
                  borderRadius: 9999, padding: '0.3rem 0.875rem',
                  fontWeight: 800, fontSize: '0.8rem',
                  color: pct === 0 ? '#7A7A7A'
                    : pct === 100 ? '#6BCB77' : '#2D2D2D',
                }}>
                  {pct === 0
                    ? '🔒 Not started'
                    : pct === 100
                    ? '🏆 Complete!'
                    : '🔥 In progress'}
                </div>
              </div>
            ))}
          </motion.div>

          {/* COMPLETED LESSONS */}
          <motion.div variants={itemVariants}>
            <div style={{
              background: '#FFFFFF',
              border: '2.5px solid #2D2D2D',
              borderRadius: 24,
              boxShadow: '5px 5px 0 #2D2D2D',
              padding: '2rem',
            }}>
              <h2 style={{
                fontFamily: "'Fredoka One', cursive",
                fontSize: '1.75rem', color: '#2D2D2D',
                marginBottom: '1.5rem',
                display: 'flex', alignItems: 'center', gap: '0.5rem',
              }}>
                ✅ Completed Lessons
              </h2>

              {completedLessons.length === 0 ? (
                <div style={{
                  textAlign: 'center', padding: '3rem 1rem',
                  fontFamily: "'Nunito', sans-serif",
                }}>
                  <div style={{ fontSize: '3.5rem', marginBottom: '0.875rem' }}>🚀</div>
                  <p style={{
                    fontWeight: 800, fontSize: '1.1rem',
                    color: '#2D2D2D', marginBottom: '0.4rem',
                  }}>
                    No lessons completed yet!
                  </p>
                  <p style={{ fontWeight: 600, fontSize: '1rem', color: '#7A7A7A' }}>
                    Head to the dashboard and start your first lesson!
                  </p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                  {completedLessons.slice(0, 10).map((comp) => {
                    const scorePct = Math.round(
                      (comp.score / comp.totalQuestions) * 100
                    )
                    const scoreColor = scorePct >= 80 ? '#6BCB77'
                      : scorePct >= 50 ? '#FFD93D' : '#FF6B6B'
                    const subjectIcon = comp.subjectId === 'math' ? '🔢'
                      : comp.subjectId === 'english' ? '📖' : '🔬'
                    const subjectBg = comp.subjectId === 'math' ? '#FFF0F0'
                      : comp.subjectId === 'english' ? '#F0F5FF' : '#F0FFF4'

                    return (
                      <div key={comp.id} className="lesson-row">
                        <div style={{
                          width: 44, height: 44, borderRadius: 12,
                          background: subjectBg, border: '2px solid #2D2D2D',
                          display: 'flex', alignItems: 'center',
                          justifyContent: 'center', fontSize: '1.25rem',
                          flexShrink: 0,
                        }}>
                          {subjectIcon}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{
                            fontWeight: 800, fontSize: '1rem',
                            color: '#2D2D2D', marginBottom: '0.15rem',
                            whiteSpace: 'nowrap', overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}>
                            Lesson {comp.lessonId}
                          </p>
                          <p style={{ fontWeight: 600, fontSize: '0.8rem', color: '#7A7A7A' }}>
                            {comp.completedAt
                              ? new Date(comp.completedAt as unknown as number).toLocaleDateString(
                                  'en-US', { month:'short', day:'numeric', year:'numeric' }
                                )
                              : 'No date'}
                          </p>
                        </div>
                        <div style={{ textAlign: 'right', flexShrink: 0 }}>
                          <div style={{
                            fontFamily: "'Fredoka One', cursive",
                            fontSize: '1.5rem', color: scoreColor, lineHeight: 1,
                          }}>
                            {scorePct}%
                          </div>
                          <p style={{
                            fontWeight: 700, fontSize: '0.8rem',
                            color: '#7A7A7A', marginTop: '0.1rem',
                          }}>
                            {comp.score}/{comp.totalQuestions} correct
                          </p>
                        </div>
                        <div style={{
                          fontFamily: "'Fredoka One', cursive",
                          fontSize: '1.1rem', flexShrink: 0, color: scoreColor,
                        }}>
                          {scorePct >= 80 ? '⭐⭐⭐' : scorePct >= 50 ? '⭐⭐' : '⭐'}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </motion.div>

        </motion.main>
      </div>
    </>
  );
}

'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { useLesson, useSubject } from '@/hooks/useLessons'
import { useProgress } from '@/hooks/useProgress'

interface QuizClientProps {
  lessonId: string
}

export default function QuizClient({ lessonId }: QuizClientProps) {
  // ── 1. All hooks — unconditional ──
  const { isAuthenticated, isLoading, user } = useAuth()
  const router = useRouter()
  const lesson = useLesson(lessonId)
  const subject = useSubject(lesson?.subjectId ?? '')
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [isAnswered, setIsAnswered] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | undefined>()
  const [showResults, setShowResults] = useState(false)
  const { saveProgress } = useProgress(null, user?.uid ?? undefined)

  // ── 2. Effects ──
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, isLoading, router])

  // ── 3. Early returns — after ALL hooks ──
  if (isLoading || !lesson) {
    return (
      <div style={{
        minHeight: '100vh', background: '#FFFBF0',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{ fontFamily: "'Poppins', system-ui, sans-serif", fontSize: '2rem', color: '#2D2D2D' }}>
          ⏳ Loading...
        </div>
      </div>
    )
  }

  if (!subject) {
    return (
      <div style={{
        minHeight: '100vh', background: '#FFFBF0',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{ fontFamily: "'Poppins', system-ui, sans-serif", fontSize: '2rem', color: '#FF6B6B' }}>
          Subject not found
        </div>
      </div>
    )
  }

  // ── 4. Computed values ──
  const questions = lesson.content.items
  const currentQuestion = questions[currentQuestionIndex]
  const totalQuestions = questions.length

  const subjectColor =
    lesson.subjectId === 'math' ? '#FF6B6B'
      : lesson.subjectId === 'english' ? '#4D96FF'
        : '#6BCB77'

  const subjectBg =
    lesson.subjectId === 'math' ? '#FFF0F0'
      : lesson.subjectId === 'english' ? '#F0F5FF'
        : '#F0FFF4'

  const progressPct = Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100)

  // ── 5. Handlers ──
  const handleAnswer = (optionIndex: number) => {
    setSelectedAnswer(optionIndex)
    setIsAnswered(true)
    setAnswers([...answers, optionIndex])
  }

  const handleNext = async () => {
    if (currentQuestionIndex + 1 < totalQuestions) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setIsAnswered(false)
      setSelectedAnswer(undefined)
    } else {
      const finalScore = [...answers, selectedAnswer].filter(
        (ans, i) => ans === questions[i]?.answer
      ).length
      if (user?.uid) {
        try {
          await saveProgress({
            lessonId: lesson.id,
            subjectId: lesson.subjectId,
            status: 'completed',
            score: finalScore,
            totalQuestions: questions.length,
            completedAt: new Date(),
          })
        } catch (error) {
          console.error('Failed to save progress:', error)
        }
      } else {
        console.error('Cannot save — user not logged in')
      }
      setShowResults(true)
    }
  }

  const handleTryAgain = () => {
    setCurrentQuestionIndex(0)
    setAnswers([])
    setIsAnswered(false)
    setSelectedAnswer(undefined)
    setShowResults(false)
  }

  // ── 6. Results screen ──
  if (showResults) {
    const finalScore = answers.filter(
      (ans, i) => ans === questions[i]?.answer
    ).length
    const scorePercent = totalQuestions > 0
      ? Math.round((finalScore / totalQuestions) * 100) : 0
    const scoreColor = scorePercent === 100 ? '#6BCB77'
      : scorePercent >= 60 ? '#FFD93D' : '#FF6B6B'
    const starCount = scorePercent === 100 ? 3
      : scorePercent >= 60 ? 2 : 1

    return (
      <>
        <style>{`
          html, body { background: #FFFBF0 !important; margin: 0; padding: 0; }
          @keyframes popIn {
            0%   { transform: scale(0.8); opacity: 0; }
            70%  { transform: scale(1.05); }
            100% { transform: scale(1); opacity: 1; }
          }
          .pop-in { animation: popIn 0.5s ease both; }
        `}</style>

        <div style={{
          width: '100%', minHeight: '100vh',
          background: '#FFFBF0',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: '2rem 1.5rem',
          fontFamily: "'Poppins', system-ui, sans-serif",
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
            <div style={{
              position: 'absolute', width: 400, height: 400,
              borderRadius: '50%', background: scoreColor,
              filter: 'blur(80px)', opacity: 0.1, top: -100, left: -80,
            }} />
            <div style={{
              position: 'absolute', width: 350, height: 350,
              borderRadius: '50%', background: '#FFD93D',
              filter: 'blur(80px)', opacity: 0.1, bottom: 0, right: -80,
            }} />
          </div>

          <div style={{
            position: 'relative', zIndex: 5,
            width: '100%', maxWidth: 560,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: '1.5rem',
          }}>
            <div className="pop-in" style={{ fontSize: 'clamp(4rem,15vw,7rem)', lineHeight: 1 }}>
              {finalScore === totalQuestions ? '🏆' : finalScore >= totalQuestions * 0.6 ? '🌟' : '💪'}
            </div>

            <h1 style={{
              fontFamily: "'Poppins', system-ui, sans-serif",
              fontSize: 'clamp(2.5rem, 8vw, 4rem)',
              color: '#2D2D2D', lineHeight: 1.1,
              textAlign: 'center', margin: 0,
            }}>
              {finalScore === totalQuestions
                ? 'Perfect Score! 🎉'
                : finalScore >= totalQuestions * 0.6
                  ? 'Great Job! 🌟'
                  : 'Keep Trying! 💪'}
            </h1>

            <p style={{ fontWeight: 700, fontSize: '1rem', color: '#7A7A7A', margin: 0 }}>
              {lesson?.title}
            </p>

            <div style={{
              width: '100%', background: '#FFFFFF',
              border: '2.5px solid #2D2D2D', borderRadius: 28,
              boxShadow: '6px 6px 0 #2D2D2D', padding: '2.5rem',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: '1.25rem',
            }}>
              <div style={{
                fontFamily: "'Poppins', system-ui, sans-serif",
                fontSize: 'clamp(4rem, 15vw, 6rem)',
                color: scoreColor, lineHeight: 1,
              }}>
                {scorePercent}%
              </div>

              <p style={{ fontWeight: 800, fontSize: '1.25rem', color: '#2D2D2D', margin: 0 }}>
                {finalScore} out of {totalQuestions} correct
              </p>

              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                {[1, 2, 3].map((star) => (
                  <span key={star} style={{
                    fontSize: '2.5rem',
                    opacity: star <= starCount ? 1 : 0.2,
                    filter: star <= starCount ? 'none' : 'grayscale(1)',
                  }}>⭐</span>
                ))}
              </div>

              <div style={{
                background: scorePercent === 100 ? '#F0FFF4' : scorePercent >= 60 ? '#FFF9E6' : '#FFF0F0',
                border: `2px solid ${scorePercent === 100 ? '#6BCB77' : scorePercent >= 60 ? '#FFD93D' : '#FF6B6B'}`,
                borderRadius: 14, padding: '0.75rem 1.5rem',
                fontWeight: 800, fontSize: '1rem',
                color: scorePercent === 100 ? '#6BCB77' : scorePercent >= 60 ? '#2D2D2D' : '#FF6B6B',
                textAlign: 'center',
              }}>
                {scorePercent === 100 ? '🌟 Perfect! You are a superstar!'
                  : scorePercent >= 80 ? '🔥 Excellent work! Almost perfect!'
                  : scorePercent >= 60 ? '👍 Good job! Keep practicing!'
                  : "💪 Don't give up! Try again!"}
              </div>

              <div style={{
                width: '100%', height: 16, background: '#EDE8D0',
                borderRadius: 9999, border: '2px solid #2D2D2D', overflow: 'hidden',
              }}>
                <div style={{
                  height: '100%', width: `${scorePercent}%`,
                  background: scoreColor, borderRadius: 9999, transition: 'width 1s ease',
                }} />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', width: '100%' }}>
              <button onClick={handleTryAgain} style={{
                fontFamily: "'Poppins', system-ui, sans-serif",
                fontWeight: 900, fontSize: '1.1rem',
                background: '#FF6B6B', color: '#FFFFFF',
                border: '2.5px solid #2D2D2D', borderRadius: 9999,
                padding: '0.875rem 2rem', cursor: 'pointer',
                boxShadow: '4px 4px 0 #2D2D2D', flex: 1, minWidth: 160,
              }}>
                🔄 Try Again
              </button>
              <button onClick={() => router.push(`/lessons/${lesson?.subjectId}`)} style={{
                fontFamily: "'Poppins', system-ui, sans-serif",
                fontWeight: 900, fontSize: '1.1rem',
                background: '#FFD93D', color: '#2D2D2D',
                border: '2.5px solid #2D2D2D', borderRadius: 9999,
                padding: '0.875rem 2rem', cursor: 'pointer',
                boxShadow: '4px 4px 0 #2D2D2D', flex: 1, minWidth: 160,
              }}>
                📚 Back to Lessons
              </button>
            </div>
          </div>
        </div>
      </>
    )
  }

  const letters = ['A', 'B', 'C', 'D']

  // ── 7. Main quiz render ──
  return (
    <>
      <style>{`
        html, body { background: #FFFBF0 !important; margin: 0; padding: 0; overflow-x: hidden; }
        .answer-btn {
          font-family: 'Poppins', system-ui, sans-serif; font-weight: 900;
          font-size: clamp(1rem, 2.5vw, 1.15rem); background: #FFFFFF; color: #2D2D2D;
          border: 2.5px solid #2D2D2D; border-radius: 20px; padding: 1.25rem 1.5rem;
          width: 100%; cursor: pointer; box-shadow: 4px 4px 0 #2D2D2D;
          transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease, color 0.15s ease;
          text-align: left; display: flex; align-items: center; gap: 1rem; min-height: 72px;
        }
        .answer-btn:hover:not(:disabled) { transform: translate(-3px, -3px); box-shadow: 7px 7px 0 #2D2D2D; background: #FFFBF0; }
        .answer-btn:disabled { cursor: default; }
        .answer-btn.correct { background: #6BCB77; color: #FFFFFF; border-color: #2D2D2D; box-shadow: 4px 4px 0 #2D2D2D; transform: translate(-2px, -2px); }
        .answer-btn.wrong { background: #FF6B6B; color: #FFFFFF; border-color: #2D2D2D; box-shadow: 4px 4px 0 #2D2D2D; }
        .answer-btn.revealed { background: #6BCB77; color: #FFFFFF; border-color: #2D2D2D; box-shadow: 4px 4px 0 #2D2D2D; }
        .next-btn {
          font-family: 'Poppins', system-ui, sans-serif; font-weight: 900; font-size: 1.15rem;
          background: #FFD93D; color: #2D2D2D; border: 2.5px solid #2D2D2D; border-radius: 9999px;
          padding: 1rem 3rem; cursor: pointer; box-shadow: 4px 4px 0 #2D2D2D;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
          display: inline-flex; align-items: center; gap: 0.5rem;
        }
        .next-btn:hover { transform: translate(-3px, -3px); box-shadow: 7px 7px 0 #2D2D2D; }
        @keyframes popIn { 0% { transform: scale(0.8); opacity: 0; } 70% { transform: scale(1.05); } 100% { transform: scale(1); opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(16px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .pop-in { animation: popIn 0.35s ease both; }
        .slide-up { animation: slideUp 0.3s ease both; }
        @media (max-width: 640px) { .answers-grid { grid-template-columns: 1fr !important; } }
      `}</style>

      <div style={{
        width: '100%', minHeight: '100vh', background: '#FFFBF0', overflowX: 'hidden',
        fontFamily: "'Poppins', system-ui, sans-serif", position: 'relative',
        display: 'flex', flexDirection: 'column',
      }}>
        {/* Background blobs */}
        <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: subjectColor, filter: 'blur(80px)', opacity: 0.08, top: -100, left: -80 }} />
          <div style={{ position: 'absolute', width: 350, height: 350, borderRadius: '50%', background: '#FFD93D', filter: 'blur(80px)', opacity: 0.08, bottom: 0, right: -80 }} />
        </div>

        {/* Top bar */}
        <div style={{
          position: 'relative', zIndex: 10, width: '100%',
          background: 'rgba(255,251,240,0.95)', borderBottom: '2.5px solid #2D2D2D',
          backdropFilter: 'blur(8px)', padding: '0.875rem 2rem',
        }}>
          <div style={{ maxWidth: 800, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
              <button
                onClick={() => router.back()}
                style={{
                  fontFamily: "'Poppins', system-ui, sans-serif", fontWeight: 800, fontSize: '0.9rem',
                  background: '#FFFFFF', color: '#2D2D2D', border: '2px solid #2D2D2D', borderRadius: 9999,
                  padding: '0.35rem 0.875rem', cursor: 'pointer', boxShadow: '2px 2px 0 #2D2D2D',
                }}
              >← Back</button>
              <span style={{ fontFamily: "'Poppins', system-ui, sans-serif", fontSize: '1.1rem', color: subjectColor }}>
                {lesson.title}
              </span>
            </div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              background: '#FFFFFF', border: '2px solid #2D2D2D', borderRadius: 9999,
              padding: '0.35rem 1rem', boxShadow: '2px 2px 0 #2D2D2D',
              fontWeight: 800, fontSize: '0.9rem', color: '#2D2D2D', whiteSpace: 'nowrap', flexShrink: 0,
            }}>
              <span style={{ color: subjectColor }}>{currentQuestionIndex + 1}</span>
              <span style={{ color: '#7A7A7A' }}>of {totalQuestions}</span>
            </div>
          </div>
          <div style={{ maxWidth: 800, margin: '0.75rem auto 0', height: 10, background: '#EDE8D0', borderRadius: 9999, border: '1.5px solid #2D2D2D', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${progressPct}%`, background: subjectColor, borderRadius: 9999, transition: 'width 0.4s ease' }} />
          </div>
        </div>

        {/* Main quiz area */}
        <div style={{ position: 'relative', zIndex: 5, flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1.5rem' }}>
          <div style={{ width: '100%', maxWidth: 720 }}>

            {/* Question card */}
            <div key={currentQuestionIndex} className="slide-up" style={{
              background: '#FFFFFF', border: '2.5px solid #2D2D2D', borderRadius: 28,
              boxShadow: '6px 6px 0 #2D2D2D', padding: '2.5rem', marginBottom: '1.5rem',
            }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', background: subjectBg,
                border: `2px solid ${subjectColor}`, borderRadius: 9999, padding: '0.25rem 0.875rem',
                fontWeight: 900, fontSize: '0.78rem', color: subjectColor,
                textTransform: 'uppercase', letterSpacing: 1, marginBottom: '1.25rem',
              }}>
                Question {currentQuestionIndex + 1}
              </div>

              <h2 style={{
                fontFamily: "'Poppins', system-ui, sans-serif", fontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
                color: '#2D2D2D', lineHeight: 1.3,
                margin: currentQuestion?.imageUrl ? '0 0 1.25rem 0' : '0',
              }}>
                {currentQuestion?.question}
              </h2>

              {currentQuestion?.imageUrl && (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.25rem' }}>
                  <div style={{
                    background: subjectBg, border: '2.5px solid #2D2D2D', borderRadius: 20,
                    padding: '1.25rem 2rem', boxShadow: '3px 3px 0 #2D2D2D',
                    fontSize: 'clamp(4rem, 12vw, 7rem)', lineHeight: 1, textAlign: 'center',
                  }}>
                    {currentQuestion.imageUrl}
                  </div>
                </div>
              )}
            </div>

            {/* Answer buttons */}
            <div className="answers-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
              {currentQuestion?.options?.map((option, index) => {
                let btnClass = 'answer-btn'
                if (isAnswered) {
                  if (index === currentQuestion.answer) btnClass += ' correct'
                  else if (index === selectedAnswer && index !== currentQuestion.answer) btnClass += ' wrong'
                }
                return (
                  <button key={index} className={btnClass} disabled={isAnswered} onClick={() => handleAnswer(index)}>
                    {(() => {
                      const isCorrectBtn = index === currentQuestion.answer
                      const isWrongBtn = isAnswered && index === selectedAnswer && index !== currentQuestion.answer
                      const isHighlighted = isAnswered && (isCorrectBtn || isWrongBtn)
                      return (
                        <div style={{
                          width: 36, height: 36, borderRadius: '50%',
                          background: isHighlighted ? 'rgba(255,255,255,0.3)' : subjectBg,
                          border: `2px solid ${isHighlighted ? 'rgba(255,255,255,0.5)' : subjectColor}`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontFamily: "'Poppins', system-ui, sans-serif", fontSize: '1rem',
                          color: isHighlighted ? '#FFFFFF' : subjectColor, flexShrink: 0,
                        }}>
                          {letters[index]}
                        </div>
                      )
                    })()}
                    {option}
                  </button>
                )
              })}
            </div>

            {/* Feedback + Next */}
            {isAnswered && (
              <div className="pop-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
                <div style={{
                  width: '100%',
                  background: selectedAnswer === currentQuestion?.answer ? '#F0FFF4' : '#FFF0F0',
                  border: `2.5px solid ${selectedAnswer === currentQuestion?.answer ? '#6BCB77' : '#FF6B6B'}`,
                  borderRadius: 20, padding: '1.25rem 1.5rem',
                  display: 'flex', alignItems: 'center', gap: '1rem',
                  boxShadow: `3px 3px 0 ${selectedAnswer === currentQuestion?.answer ? '#6BCB77' : '#FF6B6B'}`,
                }}>
                  <span style={{ fontSize: '2.5rem', flexShrink: 0 }}>
                    {selectedAnswer === currentQuestion?.answer ? '🎉' : '💪'}
                  </span>
                  <div>
                    <p style={{
                      fontFamily: "'Poppins', system-ui, sans-serif", fontSize: '1.4rem',
                      color: selectedAnswer === currentQuestion?.answer ? '#6BCB77' : '#FF6B6B',
                      margin: '0 0 0.15rem 0',
                    }}>
                      {selectedAnswer === currentQuestion?.answer ? 'Correct! Well done!' : 'Not quite — keep going!'}
                    </p>
                    {selectedAnswer !== currentQuestion?.answer && (
                      <p style={{ fontWeight: 700, fontSize: '0.95rem', color: '#7A7A7A', margin: 0 }}>
                        The correct answer was:{' '}
                        <strong style={{ color: '#2D2D2D' }}>{currentQuestion?.options?.[currentQuestion.answer]}</strong>
                      </p>
                    )}
                  </div>
                </div>
                <button className="next-btn" onClick={handleNext}>
                  {currentQuestionIndex + 1 === totalQuestions ? '🏆 See Results' : 'Next Question →'}
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  )
}
'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

interface ResultScreenProps {
  score: number
  totalQuestions: number
  lessonTitle: string
  lessonId: string
  subjectId: string
  nextLessonId?: string
}

export function ResultScreen({
  score,
  totalQuestions,
  lessonTitle,
  lessonId,
  subjectId,
  nextLessonId,
}: ResultScreenProps) {
  const router = useRouter()
  const percentage = Math.round((score / totalQuestions) * 100)
  const starCount = percentage >= 80 ? 3 : percentage >= 60 ? 2 : 1
  const scoreColor = percentage >= 80 ? '#6BCB77'
    : percentage >= 60 ? '#FFD93D' : '#FF6B6B'

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@400;600;700;800;900&display=swap');
        @keyframes popIn {
          0%   { transform: scale(0.8); opacity: 0; }
          70%  { transform: scale(1.05); }
          100% { transform: scale(1); opacity: 1; }
        }
        .result-btn {
          font-family: 'Nunito', sans-serif;
          font-weight: 900;
          font-size: 1.1rem;
          border: 2.5px solid #2D2D2D;
          border-radius: 9999px;
          padding: 0.875rem 2rem;
          cursor: pointer;
          box-shadow: 4px 4px 0 #2D2D2D;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
          flex: 1;
          min-width: 160px;
        }
        .result-btn:hover {
          transform: translate(-2px, -2px);
          box-shadow: 6px 6px 0 #2D2D2D;
        }
      `}</style>

      <div style={{
        width: '100%', minHeight: '100vh',
        background: '#FFFBF0',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '2rem 1.5rem',
        fontFamily: "'Nunito', sans-serif",
        position: 'relative', overflow: 'hidden',
      }}>

        {/* Blobs */}
        <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
          <div style={{
            position: 'absolute', width: 400, height: 400,
            borderRadius: '50%', background: scoreColor,
            filter: 'blur(80px)', opacity: 0.08, top: -100, left: -80,
          }} />
          <div style={{
            position: 'absolute', width: 350, height: 350,
            borderRadius: '50%', background: '#FFD93D',
            filter: 'blur(80px)', opacity: 0.08, bottom: 0, right: -80,
          }} />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            position: 'relative', zIndex: 5,
            width: '100%', maxWidth: 560,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: '1.5rem',
          }}
        >
          {/* Trophy */}
          <motion.div
            variants={itemVariants}
            style={{ fontSize: 'clamp(4rem, 15vw, 7rem)', lineHeight: 1 }}
          >
            {percentage === 100 ? '🏆' : percentage >= 60 ? '🌟' : '💪'}
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            style={{
              fontFamily: "'Fredoka One', cursive",
              fontSize: 'clamp(2.5rem, 8vw, 4rem)',
              color: '#2D2D2D', lineHeight: 1.1,
              textAlign: 'center', margin: 0,
            }}
          >
            {percentage === 100 ? 'Perfect Score! 🎉'
              : percentage >= 60 ? 'Great Job! 🌟'
              : 'Keep Trying! 💪'}
          </motion.h1>

          {/* Lesson name */}
          <motion.p
            variants={itemVariants}
            style={{ fontWeight: 700, fontSize: '1rem', color: '#7A7A7A', margin: 0 }}
          >
            {lessonTitle}
          </motion.p>

          {/* Score card */}
          <motion.div
            variants={itemVariants}
            style={{
              width: '100%',
              background: '#FFFFFF',
              border: '2.5px solid #2D2D2D',
              borderRadius: 28,
              boxShadow: '6px 6px 0 #2D2D2D',
              padding: '2.5rem',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: '1.25rem',
            }}
          >
            {/* Big percentage */}
            <div style={{
              fontFamily: "'Fredoka One', cursive",
              fontSize: 'clamp(4rem, 15vw, 6rem)',
              color: scoreColor, lineHeight: 1,
            }}>
              {percentage}%
            </div>

            {/* Correct count */}
            <p style={{
              fontWeight: 800, fontSize: '1.25rem',
              color: '#2D2D2D', margin: 0,
            }}>
              {score} out of {totalQuestions} correct
            </p>

            {/* Stars */}
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
              {[1, 2, 3].map((star) => (
                <motion.span
                  key={star}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: star <= starCount ? 1 : 0.2, scale: 1 }}
                  transition={{ delay: star * 0.2 }}
                  style={{ fontSize: '2.5rem' }}
                >
                  ⭐
                </motion.span>
              ))}
            </div>

            {/* Feedback badge */}
            <div style={{
              background: percentage >= 80 ? '#F0FFF4'
                : percentage >= 60 ? '#FFF9E6' : '#FFF0F0',
              border: `2px solid ${scoreColor}`,
              borderRadius: 14,
              padding: '0.75rem 1.5rem',
              fontWeight: 800, fontSize: '1rem',
              color: scoreColor, textAlign: 'center',
            }}>
              {percentage === 100
                ? '🌟 Perfect! You are a superstar!'
                : percentage >= 80
                ? '🔥 Excellent work! Almost perfect!'
                : percentage >= 60
                ? '👍 Good job! Keep practicing!'
                : '💪 Don\'t give up! Try again!'}
            </div>

            {/* Progress bar */}
            <div style={{
              width: '100%', height: 16,
              background: '#EDE8D0', borderRadius: 9999,
              border: '2px solid #2D2D2D', overflow: 'hidden',
            }}>
              <div style={{
                height: '100%',
                width: `${percentage}%`,
                background: scoreColor,
                borderRadius: 9999,
                transition: 'width 1s ease',
              }} />
            </div>
          </motion.div>

          {/* Action buttons */}
          <motion.div
            variants={itemVariants}
            style={{
              display: 'flex', gap: '1rem',
              justifyContent: 'center', flexWrap: 'wrap',
              width: '100%',
            }}
          >
            <button
              className="result-btn"
              style={{ background: '#FF6B6B', color: '#FFFFFF' }}
              onClick={() => router.push(`/quiz/${lessonId}`)}
            >
              🔄 Try Again
            </button>

            {nextLessonId ? (
              <button
                className="result-btn"
                style={{ background: '#6BCB77', color: '#FFFFFF' }}
                onClick={() => router.push(`/quiz/${nextLessonId}`)}
              >
                ➡️ Next Lesson
              </button>
            ) : (
              <button
                className="result-btn"
                style={{ background: '#FFD93D', color: '#2D2D2D' }}
                onClick={() => router.push(`/lessons/${subjectId}`)}
              >
                📚 Back to Lessons
              </button>
            )}
          </motion.div>

        </motion.div>
      </div>
    </>
  )
}
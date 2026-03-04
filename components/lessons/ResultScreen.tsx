'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { getScoreRating } from '@/hooks/useProgress'

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
  const percentage = Math.round((score / totalQuestions) * 100)
  const stars = getScoreRating(percentage)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-2xl mx-auto px-4"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="text-center mb-8 sm:mb-10 md:mb-12">
        <h1
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 md:mb-4"
          style={{ fontFamily: 'var(--font-fredoka-one)' }}
        >
          🎉 Awesome Job!
        </h1>
        <p className="text-base sm:text-lg md:text-2xl font-bold text-[var(--color-muted)]">
          {lessonTitle}
        </p>
      </motion.div>

      {/* Score Card */}
      <motion.div variants={itemVariants} className="mb-8 sm:mb-10 md:mb-12">
        <Card className="p-4 sm:p-6 md:p-8 text-center">
          <div className="mb-6 sm:mb-8">
            <div
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2 sm:mb-3 md:mb-4"
              style={{ fontFamily: 'var(--font-fredoka-one)' }}
            >
              {percentage}%
            </div>
            <p className="text-base sm:text-lg md:text-2xl font-bold text-[var(--color-muted)]">
              {score} out of {totalQuestions} correct
            </p>
          </div>

          {/* Star Rating */}
          <div className="mb-8">
            <p className="text-xl font-bold mb-4">Your Performance:</p>
            <div className="flex justify-center gap-3">
              {[1, 2, 3].map((star) => (
                <motion.span
                  key={star}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: star <= stars ? 1 : 0.3, scale: 1 }}
                  transition={{ delay: star * 0.2 }}
                  className="text-5xl"
                >
                  ⭐
                </motion.span>
              ))}
            </div>
          </div>

          {/* Progress Bar */}
          <ProgressBar
            percentage={percentage}
            color={
              percentage >= 90
                ? 'var(--color-success)'
                : percentage >= 70
                  ? 'var(--color-primary)'
                  : 'var(--color-accent)'
            }
            showPercentageText={false}
          />
        </Card>
      </motion.div>

      {/* Feedback Message */}
      <motion.div variants={itemVariants} className="text-center mb-12">
        {percentage >= 90 && (
          <p className="text-2xl font-bold text-[var(--color-success)]">
            Perfect! You're a superstar! 🌟
          </p>
        )}
        {percentage >= 70 && percentage < 90 && (
          <p className="text-2xl font-bold text-[var(--color-primary)]">
            Great job! Keep practicing! 💪
          </p>
        )}
        {percentage < 70 && (
          <p className="text-2xl font-bold text-[var(--color-accent)]">
            Good try! Practice makes perfect! 🎯
          </p>
        )}
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <Link href={`/quiz/${lessonId}`} className="flex-1">
          <Button variant="accent" size="lg" className="w-full">
            🔄 Try Again
          </Button>
        </Link>

        {nextLessonId ? (
          <Link href={`/quiz/${nextLessonId}`} className="flex-1">
            <Button variant="success" size="lg" className="w-full">
              ➡️ Next Lesson
            </Button>
          </Link>
        ) : (
          <Link href={`/lessons/${subjectId}`} className="flex-1">
            <Button variant="primary" size="lg" className="w-full">
              📚 Back to Lessons
            </Button>
          </Link>
        )}
      </motion.div>
    </motion.div>
  )
}

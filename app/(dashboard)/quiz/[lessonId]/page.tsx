'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/context/AuthContext'
import { useLesson, useSubject } from '@/hooks/useLessons'
import { QuizQuestion } from '@/components/lessons/QuizQuestion'
import { ResultScreen } from '@/components/lessons/ResultScreen'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Button } from '@/components/ui/Button'

interface QuizPageProps {
  params: {
    lessonId: string
  }
}

export default function QuizPage({ params }: QuizPageProps) {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const lesson = useLesson(params.lessonId)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [isAnswered, setIsAnswered] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | undefined>()
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading || !lesson) {
    return (
      <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center">
        <div className="text-4xl font-bold" style={{ fontFamily: 'var(--font-fredoka-one)' }}>
          ⏳ Loading...
        </div>
      </div>
    )
  }

  const subject = useSubject(lesson.subjectId)

  if (!subject) {
    return (
      <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center">
        <div className="text-4xl font-bold text-[var(--color-accent)]">
          Subject not found
        </div>
      </div>
    )
  }

  const currentItem = lesson.content.items[currentQuestionIndex]
  const totalQuestions = lesson.content.items.length
  const score = answers.filter(
    (answer, index) => answer === lesson.content.items[index].answer
  ).length

  const handleAnswer = (optionIndex: number) => {
    setSelectedAnswer(optionIndex)
    setIsAnswered(true)
    setAnswers([...answers, optionIndex])
  }

  const handleNext = () => {
    if (currentQuestionIndex + 1 < totalQuestions) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setIsAnswered(false)
      setSelectedAnswer(undefined)
    } else {
      setShowResults(true)
    }
  }

  if (showResults) {
    const nextLessonId = undefined // Would fetch from lessons list

    return (
      <div className="min-h-screen bg-[var(--color-bg)] px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <ResultScreen
            score={score}
            totalQuestions={totalQuestions}
            lessonTitle={lesson.title}
            lessonId={lesson.id}
            subjectId={lesson.subjectId}
            nextLessonId={nextLessonId}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 bg-[var(--color-surface)] border-b-[2.5px] border-[var(--color-text)] shadow-[3px_3px_0_var(--color-text)] z-50"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-4 sm:py-6">
          <div className="mb-3 sm:mb-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4 mb-2 sm:mb-3">
              <h2
                className="text-lg sm:text-xl md:text-2xl font-bold"
                style={{ color: subject.color, fontFamily: 'var(--font-fredoka-one)' }}
              >
                {lesson.title}
              </h2>
              <span className="text-base sm:text-lg md:text-xl font-bold text-[var(--color-text)]">
                {currentQuestionIndex + 1} of {totalQuestions}
              </span>
            </div>
            <ProgressBar
              percentage={((currentQuestionIndex + 1) / totalQuestions) * 100}
              color={subject.color}
              showPercentageText={false}
            />
          </div>
        </div>
      </motion.div>

      {/* Quiz Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12"
        >
          <QuizQuestion
            item={currentItem}
            onAnswer={handleAnswer}
            isAnswered={isAnswered}
            selectedAnswer={selectedAnswer}
            subjectColor={subject.color}
          />

          {/* Next Button */}
          {isAnswered && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center gap-6 mt-16"
            >
              {currentQuestionIndex === totalQuestions - 1 ? (
                <Button variant="success" size="lg" onClick={handleNext}>
                  ✨ See Results
                </Button>
              ) : (
                <Button variant="primary" size="lg" onClick={handleNext}>
                  ➡️ Next Question
                </Button>
              )}
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useAuth } from '@/context/AuthContext'
import { Navbar } from '@/components/ui/Navbar'
import { LessonCard } from '@/components/lessons/LessonCard'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { useSubject, useLessonsForSubject } from '@/hooks/useLessons'
import { useProgress, getSubjectCompletion } from '@/hooks/useProgress'

interface LessonPageProps {
  params: {
    subjectId: string
  }
}

export default function LessonsPage({ params }: LessonPageProps) {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const subject = useSubject(params.subjectId)
  const { lessons } = useLessonsForSubject(params.subjectId)
  const { progress } = useProgress(null)

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading || !subject) {
    return (
      <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center">
        <div className="text-4xl font-bold" style={{ fontFamily: "'Fredoka One', cursive" }}>
          ⏳ Loading...
        </div>
      </div>
    )
  }

  const subjectProgress = getSubjectCompletion(progress, params.subjectId)
  const completionPercentage = lessons.length > 0 ? (subjectProgress / lessons.length) * 100 : 0

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

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <Navbar />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12"
      >
        {/* Header */}
        <motion.div
          variants={itemVariants}
          className="mb-8 sm:mb-12 text-center md:text-left"
        >
          <div className="flex flex-col md:flex-row items-center md:items-start gap-3 sm:gap-4 mb-4 sm:mb-6 justify-center md:justify-start">
            <span className="text-4xl sm:text-5xl md:text-6xl">{subject.icon}</span>
            <div className="text-center md:text-left">
              <h1
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold"
                style={{
                  fontFamily: "'Fredoka One', cursive",
                  color: subject.color,
                }}
              >
                {subject.name}
              </h1>
              <p className="text-base sm:text-lg text-[var(--color-muted)]">
                {subject.description}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <ProgressBar
            percentage={completionPercentage}
            color={subject.color}
            label="Progress"
            showPercentageText
          />
        </motion.div>

        {/* Lessons Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 sm:gap-6 md:gap-6"
          variants={containerVariants}
        >
          {lessons.map((lesson, index) => {
            const isCompleted = progress.some(
              (p) => p.lessonId === lesson.id && p.status === 'completed'
            )
            const isLocked = index > 0 && !progress.some(
              (p) => p.lessonId === lessons[index - 1].id && p.status === 'completed'
            )

            return (
              <motion.div key={lesson.id} variants={itemVariants}>
                <LessonCard
                  lesson={lesson}
                  isCompleted={isCompleted}
                  isLocked={isLocked}
                  subjectColor={subject.color}
                />
              </motion.div>
            )
          })}
        </motion.div>
      </motion.div>
    </div>
  )
}

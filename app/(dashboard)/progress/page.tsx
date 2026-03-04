'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useAuth } from '@/context/AuthContext'
import { Navbar } from '@/components/ui/Navbar'
import { Card } from '@/components/ui/Card'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { useProgress, getSubjectCompletion } from '@/hooks/useProgress'
import { useSubjects } from '@/hooks/useLessons'
import { SUBJECTS } from '@/constants/subjects'

export default function ProgressPage() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const { progress } = useProgress(null)
  const { subjects } = useSubjects()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center">
        <div className="text-4xl font-bold" style={{ fontFamily: "'Fredoka One', cursive" }}>
          ⏳ Loading...
        </div>
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
        <motion.div variants={itemVariants} className="mb-8 sm:mb-12">
          <h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4"
            style={{ fontFamily: "'Fredoka One', cursive" }}
          >
            📊 Learning Progress
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-[var(--color-muted)]">
            Keep going! You're doing amazing! 🌟
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-12 sm:mb-16"
          variants={containerVariants}
        >
          {[
            { label: 'Total Lessons Started', value: progress.length, color: 'var(--color-primary)' },
            { label: 'Lessons Completed', value: completedLessons.length, color: 'var(--color-success)' },
            { label: 'Average Score', value: avgScore + '%', color: 'var(--color-secondary)' },
            { label: 'Badges Earned', value: '0', color: 'var(--color-accent)' },
          ].map((stat) => (
            <motion.div key={stat.label} variants={itemVariants}>
              <Card className="p-6 text-center">
                <div
                  className="text-4xl font-bold mb-2"
                  style={{
                    fontFamily: "'Fredoka One', cursive",
                    color: stat.color,
                  }}
                >
                  {stat.value}
                </div>
                <p className="text-[1.125rem] font-bold text-[var(--color-muted)]">
                  {stat.label}
                </p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Subject Progress */}
        <motion.div
          variants={itemVariants}
          className="mb-16 bg-[var(--color-surface)] border-2.5 border-[var(--color-text)] rounded-3xl p-8 shadow-[5px_5px_0_var(--color-text)]"
        >
          <h2
            className="text-3xl font-bold mb-8"
            style={{ fontFamily: "'Fredoka One', cursive" }}
          >
            📚 Subject Progress
          </h2>

          <motion.div className="space-y-8" variants={containerVariants}>
            {SUBJECTS.map((subject) => {
              const subjectCompletion = getSubjectCompletion(progress, subject.id)
              const totalLessons = 5 // Based on seed data
              const percentage = (subjectCompletion / totalLessons) * 100

              return (
                <motion.div key={subject.id} variants={itemVariants}>
                  <div className="mb-4">
                    <h3
                      className="text-2xl font-bold flex items-center gap-3"
                      style={{ color: subject.color }}
                    >
                      <span>{subject.icon}</span>
                      {subject.name}
                    </h3>
                    <p className="text-[var(--color-muted)] text-[1.125rem]">
                      {subjectCompletion} out of {totalLessons} lessons completed
                    </p>
                  </div>
                  <ProgressBar
                    percentage={percentage}
                    color={subject.color}
                    showPercentageText={true}
                  />
                </motion.div>
              )
            })}
          </motion.div>
        </motion.div>

        {/* Completed Lessons List */}
        {completedLessons.length > 0 && (
          <motion.div
            variants={itemVariants}
            className="bg-[var(--color-surface)] border-2.5 border-[var(--color-text)] rounded-3xl p-8 shadow-[5px_5px_0_var(--color-text)]"
          >
            <h2
              className="text-3xl font-bold mb-8"
              style={{ fontFamily: "'Fredoka One', cursive" }}
            >
              ✅ Completed Lessons
            </h2>

            <motion.div className="space-y-4" variants={containerVariants}>
              {completedLessons.slice(0, 10).map((comp) => (
                <motion.div
                  key={comp.id}
                  variants={itemVariants}
                  className="p-4 bg-[var(--color-bg)] border border-[var(--color-muted)] rounded-xl flex justify-between items-center"
                >
                  <div>
                    <p className="font-bold text-[1.125rem]">Lesson {comp.lessonId}</p>
                    <p className="text-[var(--color-muted)] text-sm">
                      {comp.completedAt
                        ? new Date(comp.completedAt as any).toLocaleDateString()
                        : 'No date'}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-[var(--color-success)]">
                      {Math.round((comp.score / comp.totalQuestions) * 100)}%
                    </div>
                    <p className="text-[var(--color-muted)] text-sm">
                      {comp.score}/{comp.totalQuestions} correct
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useAuth } from '@/context/AuthContext'
import { Navbar } from '@/components/ui/Navbar'
import { SubjectCard } from '@/components/lessons/SubjectCard'
import { useSubjects } from '@/hooks/useLessons'
import { useProgress } from '@/hooks/useProgress'
import { SUBJECTS } from '@/constants/subjects'

export default function DashboardPage() {
  const { isAuthenticated, isLoading, user } = useAuth()
  const router = useRouter()
  const { subjects } = useSubjects()
  const { progress } = useProgress(null)

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center">
        <div className="text-4xl font-bold" style={{ fontFamily: 'var(--font-fredoka-one)' }}>
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
        staggerChildren: 0.2,
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
        {/* Greeting */}
        <motion.div variants={itemVariants} className="mb-8 sm:mb-12">
          <h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3"
            style={{ fontFamily: 'var(--font-fredoka-one)' }}
          >
            Hello, {user?.displayName}! 👋
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-[var(--color-muted)]">
            What do you want to learn today?
          </p>
        </motion.div>

        {/* Subject Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-12 sm:mb-16"
          variants={containerVariants}
        >
          {SUBJECTS.map((subject) => (
            <motion.div key={subject.id} variants={itemVariants}>
              <Link href={`/lessons/${subject.id}`}>
                <SubjectCard subject={subject} />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Progress Summary */}
        <motion.div variants={itemVariants} className="bg-[var(--color-surface)] border-2.5 border-[var(--color-text)] rounded-3xl p-5 sm:p-8 md:p-8 shadow-[5px_5px_0_var(--color-text)]">
          <h2
            className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6"
            style={{ fontFamily: 'var(--font-fredoka-one)' }}
          >
            📊 Your Progress
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-[var(--color-primary)]">
                {progress.length}
              </div>
              <p className="text-[1.125rem] font-bold text-[var(--color-muted)]">
                Lessons Started
              </p>
            </div>

            <div className="text-center">
              <div className="text-4xl font-bold text-[var(--color-success)]">
                {progress.filter((p) => p.status === 'completed').length}
              </div>
              <p className="text-[1.125rem] font-bold text-[var(--color-muted)]">
                Completed
              </p>
            </div>

            <div className="text-center">
              <div className="text-4xl font-bold text-[var(--color-secondary)]">
                0
              </div>
              <p className="text-[1.125rem] font-bold text-[var(--color-muted)]">
                Badges Earned
              </p>
            </div>

            <div className="text-center">
              <div className="text-4xl font-bold text-[var(--color-accent)]">
                {progress.length > 0
                  ? Math.round(
                      (progress.filter((p) => p.status === 'completed').length /
                        progress.length) *
                        100
                    )
                  : 0}
                %
              </div>
              <p className="text-[1.125rem] font-bold text-[var(--color-muted)]">
                Completion
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

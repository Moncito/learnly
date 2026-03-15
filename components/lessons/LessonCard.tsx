'use client'

import React from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Lesson } from '@/types'
import { Lock, Play, Check } from 'lucide-react'

interface LessonCardProps {
  lesson: Lesson
  isCompleted?: boolean
  isLocked?: boolean
  subjectColor: string
}

export function LessonCard({
  lesson,
  isCompleted = false,
  isLocked = false,
  subjectColor,
}: LessonCardProps) {
  const stars = Array.from({ length: lesson.difficulty }, (_, i) => i + 1)

  const content = (
    <Card
      className={`p-4 sm:p-5 md:p-6 flex flex-col justify-between h-full ${
        isLocked ? 'opacity-60' : ''
      }`}
    >
      <div>
        <div className="flex flex-col sm:flex-row items-start justify-between gap-2 sm:gap-3 mb-3 sm:mb-4">
          <div className="flex-1">
            <h3
              className="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2"
              style={{
                fontFamily: "'Poppins', system-ui, sans-serif",
                color: subjectColor,
              }}
            >
              {lesson.title}
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-[var(--color-muted)]">
              {lesson.description}
            </p>
          </div>

          <div className="flex-shrink-0">
            {isCompleted && (
              <Check size={24} color={subjectColor} className="flex-shrink-0" />
            )}
            {isLocked && <Lock size={24} color="var(--color-muted)" className="flex-shrink-0" />}
            {!isCompleted && !isLocked && (
              <Play size={24} color={subjectColor} className="flex-shrink-0" />
            )}
          </div>
        </div>

        {/* Difficulty Stars */}
        <div className="flex gap-1">
          {stars.map((star) => (
            <span key={star} className="text-2xl">
              ⭐
            </span>
          ))}
        </div>
      </div>

      {isLocked && (
        <div className="mt-4 text-center text-[1.125rem] font-bold text-[var(--color-muted)]">
          Complete Previous Lesson
        </div>
      )}
    </Card>
  )

  if (isLocked) {
    return content
  }

  return (
    <Link href={`/quiz/${lesson.id}`}>
      {content}
    </Link>
  )
}

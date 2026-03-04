'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Subject } from '@/types'

interface SubjectCardProps {
  subject: Subject
  onSelect?: (subjectId: string) => void
  href?: string
  totalLessons?: number
  completedLessons?: number
}

export function SubjectCard({
  subject,
  onSelect,
  href,
  totalLessons = 0,
  completedLessons = 0,
}: SubjectCardProps) {
  // Define background colors for each subject
  const bgColors: { [key: string]: string } = {
    math: '#FFF0F0',    // Light red
    english: '#F0F5FF', // Light blue
    science: '#F0FFF4', // Light green
  }

  const bgColor = bgColors[subject.id] || '#FFFFFF'
  const safeTotal = Math.max(totalLessons, 0)
  const safeCompleted = Math.min(Math.max(completedLessons, 0), safeTotal || completedLessons)
  const completion =
    safeTotal > 0 ? Math.round((safeCompleted / safeTotal) * 100) : 0

  const content = (
    <div
      className="h-full flex flex-col justify-between"
      style={{
        background: bgColor,
        border: '2.5px solid #2D2D2D',
        borderRadius: 24,
        boxShadow: '5px 5px 0 #2D2D2D',
        padding: '1.5rem',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translate(-4px,-4px)'
        e.currentTarget.style.boxShadow = '9px 9px 0 #2D2D2D'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translate(0,0)'
        e.currentTarget.style.boxShadow = '5px 5px 0 #2D2D2D'
      }}
    >
      <div>
        <div className="text-6xl mb-4 text-center">
          {subject.icon}
        </div>
        <h3
          className="text-2xl text-center mb-2"
          style={{
            color: subject.color,
            fontFamily: "'Fredoka One', cursive",
          }}
        >
          {subject.name}
        </h3>
        <p
          className="text-center text-base text-[#7A7A7A]"
          style={{ fontFamily: "'Lexend', system-ui, sans-serif" }}
        >
          {subject.description}
        </p>
      </div>

      {/* Progress chip + mini bar */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-[#2D2D2D] mb-1">
          <span>
            ⭐ {safeCompleted}/{safeTotal || '?'} lessons
          </span>
          <span>{completion}%</span>
        </div>
        <div
          className="w-full h-2 rounded-full"
          style={{ background: 'rgba(0,0,0,0.06)' }}
        >
          <div
            className="h-2 rounded-full"
            style={{
              width: `${completion}%`,
              background: subject.color,
              transition: 'width 0.3s ease',
            }}
          />
        </div>
      </div>

      <Button
        variant="primary"
        size="md"
        className="w-full mt-6"
        onClick={() => onSelect?.(subject.id)}
      >
        {subject.name === 'Math' && '🔢 '}
        {subject.name === 'English' && '📖 '}
        {subject.name === 'Science' && '🔬 '}
        Start Learning
      </Button>
    </div>
  )

  if (href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    )
  }

  return content
}

'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Subject } from '@/types'

interface SubjectCardProps {
  subject: Subject
  onSelect?: (subjectId: string) => void
  href?: string
}

export function SubjectCard({ subject, onSelect, href }: SubjectCardProps) {
  // Define background colors for each subject
  const bgColors: { [key: string]: string } = {
    math: '#FFF0F0',    // Light red
    english: '#F0F5FF', // Light blue
    science: '#F0FFF4', // Light green
  }

  const bgColor = bgColors[subject.id] || '#FFFFFF'

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
            fontFamily: "'Poppins', system-ui, sans-serif",
          }}
        >
          {subject.name}
        </h3>
        <p
          className="text-center text-base text-[#7A7A7A]"
          style={{ fontFamily: "'Poppins', system-ui, sans-serif" }}
        >
          {subject.description}
        </p>
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

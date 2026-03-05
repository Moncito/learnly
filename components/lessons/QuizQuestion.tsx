'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { QuizItem } from '@/types'

interface QuizQuestionProps {
  item: QuizItem
  onAnswer: (optionIndex: number) => void
  isAnswered: boolean
  selectedAnswer?: number
  subjectColor: string
}

export function QuizQuestion({
  item,
  onAnswer,
  isAnswered,
  selectedAnswer,
  subjectColor,
}: QuizQuestionProps) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Question Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6 sm:mb-8 md:mb-12"
      >
        <h1
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 md:mb-6"
          style={{
            fontFamily: "'Fredoka One', cursive",
            color: subjectColor,
          }}
        >
          {item.question}
        </h1>

        {/* Image if available */}
        {item.imageUrl && (
          <div className="text-5xl sm:text-6xl md:text-8xl mb-4 sm:mb-6 md:mb-8">{item.imageUrl}</div>
        )}
      </motion.div>

      {/* Answer Options */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6"
      >
        {item.options.map((option, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            onClick={() => !isAnswered && onAnswer(index)}
            disabled={isAnswered}
            className={`p-3 sm:p-4 md:p-6 rounded-3xl border-2.5 font-bold text-sm sm:text-base md:text-xl transition-all duration-300 ${
              isAnswered
                ? index === item.answer
                  ? 'bg-[var(--color-success)] border-[var(--color-text)] text-white scale-105'
                  : index === selectedAnswer
                    ? 'bg-[var(--color-accent)] border-[var(--color-text)] text-white'
                    : 'bg-white border-[var(--color-muted)] text-[var(--color-text)]'
                : 'bg-white border-[var(--color-text)] hover:shadow-[4px_4px_0_var(--color-text)] hover:translate-x-[-2px] hover:translate-y-[-2px] cursor-pointer'
            }`}
          >
            {option}
          </motion.button>
        ))}
      </motion.div>
    </div>
  )
}

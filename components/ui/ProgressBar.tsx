'use client'

import React from 'react'
import { ProgressBarProps } from '@/types'

export function ProgressBar({
  percentage,
  color = 'var(--color-primary)',
  label,
  showPercentageText = true,
}: ProgressBarProps) {
  const clampedPercentage = Math.min(Math.max(percentage, 0), 100)

  return (
    <div className="w-full">
      {(label || showPercentageText) && (
        <div className="flex justify-between items-center mb-2">
          {label && <span className="font-semibold text-[1.125rem]">{label}</span>}
          {showPercentageText && (
            <span className="font-bold text-[1.125rem]" style={{ color }}>
              {Math.round(clampedPercentage)}%
            </span>
          )}
        </div>
      )}
      <div
        className="w-full h-4 bg-white border-2 border-[var(--color-text)] rounded-full overflow-hidden"
        style={{ boxShadow: '2px 2px 0 var(--color-text)' }}
      >
        <div
          className="h-full transition-all duration-500 ease-out"
          style={{
            width: `${clampedPercentage}%`,
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  )
}

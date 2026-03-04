'use client'

import React from 'react'
import { BadgeProps } from '@/types'
import clsx from 'clsx'

export function Badge({ label, icon, variant = 'primary' }: BadgeProps) {
  const variantStyles = {
    primary: 'bg-[var(--color-primary)] text-[var(--color-text)]',
    secondary: 'bg-[var(--color-secondary)] text-white',
    accent: 'bg-[var(--color-accent)] text-white',
  }

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold',
        'border-2 border-[var(--color-text)]',
        variantStyles[variant]
      )}
    >
      {icon && <span>{icon}</span>}
      {label}
    </span>
  )
}

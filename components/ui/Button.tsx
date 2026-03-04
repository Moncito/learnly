'use client'

import React from 'react'
import { ButtonProps } from '@/types'
import clsx from 'clsx'

export function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className,
  type = 'button',
}: ButtonProps) {
  const baseStyles =
    'rounded-full font-black border-[3px] border-[#2D2D2D] transition-all duration-150 cursor-pointer inline-flex items-center justify-center gap-2 hover:-translate-x-1 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed'

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  const variantStyles = {
    primary: 'bg-[#FFD93D] text-[#2D2D2D] shadow-[5px_5px_0_#2D2D2D] hover:shadow-[8px_8px_0_#2D2D2D]',
    secondary: 'bg-white text-[#2D2D2D] shadow-[5px_5px_0_#2D2D2D] hover:shadow-[8px_8px_0_#2D2D2D]',
    accent: 'bg-[#FF6B6B] text-white shadow-[5px_5px_0_#2D2D2D] hover:shadow-[8px_8px_0_#2D2D2D]',
    success: 'bg-[#6BCB77] text-white shadow-[5px_5px_0_#2D2D2D] hover:shadow-[8px_8px_0_#2D2D2D]',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(baseStyles, sizeStyles[size], variantStyles[variant], className)}
    >
      {children}
    </button>
  )
}

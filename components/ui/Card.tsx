'use client'

import React, { CSSProperties } from 'react'
import { CardProps } from '@/types'
import clsx from 'clsx'

export function Card({ children, className, onClick, style }: CardProps & { style?: CSSProperties }) {
  return (
    <div
      className={clsx(
        'bg-white border-[2.5px] border-[#2D2D2D] rounded-[24px]',
        'shadow-[5px_5px_0_#2D2D2D]',
        'transition-all duration-200',
        onClick && 'cursor-pointer hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[9px_9px_0_#2D2D2D]',
        className
      )}
      onClick={onClick}
      style={style}
    >
      {children}
    </div>
  )
}

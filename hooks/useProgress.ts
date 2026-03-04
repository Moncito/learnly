'use client'

import { useState, useEffect } from 'react'
import { Progress } from '@/types'

export function useProgress(childId: string | null) {
  const [progress, setProgress] = useState<Progress[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!childId) {
      setProgress([])
      setIsLoading(false)
      return
    }

    try {
      // In a real app, this would fetch from Firestore
      setProgress([])
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching progress:', error)
      setIsLoading(false)
    }
  }, [childId])

  return { progress, isLoading }
}

export function getSubjectCompletion(progress: Progress[], subjectId: string): number {
  const subjectProgress = progress.filter((p) => p.subjectId === subjectId && p.status === 'completed')
  return subjectProgress.length
}

export function getScoreRating(score: number): number {
  if (score >= 90) return 3
  if (score >= 70) return 2
  return 1
}

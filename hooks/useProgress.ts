import { useState, useEffect } from 'react'
import {
  collection,
  onSnapshot,
  doc,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Progress } from '@/types'

export function useProgress(
  _lessonId: string | null,
  userId?: string
) {
  // null = not yet loaded, [] = loaded with no data
  const [progress, setProgress] = useState<Progress[] | null>(
    userId ? null : []
  )

  // Derive isLoading from progress being null
  const isLoading = progress === null

  useEffect(() => {
    if (!userId) return

    const ref = collection(db, 'users', userId, 'progress')
    const unsubscribe = onSnapshot(
      ref,
      (snapshot) => {
        const data = snapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        })) as Progress[]
        setProgress(data)
      },
      (error) => {
        console.error('Progress listener error:', error)
        setProgress([])
      }
    )

    return () => unsubscribe()
  }, [userId])

  const saveProgress = async (data: {
    lessonId: string
    subjectId: string
    status: 'completed' | 'in_progress'
    score: number
    totalQuestions: number
    completedAt?: Date
  }) => {
    if (!userId) {
      console.error('Cannot save — no userId provided')
      return
    }
    try {
      const ref = doc(db, 'users', userId, 'progress', data.lessonId)
      await setDoc(
        ref,
        {
          ...data,
          userId,
          completedAt: data.completedAt ?? new Date(),
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      )
      // onSnapshot updates progress automatically
    } catch (error) {
      console.error('Error saving progress:', error)
      throw error
    }
  }

  return {
    progress: progress ?? [],
    isLoading,
    saveProgress,
  }
}

export function getSubjectCompletion(
  progress: Progress[],
  subjectId: string
): number {
  return progress.filter(
    (p) => p.subjectId === subjectId && p.status === 'completed'
  ).length
}
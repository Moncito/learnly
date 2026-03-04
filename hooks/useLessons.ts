'use client'

import { useState, useEffect } from 'react'
import { Subject, Lesson } from '@/types'
import { SUBJECTS, LESSONS } from '@/constants/subjects'

export function useSubjects() {
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    try {
      // In a real app, this would fetch from Firestore
      setSubjects(SUBJECTS)
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching subjects:', error)
      setIsLoading(false)
    }
  }, [])

  return { subjects, isLoading }
}

export function useSubject(subjectId: string) {
  const [subject, setSubject] = useState<Subject | null>(null)

  useEffect(() => {
    const found = SUBJECTS.find((s) => s.id === subjectId)
    setSubject(found || null)
  }, [subjectId])

  return subject
}

export function useLessonsForSubject(subjectId: string) {
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    try {
      const filtered = LESSONS.filter((l) => l.subjectId === subjectId)
      setLessons(filtered)
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching lessons:', error)
      setIsLoading(false)
    }
  }, [subjectId])

  return { lessons, isLoading }
}

export function useLesson(lessonId: string) {
  const [lesson, setLesson] = useState<Lesson | null>(null)

  useEffect(() => {
    const found = LESSONS.find((l) => l.id === lessonId)
    setLesson(found || null)
  }, [lessonId])

  return lesson
}

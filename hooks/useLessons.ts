import { useMemo } from 'react'
import { SUBJECTS, LESSONS } from '@/constants/subjects'
import { Subject, Lesson } from '@/types'

export function useSubjects() {
  const subjects: Subject[] = SUBJECTS
  return { subjects, isLoading: false }
}

export function useSubject(subjectId: string) {
  const subject = SUBJECTS.find((s) => s.id === subjectId) ?? null
  return subject
}

export function useLessonsForSubject(subjectId: string) {
  const lessons = useMemo(
    () => LESSONS.filter((l) => l.subjectId === subjectId),
    [subjectId]
  )
  return { lessons, isLoading: false }
}

export function useLesson(lessonId: string) {
  const lesson = LESSONS.find((l) => l.id === lessonId) ?? null
  return lesson
}
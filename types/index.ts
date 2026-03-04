// User & Auth Types
export interface User {
  uid: string
  displayName: string
  email: string
  role: 'parent' | 'child'
  avatarUrl?: string
  createdAt: Date
  children?: string[]
}

export interface Child {
  id: string
  name: string
  age: number
  avatarUrl?: string
  parentId: string
  grade: number
  createdAt: Date
}

// Subject & Lesson Types
export interface Subject {
  id: string
  name: string
  icon: string
  color: string
  description: string
  order: number
}

export interface LessonContent {
  instructions: string
  items: QuizItem[]
}

export interface QuizItem {
  id: string
  question: string
  options: string[]
  answer: number
  imageUrl?: string
}

export interface Lesson {
  id: string
  subjectId: string
  title: string
  description: string
  type: 'quiz' | 'interactive'
  order: number
  difficulty: number
  thumbnailUrl?: string
  isActive: boolean
  content: LessonContent
}

// Progress & Badges
export interface Progress {
  id: string
  lessonId: string
  subjectId: string
  status: 'completed' | 'in_progress' | 'not-started'
  score: number
  totalQuestions: number
  completedAt?: Date | { toDate: () => Date } | null
  updatedAt?: Date | { toDate: () => Date } | null
  userId: string
}

export interface Badge {
  id: string
  name: string
  description: string
  iconUrl: string
  condition: {
    type: 'lessons-completed' | 'subject-master' | 'quiz-perfect'
    subjectId?: string
    threshold: number
  }
}

export interface EarnedBadge {
  id: string
  childId: string
  badgeId: string
  earnedAt: Date
}

// UI Component Props
export interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'accent' | 'success'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  className?: string
  type?: 'button' | 'submit' | 'reset'
}

export interface CardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export interface ProgressBarProps {
  percentage: number
  color?: string
  label?: string
  showPercentageText?: boolean
}

export interface BadgeProps {
  label: string
  icon?: string
  variant?: 'primary' | 'secondary' | 'accent'
}

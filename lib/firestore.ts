'use client'

import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
  query,
  where,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from './firebase'
import {
  Subject,
  Lesson,
  Progress,
  Child,
  User,
  Badge,
  EarnedBadge,
} from '@/types'

// Helper to assert db is initialized
function getDb() {
  if (!db) throw new Error('Firestore not initialized')
  return db
}

// ── USERS ────────────────────────────────────────────────
export async function getUser(uid: string): Promise<User | null> {
  try {
    const docSnap = await getDoc(doc(getDb(), 'users', uid))
    return docSnap.exists() ? (docSnap.data() as User) : null
  } catch (error) {
    console.error('getUser error:', error)
    return null
  }
}

export async function setUser(uid: string, user: Partial<User>): Promise<void> {
  try {
    await setDoc(doc(getDb(), 'users', uid), user, { merge: true })
  } catch (error) {
    console.error('setUser error:', error)
    throw error
  }
}

// ── USER PROGRESS ────────────────────────────────────────
export async function getUserProgress(userId: string): Promise<Progress[]> {
  if (!userId) return []
  try {
    const ref = collection(getDb(), 'users', userId, 'progress')
    const snapshot = await getDocs(ref)
    return snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    })) as Progress[]
  } catch (error) {
    console.error('Error getting progress:', error)
    return []
  }
}

export async function saveUserProgress(
  userId: string,
  data: {
    lessonId: string
    subjectId: string
    status: 'completed' | 'in_progress'
    score: number
    totalQuestions: number
    completedAt?: Date
  }
): Promise<void> {
  if (!userId) return
  try {
    const ref = doc(getDb(), 'users', userId, 'progress', data.lessonId)
    await setDoc(
      ref,
      {
        ...data,
        userId,
        completedAt: data.completedAt ?? serverTimestamp(),
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    )
  } catch (error) {
    console.error('Error saving progress:', error)
    throw error
  }
}

export async function clearUserProgress(userId: string): Promise<void> {
  if (!userId) return
  try {
    const ref = collection(getDb(), 'users', userId, 'progress')
    const snapshot = await getDocs(ref)
    await Promise.all(snapshot.docs.map((d) => deleteDoc(d.ref)))
  } catch (error) {
    console.error('Error clearing progress:', error)
  }
}

// ── CHILDREN ─────────────────────────────────────────────
export async function getChildrenForParent(parentId: string): Promise<Child[]> {
  try {
    const q = query(
      collection(getDb(), 'children'),
      where('parentId', '==', parentId)
    )
    const snapshot = await getDocs(q)
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Child))
  } catch (error) {
    console.error('getChildrenForParent error:', error)
    return []
  }
}

export async function addChild(
  parentId: string,
  child: Omit<Child, 'id'>
): Promise<string> {
  try {
    const docRef = doc(collection(getDb(), 'children'))
    await setDoc(docRef, { ...child, parentId })
    return docRef.id
  } catch (error) {
    console.error('addChild error:', error)
    throw error
  }
}

// ── SUBJECTS ─────────────────────────────────────────────
export async function getSubjects(): Promise<Subject[]> {
  try {
    const snapshot = await getDocs(collection(getDb(), 'subjects'))
    return snapshot.docs
      .map((d) => ({ id: d.id, ...d.data() } as Subject))
      .sort((a, b) => a.order - b.order)
  } catch (error) {
    console.error('getSubjects error:', error)
    return []
  }
}

export async function getSubject(subjectId: string): Promise<Subject | null> {
  try {
    const docSnap = await getDoc(doc(getDb(), 'subjects', subjectId))
    return docSnap.exists()
      ? ({ id: docSnap.id, ...docSnap.data() } as Subject)
      : null
  } catch (error) {
    console.error('getSubject error:', error)
    return null
  }
}

// ── LESSONS ──────────────────────────────────────────────
export async function getLessonsForSubject(subjectId: string): Promise<Lesson[]> {
  try {
    const q = query(
      collection(getDb(), 'lessons'),
      where('subjectId', '==', subjectId)
    )
    const snapshot = await getDocs(q)
    return snapshot.docs
      .map((d) => ({ id: d.id, ...d.data() } as Lesson))
      .sort((a, b) => a.order - b.order)
  } catch (error) {
    console.error('getLessonsForSubject error:', error)
    return []
  }
}

export async function getLesson(lessonId: string): Promise<Lesson | null> {
  try {
    const docSnap = await getDoc(doc(getDb(), 'lessons', lessonId))
    return docSnap.exists()
      ? ({ id: docSnap.id, ...docSnap.data() } as Lesson)
      : null
  } catch (error) {
    console.error('getLesson error:', error)
    return null
  }
}

// ── BADGES ───────────────────────────────────────────────
export async function getBadges(): Promise<Badge[]> {
  try {
    const snapshot = await getDocs(collection(getDb(), 'badges'))
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Badge))
  } catch (error) {
    console.error('getBadges error:', error)
    return []
  }
}

export async function getEarnedBadges(childId: string): Promise<EarnedBadge[]> {
  try {
    const q = query(
      collection(getDb(), 'earnedBadges'),
      where('childId', '==', childId)
    )
    const snapshot = await getDocs(q)
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as EarnedBadge))
  } catch (error) {
    console.error('getEarnedBadges error:', error)
    return []
  }
}

export async function earnBadge(childId: string, badgeId: string): Promise<void> {
  try {
    const docRef = doc(collection(getDb(), 'earnedBadges'))
    await setDoc(docRef, {
      childId,
      badgeId,
      earnedAt: new Date(),
    })
  } catch (error) {
    console.error('earnBadge error:', error)
    throw error
  }
}
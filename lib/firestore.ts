'use client'

import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  query,
  where,
  QueryConstraint,
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

// Users
export async function getUser(uid: string): Promise<User | null> {
  try {
    const docSnap = await getDoc(doc(db, 'users', uid))
    return docSnap.exists() ? (docSnap.data() as User) : null
  } catch (error) {
    console.error('getUser error:', error)
    return null
  }
}

export async function setUser(uid: string, user: Partial<User>): Promise<void> {
  try {
    await setDoc(doc(db, 'users', uid), user, { merge: true })
  } catch (error) {
    console.error('setUser error:', error)
    throw error
  }
}

// Children
export async function getChildrenForParent(parentId: string): Promise<Child[]> {
  try {
    const q = query(collection(db, 'children'), where('parentId', '==', parentId))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    } as Child))
  } catch (error) {
    console.error('getChildrenForParent error:', error)
    return []
  }
}

export async function addChild(parentId: string, child: Omit<Child, 'id'>): Promise<string> {
  try {
    const docRef = doc(collection(db, 'children'))
    await setDoc(docRef, { ...child, parentId })
    return docRef.id
  } catch (error) {
    console.error('addChild error:', error)
    throw error
  }
}

// Subjects
export async function getSubjects(): Promise<Subject[]> {
  try {
    const querySnapshot = await getDocs(collection(db, 'subjects'))
    return querySnapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() } as Subject))
      .sort((a, b) => a.order - b.order)
  } catch (error) {
    console.error('getSubjects error:', error)
    return []
  }
}

export async function getSubject(subjectId: string): Promise<Subject | null> {
  try {
    const docSnap = await getDoc(doc(db, 'subjects', subjectId))
    return docSnap.exists() ? ({ id: docSnap.id, ...docSnap.data() } as Subject) : null
  } catch (error) {
    console.error('getSubject error:', error)
    return null
  }
}

// Lessons
export async function getLessonsForSubject(subjectId: string): Promise<Lesson[]> {
  try {
    const q = query(collection(db, 'lessons'), where('subjectId', '==', subjectId))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() } as Lesson))
      .sort((a, b) => a.order - b.order)
  } catch (error) {
    console.error('getLessonsForSubject error:', error)
    return []
  }
}

export async function getLesson(lessonId: string): Promise<Lesson | null> {
  try {
    const docSnap = await getDoc(doc(db, 'lessons', lessonId))
    return docSnap.exists() ? ({ id: docSnap.id, ...docSnap.data() } as Lesson) : null
  } catch (error) {
    console.error('getLesson error:', error)
    return null
  }
}

// Progress
export async function getProgress(childId: string, lessonId: string): Promise<Progress | null> {
  try {
    const q = query(
      collection(db, 'progress'),
      where('childId', '==', childId),
      where('lessonId', '==', lessonId)
    )
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.length > 0
      ? ({ id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() } as Progress)
      : null
  } catch (error) {
    console.error('getProgress error:', error)
    return null
  }
}

export async function getProgressForChild(childId: string): Promise<Progress[]> {
  try {
    const q = query(collection(db, 'progress'), where('childId', '==', childId))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Progress))
  } catch (error) {
    console.error('getProgressForChild error:', error)
    return []
  }
}

export async function getProgressForSubject(childId: string, subjectId: string): Promise<Progress[]> {
  try {
    const q = query(
      collection(db, 'progress'),
      where('childId', '==', childId),
      where('subjectId', '==', subjectId)
    )
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Progress))
  } catch (error) {
    console.error('getProgressForSubject error:', error)
    return []
  }
}

export async function saveProgress(progress: Partial<Progress>): Promise<string> {
  try {
    const docRef = doc(collection(db, 'progress'))
    await setDoc(docRef, {
      ...progress,
      lastAttemptAt: new Date(),
    })
    return docRef.id
  } catch (error) {
    console.error('saveProgress error:', error)
    throw error
  }
}

export async function updateProgress(progressId: string, updates: Partial<Progress>): Promise<void> {
  try {
    await updateDoc(doc(db, 'progress', progressId), {
      ...updates,
      lastAttemptAt: new Date(),
    })
  } catch (error) {
    console.error('updateProgress error:', error)
    throw error
  }
}

// Badges
export async function getBadges(): Promise<Badge[]> {
  try {
    const querySnapshot = await getDocs(collection(db, 'badges'))
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Badge))
  } catch (error) {
    console.error('getBadges error:', error)
    return []
  }
}

export async function getEarnedBadges(childId: string): Promise<EarnedBadge[]> {
  try {
    const q = query(collection(db, 'earnedBadges'), where('childId', '==', childId))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as EarnedBadge))
  } catch (error) {
    console.error('getEarnedBadges error:', error)
    return []
  }
}

export async function earnBadge(childId: string, badgeId: string): Promise<void> {
  try {
    const docRef = doc(collection(db, 'earnedBadges'))
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

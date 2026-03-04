'use client'

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  signInWithPopup,
  User as FirebaseUser,
} from 'firebase/auth'
import { auth } from './firebase'
import { setUser } from './firestore'

const googleProvider = new GoogleAuthProvider()

export async function signUpWithEmail(
  email: string,
  password: string,
  displayName: string
): Promise<FirebaseUser> {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    // Store user data in Firestore
    await setUser(user.uid, {
      uid: user.uid,
      email,
      displayName,
      role: 'parent',
      createdAt: new Date(),
    })

    return user
  } catch (error) {
    console.error('signUpWithEmail error:', error)
    throw error
  }
}

export async function signInWithEmail(email: string, password: string): Promise<FirebaseUser> {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return userCredential.user
  } catch (error) {
    console.error('signInWithEmail error:', error)
    throw error
  }
}

export async function signInWithGoogle(): Promise<FirebaseUser> {
  try {
    const result = await signInWithPopup(auth, googleProvider)
    const user = result.user

    // Create user record if new
    await setUser(user.uid, {
      uid: user.uid,
      email: user.email || '',
      displayName: user.displayName || 'Google User',
      role: 'parent',
      createdAt: new Date(),
    })

    return user
  } catch (error) {
    console.error('signInWithGoogle error:', error)
    throw error
  }
}

export async function signOut(): Promise<void> {
  try {
    await firebaseSignOut(auth)
  } catch (error) {
    console.error('signOut error:', error)
    throw error
  }
}

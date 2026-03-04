'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { User as FirebaseUser, onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { getUser } from '@/lib/firestore'
import { ensureUserDocument } from '@/lib/auth'
import { User } from '@/types'

interface AuthContextType {
  firebaseUser: FirebaseUser | null
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null)
  const [user, setUserData] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Guard — auth may be null if Firebase not initialized
    if (!auth) {
      Promise.resolve().then(() => setIsLoading(false))
      return
    }

    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        await ensureUserDocument(authUser)
        setFirebaseUser(authUser)
        try {
          const userData = await getUser(authUser.uid)
          setUserData(userData)
        } catch (error) {
          console.error('Error fetching user:', error)
          setUserData(null)
        }
      } else {
        setFirebaseUser(null)
        setUserData(null)
      }
      setIsLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        firebaseUser,
        user,
        isLoading,
        isAuthenticated: !!firebaseUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  // Return both firebaseUser as `user` for convenience
  // so pages can do const { user } = useAuth() and get uid
  return {
    ...context,
    user: context.firebaseUser,
  }
}
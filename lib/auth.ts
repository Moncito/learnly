import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
} from 'firebase/auth'
import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
} from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'

const googleProvider = new GoogleAuthProvider()

// ── ENSURE USER DOCUMENT EXISTS IN FIRESTORE ──────────────
// Called after every login/signup to guarantee the user
// document exists so progress subcollection can be written
export async function ensureUserDocument(firebaseUser: {
  uid: string
  email: string | null
  displayName: string | null
}) {
  try {
    const ref = doc(db, 'users', firebaseUser.uid)
    const snap = await getDoc(ref)

    if (!snap.exists()) {
      await setDoc(ref, {
        uid: firebaseUser.uid,
        email: firebaseUser.email ?? '',
        displayName:
          firebaseUser.displayName ??
          firebaseUser.email?.split('@')[0] ??
          'Explorer',
        createdAt: serverTimestamp(),
        role: 'parent',
      })
    }
  } catch (error) {
    console.error('Error ensuring user document:', error)
  }
}

// ── SIGN UP WITH EMAIL ─────────────────────────────────────
export async function signUpWithEmail(
  email: string,
  password: string,
  displayName?: string
) {
  const result = await createUserWithEmailAndPassword(auth, email, password)

  // Set displayName on Firebase Auth profile if provided
  if (displayName) {
    await updateProfile(result.user, { displayName })
  }

  // Create Firestore user document
  await ensureUserDocument({
    uid: result.user.uid,
    email: result.user.email,
    displayName: displayName ?? result.user.displayName,
  })

  return result
}

// ── SIGN IN WITH EMAIL ─────────────────────────────────────
export async function signInWithEmail(email: string, password: string) {
  const result = await signInWithEmailAndPassword(auth, email, password)

  // Ensure Firestore document exists (for existing users
  // who signed up before this fix was applied)
  await ensureUserDocument(result.user)

  return result
}

// ── SIGN IN WITH GOOGLE ────────────────────────────────────
export async function signInWithGoogle() {
  const result = await signInWithPopup(auth, googleProvider)

  // Ensure Firestore document exists
  await ensureUserDocument(result.user)

  return result
}

// ── SIGN OUT ───────────────────────────────────────────────
export async function signOut() {
  await firebaseSignOut(auth)
}
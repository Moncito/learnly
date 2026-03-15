import { initializeApp, getApps, FirebaseApp } from 'firebase/app'
import { getAuth, Auth, setPersistence, indexedDBLocalPersistence, browserLocalPersistence } from 'firebase/auth'
import { getFirestore, Firestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyCJcPIYGO3qkl--_AwlCuKvlxWMR7QZuIE',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'learnify-9b619.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'learnify-9b619',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'learnify-9b619.firebasestorage.app',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '140869606514',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:140869606514:web:74421e49e157d5e3b336eb',
}

let app: FirebaseApp | null = null
let auth: Auth | null = null
let db: Firestore | null = null

if (firebaseConfig.projectId) {
  app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig)
  auth = getAuth(app)
  db = getFirestore(app)

  // Use indexedDB persistence for Capacitor/APK environment
  // This ensures auth state persists properly when navigating between pages
  setPersistence(auth, indexedDBLocalPersistence).catch(() => {
    // Fallback to browserLocalPersistence if indexedDB fails
    if (auth) {
      setPersistence(auth, browserLocalPersistence).catch(console.error)
    }
  })
}

export { app, auth, db }

export default app
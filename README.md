# Learnly

> A fun, safe, and interactive learning world built for little minds aged 3–6.

![Learnly Banner](https://img.shields.io/badge/Learnly-Preschool%20Learning%20App-4D96FF?style=for-the-badge&logo=react)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![Firebase](https://img.shields.io/badge/Firebase-Firestore-orange?style=flat-square&logo=firebase)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?style=flat-square&logo=vercel)

---

## Overview

Learnly is a preschool learning platform that helps children aged 3–6 explore **Math**, **English**, and **Science** through interactive quizzes, fun visuals, and a reward system. Built with a neo-brutalist design system using warm colors, big fonts, and playful animations — designed to delight both kids and parents.

---

##  Features

-  **Math** — Counting, shapes, addition, and patterns
-  **English** — Alphabet, phonics, first words, and rhyming
-  **Science** — Animals, plants, weather, body parts, and colors
-  **Progress Tracking** — Per-user progress saved to Firestore in real time
-  **Sequential Unlocking** — Complete a lesson to unlock the next one
-  **Star Ratings** — 1–3 stars based on quiz score
-  **Auth** — Email/password and Google sign-in via Firebase Auth
-  **Progress Page** — Subject breakdown with completion percentages
-  **Responsive** — Works on mobile, tablet, and desktop
-  **Per-user data isolation** — Each user's progress is completely private

---

## 🛠 Tech Stack

| Layer      | Technology                                       |
| ---------- | ------------------------------------------------ |
| Framework  | Next.js 15 (App Router)                          |
| Language   | TypeScript                                       |
| Styling    | Inline styles + CSS-in-JS (zero Tailwind tokens) |
| Auth       | Firebase Authentication                          |
| Database   | Firebase Firestore                               |
| Animations | Framer Motion                                    |
| Fonts      | Fredoka One + Nunito (Google Fonts)              |
| Deployment | Vercel                                           |

---

## Project Structure

```
learnly/
├── app/
│   ├── (auth)/
│   │   ├── login/          # Login page
│   │   └── signup/         # Signup page
│   ├── (dashboard)/
│   │   ├── dashboard/      # Main dashboard
│   │   ├── lessons/
│   │   │   └── [subjectId] # Lessons list per subject
│   │   ├── progress/       # Progress overview page
│   │   └── quiz/
│   │       └── [lessonId]  # Quiz page
│   ├── layout.tsx
│   └── page.tsx            # Welcome/landing page
├── components/
│   ├── home/               # Landing page sections
│   │   ├── CtaBand.tsx
│   │   ├── Hero.tsx
│   │   ├── HowItWorks.tsx
│   │   └── Subjects.tsx
│   ├── lessons/            # Lesson/quiz components
│   └── ui/                 # Shared UI components
│       ├── BackgroundBlobs.tsx
│       ├── Navbar.tsx
│       └── Footer.tsx
├── constants/
│   └── subjects.ts         # All subjects and lesson seed data
├── context/
│   └── AuthContext.tsx     # Firebase auth context
├── hooks/
│   ├── useLessons.ts       # Subject and lesson hooks
│   └── useProgress.ts      # Real-time Firestore progress hook
├── lib/
│   ├── auth.ts             # Firebase auth functions
│   ├── firebase.ts         # Firebase initialization
│   └── firestore.ts        # Firestore CRUD functions
└── types/
    └── index.ts            # TypeScript interfaces
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- A Firebase project

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/learnly.git
cd learnly
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up Firebase

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project
3. Enable **Authentication** (Email/Password + Google)
4. Enable **Firestore Database**
5. Set Firestore rules (see below)

### 4. Configure environment variables

Create a `.env.local` file in the root:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 5. Set Firestore Security Rules

In Firebase Console → Firestore → Rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    match /users/{userId} {
      allow read, write: if request.auth != null
                         && request.auth.uid == userId;
      match /progress/{progressId} {
        allow read, write: if request.auth != null
                           && request.auth.uid == userId;
      }
    }

    match /children/{childId} {
      allow read, write: if request.auth != null
                         && request.auth.uid == resource.data.parentId;
    }

    match /subjects/{docId} {
      allow read: if true;
      allow write: if false;
    }

    match /badges/{docId} {
      allow read: if true;
      allow write: if false;
    }

    match /earnedBadges/{docId} {
      allow read, write: if request.auth != null
                         && request.auth.uid == resource.data.parentId;
    }
  }
}
```

### 6. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

##  Lesson Content

Learnly ships with **15 lessons** across 3 subjects — 5 per subject:

###  Math

| #   | Lesson          | Difficulty |
| --- | --------------- | ---------- |
| 1   | Counting 1–5    | ⭐         |
| 2   | Counting 6–10   | ⭐         |
| 3   | Basic Shapes    | ⭐         |
| 4   | Simple Addition | ⭐⭐       |
| 5   | Patterns        | ⭐⭐       |

### 📖 English

| #   | Lesson         | Difficulty |
| --- | -------------- | ---------- |
| 1   | Alphabet A–M   | ⭐         |
| 2   | Alphabet N–Z   | ⭐         |
| 3   | Phonics Basics | ⭐         |
| 4   | First Words    | ⭐⭐       |
| 5   | Rhyming Words  | ⭐⭐       |

### 🔬 Science

| #   | Lesson            | Difficulty |
| --- | ----------------- | ---------- |
| 1   | Animals Around Us | ⭐         |
| 2   | Plants & Trees    | ⭐         |
| 3   | Weather           | ⭐         |
| 4   | My Body           | ⭐         |
| 5   | Colors in Nature  | ⭐⭐       |

---

## Design System

Learnly uses a **neo-brutalist** design language:

| Token         | Value                  |
| ------------- | ---------------------- |
| Background    | `#FFFBF0` (warm cream) |
| Primary       | `#4D96FF` (blue)       |
| Math color    | `#FF6B6B` (coral)      |
| English color | `#4D96FF` (blue)       |
| Science color | `#6BCB77` (green)      |
| Accent        | `#FFD93D` (yellow)     |
| Text          | `#2D2D2D`              |
| Muted         | `#7A7A7A`              |
| Border        | `2.5px solid #2D2D2D`  |
| Shadow        | `5px 5px 0 #2D2D2D`    |
| Heading font  | Fredoka One            |
| Body font     | Nunito                 |

---

## 🗃 Firestore Data Structure

```
users/
  {uid}/
    displayName: string
    email: string
    role: 'parent'
    createdAt: timestamp
    progress/
      {lessonId}/
        lessonId: string
        subjectId: string
        status: 'completed' | 'in_progress'
        score: number
        totalQuestions: number
        completedAt: timestamp
        updatedAt: timestamp
        userId: string
```

---

## 🚢 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repo
3. Add all environment variables from `.env.local`
4. Click **Deploy**

```bash
# Or deploy via CLI
npm i -g vercel
vercel --prod
```

---

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## 🔮 Roadmap

- [ ] Badges and achievements system
- [ ] Parent dashboard with child progress overview
- [ ] Audio narration for questions
- [ ] More lesson types (drag and drop, matching)
- [ ] Leaderboard between friends
- [ ] Offline support with PWA
- [ ] Multiple child profiles per parent account

---

## Contributing

Contributions are welcome! Please open an issue first to discuss what you'd like to change.

1. Fork the repo
2. Create a feature branch (`git checkout -b feat/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feat/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

<div align="center">
  <p>Built with ❤️ for little learners everywhere</p>
  <p>
    <a href="https://learnly.vercel.app">Live Demo</a> ·
    <a href="https://github.com/YOUR_USERNAME/learnly/issues">Report Bug</a> ·
    <a href="https://github.com/YOUR_USERNAME/learnly/issues">Request Feature</a>
  </p>
</div>

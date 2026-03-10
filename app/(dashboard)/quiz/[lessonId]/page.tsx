import QuizClient from './QuizClient'

interface QuizPageProps {
  params: Promise<{
    lessonId: string
  }>
}

export async function generateStaticParams() {
  return [
    { lessonId: 'math-1' },
    { lessonId: 'math-2' },
    { lessonId: 'math-3' },
    { lessonId: 'math-4' },
    { lessonId: 'math-5' },
    { lessonId: 'english-1' },
    { lessonId: 'english-2' },
    { lessonId: 'english-3' },
    { lessonId: 'english-4' },
    { lessonId: 'english-5' },
    { lessonId: 'science-1' },
    { lessonId: 'science-2' },
    { lessonId: 'science-3' },
    { lessonId: 'science-4' },
    { lessonId: 'science-5' },
  ]
}

export default async function QuizPage({ params }: QuizPageProps) {
  const { lessonId } = await params
  return <QuizClient lessonId={lessonId} />
}
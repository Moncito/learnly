import LessonsClient from './LessonsClient'

interface LessonPageProps {
  params: Promise<{ subjectId: string }>
}

export async function generateStaticParams() {
  return [
    { subjectId: 'math' },
    { subjectId: 'english' },
    { subjectId: 'science' },
  ]
}

export default async function LessonsPage({ params }: LessonPageProps) {
  const { subjectId } = await params
  return <LessonsClient subjectId={subjectId} />
}
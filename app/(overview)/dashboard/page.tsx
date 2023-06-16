import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import prisma from '@/lib/db';
import { FaPlus } from 'react-icons/fa';
import LearningPlanEntry from '@/components/LearningPlanEntry';
import { learningPaths } from '@/mock';
import { LearningPlanPreview } from '@/types/LearningPathTypes';
import LearningPathTemplate from '@/components/LearningPathTemplate';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function Dashboard() {
  const session: any = await getServerSession(authOptions as any);

  if (session) {
    const data = await prisma.learningPath.findMany({
      select: {
        id: true,
        title: true,
        backdrop: true,
        subjects: {
          select: {
            complete: true,
          },
        },
      },
      where: {
        userId: session.user.id,
      },
    });

    const transformed: LearningPlanPreview[] = data.map((learningPath) => ({
      id: learningPath.id,
      title: learningPath.title,
      backdrop: learningPath.backdrop,
      subjectsComplete: learningPath.subjects.filter(
        (subject) => subject.complete
      ).length,
      subjectsCount: learningPath.subjects.length,
      firstSubject: 'start',
    }));

    return (
      <main className='flex-grow bg-gray-100 flex items-center flex-col overflow-auto'>
        <div className='flex justify-around items-end pt-14 pb-8 border-b-2 border-roseQuartz bg-white w-full sticky z-50 -top-10 shadow-xl shadow-thisle'>
          <h2 className='text-2xl font-bold'>Learning Plans</h2>
          <Link
            href='/learning-path/create'
            className='text-lg border flex flex-row p-4 gap-4 items-center rounded-xl border-black transition-all hover:bg-gray-200'
          >
            <FaPlus className='text-black' />
            <span>Create a learning plan</span>
          </Link>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-10'>
          <LearningPathTemplate />
          {transformed.map((learningPath) => (
            <LearningPlanEntry
              key={learningPath.id}
              learningPath={learningPath}
            />
          ))}
        </div>
      </main>
    );
  }

  return <h2>Login plz</h2>;
}

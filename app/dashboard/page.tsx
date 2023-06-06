import LearningPathList from '@/components/LearningPathList';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import prisma from '@/lib/db';

export default async function Dashboard() {
  const learningPaths = await prisma.learningPath.findMany({
    where: {
      userId: '0',
    },
    select: {
      id: true,
      title: true,
      backdrop: true,
      complete: true,
    },
  });

  return (
    <main className='flex-grow bg-gray-100 flex items-center flex-col overflow-auto'>
      <div className='flex justify-around items-end pt-14 pb-8 border-b-2 border-teal-600 bg-white w-full sticky bottom-4'>
        <h2 className='text-2xl font-bold'>Learning Plans</h2>
        <Link href='/learning-path/create'>
          <Button variant='create'>Create a learning plan</Button>
        </Link>
      </div>
      <LearningPathList learningPaths={learningPaths} />
    </main>
  );
}

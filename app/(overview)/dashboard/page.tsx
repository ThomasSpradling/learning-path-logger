import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import prisma from '@/lib/db';
import { FaPlus } from 'react-icons/fa';
import LearningPlanEntry from '@/components/LearningPlanEntry';
import { LearningPlanPreview } from '@/types/LearningPathTypes';
import LearningPathTemplate from '@/components/LearningPathTemplate';
import { getServerSession } from 'next-auth';
import { getAuthSession } from '@/lib/auth';
import { INFINITE_SCROLL_PAGINATION_RESULTS } from '@/config';
import LearningPathList from '@/components/LearningPathList';
import { Suspense } from 'react';

export default async function Dashboard() {
  const session = await getAuthSession();

  if (!session?.user?.id) {
    return (
      <main className='flex-grow w-full flex items-center justify-center'>
        <div className='flex flex-col w-80 items-center justify-center text-center gap-8'>
          Please login or signup before you can view your dashboard!
          <div className='flex flex-row gap-4'>
            <Link
              href='/login'
              className='bg-black text-white rounded-lg px-4 py-2'
            >
              Login
            </Link>
            <Link
              href='/signup'
              className='bg-black text-white rounded-lg px-4 py-2'
            >
              Signup
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const paths = await prisma.learningPath.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      user: true,
      subjects: true,
      units: true,
    },
    take: INFINITE_SCROLL_PAGINATION_RESULTS,
  });

  return (
    <main className='flex-grow margin-0 bg-red-100 relative flex items-center flex-col overflow-scroll bg-[url("https://cdn.shopify.com/s/files/1/0310/8211/9308/products/milton_georgia_classic_closeup_700x700.jpg?v=1592954158")]'>
      <div className='fixed bg-white w-full h-full z-0 opacity-90' />
      <div className='flex justify-between px-6 items-center pt-4 pb-4 border-b-2 border-roseQuartz bg-white w-full sticky z-50 top-0'>
        <h2 className='text-2xl font-bold'>Learning Plans</h2>
        <Link
          href='/learning-path/create'
          className='text-lg border flex flex-row p-4 gap-4 items-center rounded-xl border-black transition-all hover:bg-gray-200'
        >
          <FaPlus className='text-black' />
          <span>Create a learning plan</span>
        </Link>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 z-10 gap-10 my-10'>
        <LearningPathTemplate />
        <LearningPathList initialPaths={paths} />
      </div>
    </main>
  );
}

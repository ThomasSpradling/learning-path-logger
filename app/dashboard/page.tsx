import LearningPathList from '@/components/LearningPathList';
import { Button } from '@/components/ui/Button';
import { LearningPathThumbnail } from '@/types/LearningPathTypes';
import Link from 'next/link';

const learningPaths: LearningPathThumbnail[] = [
  {
    id: '1',
    title: 'Example learning path 1',
    backdrop:
      'https://images.unsplash.com/photo-1576502200916-3808e07386a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2930&q=80',
    complete: false,
  },
  {
    id: '2',
    title: 'Example learning path 2',
    backdrop:
      'https://plus.unsplash.com/premium_photo-1674595900656-704739908c7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80',
    complete: false,
  },
  {
    id: '3',
    title: 'Example learning path 3',
    backdrop: '',
    complete: false,
  },
  {
    id: '4',
    title: 'Example learning path 4',
    backdrop:
      'https://images.unsplash.com/photo-1588585995296-a801061a06de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    complete: true,
  },
  {
    id: '5',
    title: 'Example learning path 5',
    backdrop:
      'https://plus.unsplash.com/premium_photo-1673187699896-f4e82e99cca0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80',
    complete: false,
  },
  {
    id: '6',
    title: 'Example learning path 6',
    backdrop:
      'https://plus.unsplash.com/premium_photo-1673959393387-59c08c4f700f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2832&q=80',
    complete: true,
  },
  {
    id: '7',
    title: 'Example learning path 7',
    backdrop:
      'https://images.unsplash.com/photo-1486551937199-baf066858de7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1533&q=80',
    complete: false,
  },
  {
    id: '8',
    title: 'Example learning path 8',
    backdrop:
      'https://plus.unsplash.com/premium_photo-1673187700018-16ed05b10692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80',
    complete: true,
  },
  {
    id: '9',
    title: 'Example learning path 9',
    backdrop: '',
    complete: true,
  },
  {
    id: '10',
    title: 'Example learning path 10',
    backdrop:
      'https://images.unsplash.com/photo-1553356084-58ef4a67b2a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80',
    complete: false,
  },
];

export default function Dashboard() {
  return (
    <main className='flex-grow bg-gray-100 flex items-center flex-col overflow-auto'>
      <div className='flex justify-around items-end pt-14 pb-8 border-b-2 border-teal-600 bg-white w-full sticky bottom-4'>
        <h2 className='text-2xl font-bold'>Learning Plans</h2>
        <Link href='/create-path'>
          <Button variant='create'>Create a learning plan</Button>
        </Link>
      </div>
      <LearningPathList learningPaths={learningPaths} />
    </main>
  );
}

import { LearningPlanPreview } from '@/types/LearningPathTypes';
import Link from 'next/link';
import { FaPlus } from 'react-icons/fa';

export default function LearningPathTemplate() {
  return (
    <Link href={`/learning-path/create`}>
      <div className='rounded-2xl w-72 h-72 hover:text-roseQuartz  shadow-md border-4 bg-white border-thisle text-thisle hover:border-roseQuartz border-dashed transition-all cursor-pointer flex items-center justify-center'>
        <FaPlus className='text-4xl' />
      </div>
    </Link>
  );
}

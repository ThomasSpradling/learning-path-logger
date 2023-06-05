import { LearningPathThumbnail } from '@/types/LearningPathTypes';
import Link from 'next/link';
import { FaCheck } from 'react-icons/fa';

export default function LearningPathListEntry({
  learningPath,
}: {
  learningPath: LearningPathThumbnail;
}) {
  return (
    <Link href={`/learning-path/${learningPath.id}`}>
      <div
        style={{ backgroundImage: `url(${learningPath.backdrop})` }}
        className={`
          rounded-xl relative h-36 flex flex-col bg-normal bg-center hover:bg-zoom gap-10 bg-white p-6
          shadow-md hover:shadow-lg before:transition-all transition-all duration-300 shadow-gray-500 hover:shadow-gray-800
          before:rounded-xl before:content-[""] before:absolute before:inset-0 before:bg-black before:opacity-20 hover:before:opacity-40
          ${
            learningPath.complete &&
            'border-2 border-green-700 before:bg-green-400 before:opacity-40'
          }
        `}
      >
        {learningPath.complete ? (
          <div className='absolute -top-2 -right-2 rounded-full bg-green-400 border-2 border-green-700 text-green-700 p-2'>
            <FaCheck />
          </div>
        ) : (
          ''
        )}
        <h3
          style={{ textShadow: '0 0 7px black' }}
          className='text-lg font-bold text-white z-10'
        >
          {learningPath.title}
        </h3>
      </div>
    </Link>
  );
}

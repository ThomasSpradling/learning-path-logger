'use client';

import { LearningPlanPreview } from '@/types/LearningPathTypes';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Link from 'next/link';
import Image from 'next/image';

export default function LearningPlanEntry({
  learningPath,
}: {
  learningPath: LearningPlanPreview;
}) {
  return (
    <Link
      href={`/learning-path/${learningPath.id}/${learningPath.firstSubject}`}
    >
      <div className='bg-white overflow-hidden rounded-2xl w-72 h-72 shadow-md shadow-gray-400 hover:shadow-gray-500 hover:shadow-lg transition-all cursor-pointer'>
        <div
          style={{ backgroundImage: `url(${learningPath.backdrop})` }}
          className={'h-2/3 bg-cover bg-center bg-gray-200'}
        ></div>
        <div className='flex flex-row items-center justify-between mx-5 h-1/3'>
          <h3 className='text-xl  w-2/3'>{learningPath.title}</h3>
          <div className='w-14 h-14'>
            <CircularProgressbar
              value={Math.floor(
                (learningPath.subjectsComplete / learningPath.subjectsCount) *
                  100
              )}
              strokeWidth={10}
              text={`${Math.floor(
                (learningPath.subjectsComplete / learningPath.subjectsCount) *
                  100
              )}%`}
              styles={buildStyles({
                pathColor: '#22c55e',
                textColor: 'black',
                trailColor: '#eee',
              })}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}

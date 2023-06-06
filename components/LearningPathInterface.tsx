'use client';

import PreqGraph from '@/components/PreqGraph';
import ScheduleList from '@/components/ScheduleList';
import { Button } from '@/components/ui/Button';
import { LearningPathThumbnail } from '@/types/LearningPathTypes';
import { useState } from 'react';
import { FaList, FaNetworkWired } from 'react-icons/fa';

export default function ILearningPath({
  metadata,
}: {
  metadata: LearningPathThumbnail;
}) {
  const [display, setDisplay] = useState<'schedule' | 'progress'>('schedule');

  return (
    <main className='flex-grow bg-gray-100 flex items-center flex-col overflow-auto h-full'>
      <div className='pt-4 pb-8 border-b-2 border-teal-600 bg-white w-full'>
        <h2 className='text-2xl font-bold ml-32 mb-10'>{metadata.title}</h2>
        <div className='flex ml-44 items-center'>
          View:
          <div className='flex'>
            <Button
              variant={display === 'schedule' ? 'selectActive' : 'select'}
              onClick={() => setDisplay('schedule')}
            >
              Schedule <FaList className='ml-3' />
            </Button>
            <Button
              variant={display === 'progress' ? 'selectActive' : 'select'}
              onClick={() => setDisplay('progress')}
            >
              Progress <FaNetworkWired className='ml-3' />
            </Button>
          </div>
        </div>
      </div>
      {display === 'schedule' ? (
        <ScheduleList metadata={metadata} />
      ) : (
        <PreqGraph metadata={metadata} />
      )}
    </main>
  );
}

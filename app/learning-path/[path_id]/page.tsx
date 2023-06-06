'use client';

import ScheduleList from '@/components/ScheduleList';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { useState } from 'react';
import { FaList, FaNetworkWired } from 'react-icons/fa';

type Props = {
  params: {
    path_id: string;
  };
};

const dummyMeta = {
  id: '1',
  title: 'Example learning path 1',
  backdrop:
    'https://images.unsplash.com/photo-1576502200916-3808e07386a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2930&q=80',
  complete: false,
};

export default function CreateLearningPath({ params }: Props) {
  const [display, setDisplay] = useState('schedule');
  return (
    <main className='flex-grow bg-gray-100 flex items-center flex-col overflow-auto'>
      <div className='pt-4 pb-8 border-b-2 border-teal-600 bg-white w-full'>
        <h2 className='text-2xl font-bold ml-32 mb-10'>{dummyMeta.title}</h2>
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
      {display === 'schedule' ? <ScheduleList learningPathId='4' /> : ''}
    </main>
  );
}

// prettier-ignore
'use client';

import { Schedule, SubjectProgress } from '@/types/LearningPathTypes';
import { convertSubjectPreviewToSchedule, convertToGraph } from '@/utils';
import { useStore } from '@/zustand/store';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Graph from '@/components/Graph';
import EditSchedule from '@/components/EditSchedule';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function Page() {
  const { data: session, status } = useSession();

  const router = useRouter();

  const [pathTitle, setPathTitle] = useState('');
  const [page, setPage] = useState(0);

  // Progress section
  const [graph, setGraph] = useState<SubjectProgress>({ nodes: [], edges: [] });
  const subjects = useStore((state) => state.subjects);
  const setSubjects = useStore((state) => state.setSubjects);

  // Units section
  const [schedule, setSchedule] = useState<Schedule>([]);
  const units = useStore((state) => state.units);
  const setUnits = useStore((state) => state.setUnits);

  useEffect(() => {
    setSubjects([]);
    setUnits([]);
  }, [setSubjects, setUnits]);

  useEffect(() => {
    let temp1 = graph;
    try {
      temp1 = convertToGraph(subjects);
    } catch (e) {
      console.log(e);
      alert('Error: You have a cycle in your graph.');
    }
    setGraph(temp1);

    let temp2 = convertSubjectPreviewToSchedule(subjects);
    setSchedule(temp2);
  }, [subjects, graph]);

  const handleComplete = async () => {
    if (session && session.user) {
      await fetch('/api/paths', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // userId: 'clikw5oss0000jaebwfsd00cd',
          userId: session.user.id,
          title: pathTitle,
          subjects,
        }),
      });
      router.push('/dashboard');
    }
  };

  return (
    <div className='flex-grow w-full flex flex-col relative'>
      <div className='w-full h-1/5 border-b-4 border-b-roseQuartz flex items-center'>
        <input
          className='ml-[10vw] text-3xl font-bold border-b-2 border-b-white focus:border-b-thisle outline-none w-2/3'
          placeholder='Example Planner'
          value={pathTitle}
          onChange={(e) => setPathTitle(e.target.value)}
        />
      </div>
      <div className='w-full h-4/5 relative'>
        {page === 0 && (
          <>
            <button
              onClick={() => setPage(1)}
              className='flex shadow-lg shadow-gray-300 flex-row items-center gap-2 z-50 absolute bottom-10 right-10 py-3 px-4 bg-white border-2 transition-all border-roseQuartz hover:bg-[#f9ebfc] hover:opacity-70'
            >
              Next <FaChevronRight />
            </button>
            <Graph nodes={graph.nodes} edges={graph.edges} editMode={true} />
          </>
        )}
        {page === 1 && (
          <>
            <EditSchedule units={units} schedule={schedule} />
            <button
              onClick={() => setPage(0)}
              className='flex shadow-lg shadow-gray-300 flex-row items-center gap-2 z-50 absolute bottom-10 left-10 py-3 px-4 bg-white border-2 transition-all border-roseQuartz hover:bg-[#f9ebfc] hover:opacity-70'
            >
              <FaChevronLeft /> Previous
            </button>
            <button
              onClick={handleComplete}
              className='flex shadow-lg shadow-gray-300 flex-row items-center gap-2 z-50 absolute bottom-10 right-10 py-3 px-4 bg-white border-2 transition-all border-roseQuartz hover:bg-[#f9ebfc] hover:opacity-70'
            >
              Save and Complete <FaChevronRight />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

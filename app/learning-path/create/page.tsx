// prettier-ignore
'use client';

import { Schedule, SubjectProgress } from '@/types/LearningPathTypes';
import { convertSubjectPreviewToSchedule, convertToGraph } from '@/utils';
import { useStore } from '@/zustand/store';
import { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Graph from '@/components/Graph';
import EditSchedule from '@/components/EditSchedule';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { useToast } from '@/hooks/useToast';
import { Loader2 } from 'lucide-react';

export default function Page() {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

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
    let temp1;
    try {
      temp1 = convertToGraph(subjects);
    } catch (e) {
      setIsError(true);
      toast({
        title: 'Graph Error',
        description:
          'Your chart is cyclic! Please refresh the page to try again.',
        variant: 'destructive',
      });
      return;
    }
    if (temp1) {
      setGraph(temp1);
    }

    let temp2 = convertSubjectPreviewToSchedule(subjects);
    setSchedule(temp2);
  }, [subjects, toast]);

  const handleComplete = async () => {
    if (!pathTitle) {
      return toast({
        title: 'Error',
        description: 'You must include a title for the path!',
        variant: 'destructive',
      });
    }

    let flag = false;
    for (let i = 0; i < graph.nodes.length; i++) {
      if (graph.nodes[i].id === 'END') {
        flag = true;
      }
    }

    if (!flag) {
      return toast({
        title: 'Error',
        description:
          'You must include a an END block on your chart! To do this, press the FLAG icon on any subject. This will mark the end of your learning journey.',
        variant: 'destructive',
      });
    }

    if (!units.length) {
      return toast({
        title: 'Error',
        description: 'You must have at least one unit listed!',
        variant: 'destructive',
      });
    }

    flag = true;

    for (let i = 0; i < schedule.length; i++) {
      if (schedule[i].id.length === 0) {
        flag = false;
      }
    }

    if (!schedule.length || !flag) {
      return toast({
        title: 'Error',
        description:
          'Make sure to have at least one subject you want to study, for each unit!',
        variant: 'destructive',
      });
    }

    if (session && session.user) {
      try {
        setIsLoading(true);
        await axios.post('/api/paths', {
          userId: session.user.id,
          title: pathTitle,
          subjects,
        });
        router.push('/dashboard');
      } catch (error) {
        toast({
          title: 'Error',
          description: 'A server error has occured! Please try again later.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className='flex-grow w-full flex flex-col relative'>
      <div className='w-full h-24 border-b-2 border-b-gray-400 flex items-center'>
        <input
          className='ml-[10vw] text-3xl font-bold border-b-2 border-b-white focus:border-b-thisle outline-none w-2/3'
          placeholder='Example Planner'
          value={pathTitle}
          onChange={(e) => setPathTitle(e.target.value)}
        />
      </div>
      <div className='w-full flex-grow relative'>
        {page === 0 && (
          <>
            <button
              onClick={() => setPage(1)}
              className='disabled:cursor-not-allowed flex shadow-lg shadow-gray-300 flex-row items-center gap-2 z-50 absolute bottom-10 right-10 py-3 px-4 bg-white border-2 transition-all border-roseQuartz hover:bg-[#f9ebfc] hover:opacity-70'
              disabled={isError}
            >
              Next <FaChevronRight />
            </button>
            <Graph nodes={graph.nodes} edges={graph.edges} editMode={true} />
          </>
        )}
        {page === 1 && (
          <>
            <EditSchedule
              units={units}
              schedule={schedule}
              showAdd={
                schedule.filter((item) => item.id.length > 0).length <
                subjects.length
              }
            />
            <button
              onClick={() => setPage(0)}
              className='disabled:opacity-70 disabled:cursor-not-allowed flex shadow-lg shadow-gray-300 flex-row items-center gap-2 z-50 absolute bottom-10 left-10 py-3 px-4 bg-white border-2 transition-all border-roseQuartz hover:bg-[#f9ebfc] hover:opacity-70'
              disabled={isLoading}
            >
              <FaChevronLeft /> Previous
            </button>
            <button
              onClick={handleComplete}
              className='disabled:opacity-70 disabled:cursor-not-allowed flex shadow-lg shadow-gray-300 flex-row items-center gap-2 z-50 absolute bottom-10 right-10 py-3 px-4 bg-white border-2 transition-all border-roseQuartz hover:bg-[#f9ebfc] hover:opacity-70'
              disabled={isLoading}
            >
              Save and Complete{' '}
              {!isLoading ? (
                <FaChevronRight />
              ) : (
                <Loader2 className='animate-spin' />
              )}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

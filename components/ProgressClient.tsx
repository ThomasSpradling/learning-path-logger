// prettier-ignore
'use client';

import Link from 'next/link';
import Graph from './Graph';
import { FaChevronLeft } from 'react-icons/fa';
import { useStore } from '@/zustand/store';
import { SubjectPreview, SubjectProgress } from '@/types/LearningPathTypes';
import { convertToGraph } from '@/utils';
import { useEffect, useState } from 'react';

export default function ProgressClient({
  data,
  params,
}: {
  data: SubjectPreview[];
  params: { path_id: string };
}) {
  const [graph, setGraph] = useState<SubjectProgress>({ nodes: [], edges: [] });
  const subjects = useStore((state) => state.subjects);
  const setSubjects = useStore((state) => state.setSubjects);

  useEffect(() => {
    setSubjects(data);
  }, []);

  useEffect(() => {
    let temp = graph;
    try {
      temp = convertToGraph(subjects);
    } catch (e) {
      console.log(e);
      alert('Error: You have a cycle in your graph.');
    }
    setGraph(temp);
  }, [subjects]);

  return (
    <div className='flex-grow w-full flex justify-center items-center relative'>
      <div className='w-full h-full'>
        <Graph nodes={graph.nodes} edges={graph.edges} editMode={false} />
        <Link
          href={`learning-path/${params.path_id}/start`}
          className='flex shadow-lg shadow-gray-300 flex-row items-center gap-2 z-50 absolute top-10 left-10 py-3 px-4 bg-white border-2 transition-all border-roseQuartz hover:left-5 hover:bg-[#f9ebfc] hover:opacity-70'
        >
          <FaChevronLeft />
          <span>Back to Schedule</span>
        </Link>
      </div>
    </div>
  );
}

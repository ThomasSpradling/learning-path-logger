import { SubjectProgress } from '@/types/LearningPathTypes';
import { convertToGraph } from '@/utils';
import { useStore } from '@/zustand/store';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Graph from '@/components/Graph';
import EditSchedule from '@/components/EditSchedule';
import ProgressClient from '@/components/ProgressClient';
import { exampleSubjects } from '@/mock';
import prisma from '@/lib/db';

export default async function Page({
  params,
}: {
  params: { path_id: string };
}) {
  const data = await prisma.subject.findMany({
    where: { learningPathId: params.path_id },
    select: {
      learningPathId: true,
      complete: true,
      id: true,
      title: true,
      order: true,
      unit: {
        select: {
          id: true,
          title: true,
          order: true,
        },
      },
      prerequisites: {
        select: { id: true },
      },
      children: {
        select: { id: true },
      },
      prereqsHaveStart: true,
      childrenHaveEnd: true,
    },
  });

  const normalizedData = data.map((subject) => ({
    ...subject,
    prerequisites: [
      ...subject.prerequisites.map((prereq) => prereq.id),
      ...(subject.prereqsHaveStart ? ['START'] : []),
    ],
    children: [
      ...subject.children.map((child) => child.id),
      ...(subject.childrenHaveEnd ? ['END'] : []),
    ],
  }));

  return (
    <div className='flex-grow w-full flex flex-col relative'>
      <ProgressClient params={params} data={normalizedData} />
    </div>
  );
}

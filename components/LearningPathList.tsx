'use client';

import { INFINITE_SCROLL_PAGINATION_RESULTS } from '@/config';
import prisma from '@/lib/db';
import { ExtendedPath } from '@/types/db';
import { useIntersection } from '@mantine/hooks';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { Fragment, useEffect, useRef } from 'react';
import axios from 'axios';
import LearningPlanEntry from './LearningPlanEntry';

export default function LearningPathList({
  initialPaths,
}: {
  initialPaths: ExtendedPath[];
}) {
  const lastPostRef = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ['path-cache'],
    async ({ pageParam = 1 }) => {
      const query = `api/learning-paths?limit=${INFINITE_SCROLL_PAGINATION_RESULTS}&page=${pageParam}`;
      const { data } = await axios.get(query);
      return data as ExtendedPath[];
    },
    {
      getNextPageParam: (_, pages) => {
        return pages.length + 1;
      },
      initialData: { pages: [initialPaths], pageParams: [1] },
    }
  );

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage]);

  const paths = data?.pages.flatMap((page) => page) ?? initialPaths;

  return paths.map((path, index) => {
    const subjectsCompleted = path.subjects?.reduce((acc, subj) => {
      return subj.complete ? acc + 1 : acc;
    }, 0);

    const firstUnit =
      path.units.length > 0
        ? path.units?.reduce((min, current) => {
            if (current.order < min.order) {
              return current;
            }
            return min;
          })
        : null;

    const firstSubject =
      firstUnit && path.subjects.length > 0
        ? path.subjects
            ?.filter((subject) => subject.unitId === firstUnit.id)
            ?.reduce((min, current) => {
              if (current.order < min.order) {
                return current;
              }
              return min;
            })
        : null;

    if (firstSubject) {
      if (index === paths.length - 1) {
        return (
          <div key={path.id} ref={ref}>
            <LearningPlanEntry
              learningPath={path}
              subjectsCompleted={subjectsCompleted}
              subjectsCount={path.subjects.length}
              firstSubject={firstSubject.id}
            />
          </div>
        );
      }
      return (
        <LearningPlanEntry
          key={path.id}
          learningPath={path}
          subjectsCompleted={subjectsCompleted}
          subjectsCount={path.subjects.length}
          firstSubject={firstSubject.id}
        />
      );
    }
  });
}

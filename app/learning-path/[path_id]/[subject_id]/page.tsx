import EditPageClient from '@/components/EditPageClient';
import { getAuthSession } from '@/lib/auth';
import prisma from '@/lib/db';
import Link from 'next/link';
import { useState } from 'react';
import { FaEdit, FaSave } from 'react-icons/fa';
import { select } from 'underscore';

export default async function LearningPath({
  params,
}: {
  params: { path_id: string; subject_id: string };
}) {
  const session = await getAuthSession();

  const data = await prisma.subject.findUnique({
    select: {
      title: true,
      content: true,
      learningPath: {
        select: {
          userId: true,
        },
      },
      complete: true,
    },
    where: {
      id: params.subject_id,
    },
  });

  return (
    <div>
      <EditPageClient
        content={data?.content || ''}
        title={data?.title || ''}
        sessionUserId={session?.user?.id || null}
        userId={data?.learningPath.userId || null}
        subjectId={params.subject_id}
        complete={data?.complete || false}
      ></EditPageClient>
    </div>
  );
}

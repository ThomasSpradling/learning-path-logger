import prisma from '@/lib/db';
import { NextResponse } from 'next/server';

type Params = {
  path_id: string;
};

export async function GET(request: Request, { params }: { params: Params }) {
  const data = await prisma.phase.findMany({
    where: {
      learningPathId: params.path_id || undefined,
    },
    select: {
      id: true,
      title: true,
      order: true,
      subjects: {
        select: {
          id: true,
          title: true,
          complete: true,
        },
      },
    },
  });

  return NextResponse.json(data);
}

import prisma from '@/lib/db';
import { Progress } from '@/types/LearningPathTypes';
import { NextRequest, NextResponse } from 'next/server';

type Params = {
  path_id: string;
};

export async function GET(request: Request, { params }: { params: Params }) {
  const nodes = await prisma.subject.findMany({
    where: {
      learningPathId: params.path_id || undefined,
    },
    select: {
      id: true,
      title: true,
      nodeType: true,
      prerequisites: {
        select: {
          id: true,
        },
      },
    },
  });

  let start = '';
  let end = '';

  const transformedNodes: Progress['nodes'] = nodes.map(
    ({ id, title, nodeType }) => {
      if (nodeType === 'start') start = id;
      if (nodeType === 'end') end = id;
      return {
        id: `node--${id}`,
        data: { label: title },
        position: { x: 0, y: 0 },
        type: null,
      };
    }
  );

  transformedNodes.push({
    id: 'start',
    data: { label: 'Start' },
    position: { x: 0, y: 0 },
    type: 'input',
  });

  transformedNodes.push({
    id: 'end',
    data: { label: 'End' },
    position: { x: 0, y: 0 },
    type: 'output',
  });

  const edges = nodes.flatMap((subject) =>
    subject.prerequisites.map((prerequisite) => ({
      id: `edge--${subject.id}__${prerequisite.id}`,
      target: `node--${subject.id}`,
      source: `node--${prerequisite.id}`,
    }))
  );

  console.log(start, end);
  edges.push(
    ...[
      {
        id: 'start',
        source: 'start',
        target: `node--${start}`,
      },
      {
        id: 'end',
        source: `node--${end}`,
        target: 'end',
      },
    ]
  );

  return NextResponse.json({ nodes: transformedNodes, edges });
}

'use client';

import { SubjectNode } from '@/types/LearningPathTypes';
import Flow from './ui/Flow';
import _ from 'underscore';
import { useEffect } from 'react';

type NodeRawData = { [key: string]: SubjectNode[] };

const position = {
  x: 0,
  y: 0,
};

const mockNodes: SubjectNode[] = [
  { id: 'start', title: 'Start', type: 'input' },
  { id: 'a', title: 'Letter A' },
  { id: 'b', title: 'Letter B' },
  { id: 'c', title: 'Letter c' },
  { id: 'd', title: 'Letter d' },
  { id: 'e', title: 'Letter e' },
  { id: 'f', title: 'Letter f' },
  { id: 'g', title: 'Letter g' },
  { id: 'end', title: 'End', type: 'output' },
];

const mockData: NodeRawData = {
  start: [{ id: 'a', title: 'Letter A' }],
  a: [{ id: 'b', title: 'Letter B' }],
  b: [
    { id: 'c', title: 'Letter C' },
    { id: 'd', title: 'Letter D' },
  ],
  c: [],
  d: [{ id: 'g', title: 'Letter G' }],
  e: [{ id: 'f', title: 'Letter F' }],
  f: [{ id: 'g', title: 'Letter G' }],
  g: [{ id: 'end', title: 'End', type: 'output' }],
};

const rawToNodes = (data: NodeRawData, nodeList: SubjectNode[]) => {
  const visited = new Set();
  const nodes = _(nodeList).map(({ id, title, type }) => ({
    id,
    data: { label: title },
    position,
    type: type,
  }));
  const edges = [];
  _(data).each((value, key) => {
    _(value).each((element) => {
      edges.push({
        id: `e${key}${element.id}`,
        source: key,
        target: element.id,
      });
    });
  });

  return { nodes, edges };
};

const { nodes, edges } = rawToNodes(mockData, mockNodes);

export default function PreqGraph({
  learningPathId,
}: {
  learningPathId: string;
}) {
  return (
    <div className='border-2 border-red-500 w-2/3 border-dashed mt-10 h-full'>
      <Flow initialNodes={nodes} initialEdges={edges} />
    </div>
  );
}

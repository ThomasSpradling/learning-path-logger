'use client';

import { Background, BackgroundVariant, ReactFlow } from 'reactflow';
import 'reactflow/dist/style.css';
import dagre from 'dagre';
import { Edge, Node } from '@/types/LearningPathTypes';
import LayerNode from './ui/nodes/LayerNode';
import StartNode from './ui/nodes/StartNode';
import EndNode from './ui/nodes/EndNode';
import DefaultNode from './ui/nodes/DefaultNode';
import { useMemo } from 'react';
import EditNode from './ui/nodes/EditNode';
import EditEndNode from './ui/nodes/EditEndNode';
import { useStore } from '@/zustand/store';
import EditStartNode from './ui/nodes/EditStartNode';

const nodeWidth = 172;
const nodeHeight = 36;

const getLayoutedElements = (nodes: Node[], edges: Edge[]) => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  dagreGraph.setGraph({
    rankdir: 'TB', // Set direction from Left to Right
    ranksep: 150, // Increase separation between ranks
    nodesep: 100, // Increase separation between nodes
    edgesep: 0, // Increase separation between edges
  });

  nodes.forEach((node: Node) => {
    // Check if node is 'START' or 'END' and set rank accordingly
    const isStartOrEndNode = ['START', 'END'].includes(node.id);
    const rank =
      node.id === 'START' ? 0 : node.id === 'END' ? Infinity : undefined;

    dagreGraph.setNode(node.id, {
      width: nodeWidth,
      height: nodeHeight,
      rank: isStartOrEndNode ? rank : undefined,
    });
  });

  edges.forEach((edge, index) => {
    dagreGraph.setEdge(edge.source, edge.target, { weight: 1 });
    edge.id = `edge-${index}`;
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);

    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };

    return node;
  });

  return { nodes, edges };
};

export default function Graph({
  nodes,
  edges,
  editMode = false,
}: {
  nodes: Node[];
  edges: Edge[];
  editMode: boolean;
}) {
  const addChildToSubject = useStore((state) => state.addChildToSubject);

  const handleConnect = (params: { target: string; source: string }) => {
    if (editMode) {
      addChildToSubject(params.target, params.source);
    }
  };

  const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
    nodes,
    edges
  );

  const nodeTypes = useMemo(
    () => ({
      layer: editMode ? EditNode : LayerNode,
      start: editMode ? EditStartNode : StartNode,
      end: editMode ? EditEndNode : EndNode,
      main: editMode ? EditNode : DefaultNode,
    }),
    []
  );

  return (
    <ReactFlow
      nodes={layoutedNodes}
      edges={layoutedEdges}
      nodeTypes={nodeTypes as any}
      panOnScroll
      zoomOnScroll={false}
      zoomOnPinch={false}
      zoomOnDoubleClick={false}
      id='chart'
      onConnect={handleConnect as any}
    >
      <Background variant={BackgroundVariant.Dots} />
    </ReactFlow>
  );
}

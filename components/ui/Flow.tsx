import { useCallback } from 'react';
import ReactFlow, { useEdgesState, useNodesState } from 'reactflow';

import 'reactflow/dist/style.css';
import dagre from 'dagre';
import { Progress } from '@/types/LearningPathTypes';

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 172;
const nodeHeight = 36;

const getLayoutedElements = (
  nodes: Progress['nodes'],
  edges: Progress['edges']
) => {
  dagreGraph.setGraph({});

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
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

function Flow({
  initialNodes,
  initialEdges,
}: {
  initialNodes: Progress['nodes'];
  initialEdges: Progress['edges'];
}) {
  const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
    initialNodes,
    initialEdges
  );

  return (
    <ReactFlow
      nodes={layoutedNodes as any}
      edges={layoutedEdges}
      panOnScroll
      zoomOnScroll={false}
      zoomOnPinch={false}
      zoomOnDoubleClick={false}
      id='chart'
    ></ReactFlow>
  );
}

export default Flow;

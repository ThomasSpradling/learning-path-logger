import { useCallback } from 'react';
import ReactFlow, { useEdgesState, useNodesState } from 'reactflow';

import 'reactflow/dist/style.css';
import dagre from 'dagre';

// const initialNodes = [
//   { id: '1', position: { x: 130, y: 50 }, data: { label: '1' } },
//   { id: '2', position: { x: 130, y: 200 }, data: { label: '2' } },
// ];

// const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 172;
const nodeHeight = 36;

const getLayoutedElements = (nodes, edges, direction = 'TB') => {
  const isHorizontal = direction === 'LB';
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = isHorizontal ? 'left' : 'top';
    node.sourcePosition = isHorizontal ? 'right' : 'bottom';

    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };

    return node;
  });

  return { nodes, edges };
};

function Flow({ initialNodes, initialEdges }) {
  const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
    initialNodes,
    initialEdges
  );

  const [nodes, setNodes] = useNodesState(layoutedNodes);
  const [edges, setEdges] = useEdgesState(layoutedEdges);

  // const onLayout = useCallback(
  //   (direction) => {
  //     const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
  //       nodes,
  //       edges,
  //       direction
  //     );

  //     setNodes([...layoutedNodes]);
  //     setEdges([...layoutedEdges]);
  //   },
  //   [nodes, edges]
  // );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      // onNodesChange={onNodesChange}
      // onEdgesChange={onEdgesChange}
      // onConnect={onConnect}

      panOnScroll
      zoomOnScroll={false}
      zoomOnPinch={false}
      zoomOnDoubleClick={false}
      id='chart'
    ></ReactFlow>
  );
}

export default Flow;

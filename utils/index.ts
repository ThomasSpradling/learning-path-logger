import {
  Edge,
  Node,
  Schedule,
  ScheduleItem,
  SubjectPreview,
  SubjectProgress,
} from '@/types/LearningPathTypes';
import { Graph, alg } from 'graphlib';

export function convertSubjectPreviewToSchedule(
  subjectPreviews: SubjectPreview[]
): Schedule {
  const results = new Set(
    nodesWithZeroIndegree([...subjectPreviews], (subject) => {
      return subject.complete;
    })
  );

  return subjectPreviews
    .reduce<Schedule>((schedule, subject) => {
      let unit = schedule.find(
        (scheduleItem) => scheduleItem.id === subject.unit.id
      );
      if (!unit) {
        unit = {
          id: subject.unit.id,
          title: subject.unit.title,
          order: subject.unit.order,
          subjects: [],
        };
        schedule.push(unit);
      }
      unit.subjects.push({
        id: subject.id,
        title: subject.title,
        complete: subject.complete,
        order: subject.order,
      });
      unit.subjects.sort((a, b) => a.order - b.order);

      return schedule;
    }, [])
    .sort((a, b) => a.order - b.order);
}

export function convertToGraph(subjects: SubjectPreview[]): SubjectProgress {
  const results = new Set(
    nodesWithZeroIndegree([...subjects], (subject) => {
      return subject.complete;
    })
  );

  const nodes: Node[] = [
    {
      id: 'START',
      data: {
        label: 'Start Here!',
        complete: true,
      },
      position: {
        x: 0,
        y: 0,
      },
      type: 'start',
      outDegree: subjects
        .filter((subject) => subject.prerequisites.includes('START'))
        .map((subject) => subject.id),
    },
  ];

  const edges: Edge[] = [];

  let hasEndChild = subjects.some((subject) =>
    subject.children.includes('END')
  );

  for (const subject of subjects) {
    nodes.push({
      id: subject.id,
      data: {
        label: subject.title,
        complete: subject.complete,
        outDegree: subject.children,
      },
      position: {
        x: 0,
        y: 0,
      },
      type: results.has(subject.id) ? 'layer' : 'main',
    });

    for (const child of subject.children) {
      edges.push({
        id: `${subject.id}-${child}`,
        source: subject.id,
        target: child,
        type: 'default',
      });
    }

    for (const prerequisite of subject.prerequisites) {
      edges.push({
        id: `${prerequisite}-${subject.id}`,
        source: prerequisite,
        target: subject.id,
        type: 'default',
      });
    }
  }

  if (hasEndChild) {
    nodes.push({
      id: 'END',
      data: {
        label: 'Complete! 🎉',
        complete: true,
      },
      position: {
        x: 0,
        y: 0,
      },
      type: 'end',
      outDegree: [],
    });
  }

  // Create a new directed graph
  const graph = new Graph({ directed: true });

  // Add all nodes and edges to the graph
  for (const node of nodes) {
    graph.setNode(node.id, node);
  }

  for (const edge of edges) {
    graph.setEdge(edge.source, edge.target);
  }

  // Check if the graph contains a cycle
  if (!alg.isAcyclic(graph)) {
    throw new Error('The graph contains a cycle');
  }

  return { nodes, edges };
}

export function nodesWithZeroIndegree(
  subjects: SubjectPreview[],
  C: (u: SubjectPreview) => boolean
): string[] {
  const g = new Graph();

  for (const subject of subjects) {
    g.setNode(subject.id);
  }

  for (const subject of subjects) {
    for (const child of subject.children) {
      g.setEdge(subject.id, child);
    }
  }

  for (const subject of subjects) {
    if (C(subject)) {
      g.removeNode(subject.id);
    }
  }

  const startNode: string[] = [];
  for (const subject of subjects) {
    if (!C(subject) && g.inEdges(subject.id)?.length === 0) {
      startNode.push(subject.id);
    }
  }

  return startNode;
}

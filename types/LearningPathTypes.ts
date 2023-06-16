export type LearningPathThumbnail = {
  id?: string;
  title: string;
  backdrop: string;
  complete: boolean;
};

// export type Phase = {
//   id: string;
//   title: string;
//   order?: number;
//   subjects?: SubjectItem[];
// };

// export type SubjectItem = {
//   id: string;
//   title: string;
//   order?: number;
//   complete: boolean;
// };

// export type SubjectNode = {
//   id: string;
//   title: string;
//   type?: 'input' | 'output' | null;
//   prerequisites?: SubjectNode[];
// };

// export type Schedule = Phase[];

// export type Progress = {
//   nodes: {
//     id: string;
//     data: {
//       label: string;
//     };
//     position: {
//       x: number;
//       y: number;
//     };
//     type: 'input' | 'output' | null;
//   }[];

//   edges: {
//     id: string;
//     source: string;
//     target: string;
//   }[];
// };

// Official

export type LearningPlanPreview = {
  id: string;
  title: string;
  backdrop?: string;
  subjectsComplete: number;
  subjectsCount: number;
  firstSubject: string;
};

export type Node = {
  id: string;
  data: {
    label: string;
    complete: boolean;
    outDegree?: string[];
  };
  position: {
    x: number;
    y: number;
  };
  type: 'input' | 'start' | 'end' | 'default' | 'main' | 'layer';
  children?: string[];
  outDegree?: string[];
};

export type Edge = {
  id: string;
  source: string;
  target: string;
  type: 'default';
};

// Type that is ideal for into Progress
export type SubjectProgress = {
  nodes: Node[];
  edges: Edge[];
};

// Default fetch form
export type SubjectsPreview = {
  units: {
    id: string;
    title: string;
    order: number;
  }[];
  subjects: SubjectPreview[];
};

export type SubjectPreview = {
  complete: boolean;
  learningPathId: string;
  unit: {
    id: string;
    title: string;
    order: number;
  };
  id: string;
  title: string;
  order: number;
  prerequisites: string[];
  children: string[];
};

// Type that is ideal for inputting into Schedule
export type ScheduleItem = {
  id: string;
  title: string;
  order: number;
  subjects: {
    id: string;
    title: string;
    complete: boolean;
    order: number;
  }[];
};

export type Schedule = ScheduleItem[];

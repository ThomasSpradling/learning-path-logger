export type LearningPathThumbnail = {
  id?: string;
  title: string;
  backdrop: string;
  complete: boolean;
};

export type Phase = {
  id: string;
  title: string;
  order?: number;
  subjects?: SubjectItem[];
};

export type SubjectItem = {
  id: string;
  title: string;
  order?: number;
  complete: boolean;
};

export type SubjectNode = {
  id: string;
  title: string;
  type?: 'input' | 'output' | null;
};

export type Schedule = Phase[];

export type Progress = {
  nodes: {
    id: string;
    data: {
      label: string;
    };
    position: {
      x: number;
      y: number;
    };
    type: 'input' | 'output' | null;
  }[];

  edges: {
    id: string;
    source: string;
    target: string;
  }[];
};

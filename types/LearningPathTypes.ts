export type LearningPathThumbnail = {
  id: string;
  title: string;
  backdrop: string;
  complete: boolean;
};

export type Phase = {
  id: string;
  title: string;
  order?: number;
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
  order?: number;
};

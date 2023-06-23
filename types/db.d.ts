import { LearningPath, Subject, Unit } from '@prisma/client';

export type ExtendedPath = LearningPath & {
  subjects: Subject[];
  units: Unit[];
};

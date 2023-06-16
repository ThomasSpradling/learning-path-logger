// import { SubjectsPreview } from '@/types/LearningPathTypes';
import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

// import create from 'zustand';

export type Unit = {
  id: string;
  title: string;
  order: number;
};

export type SubjectPreview = {
  complete: boolean;
  learningPathId: string;
  unit: Unit;
  id: string;
  title: string;
  order: number;
  prerequisites: string[];
  children: string[];
};

export type SubjectsPreview = {
  units: Unit[];
  subjects: SubjectPreview[];
};

type Store = SubjectsPreview & {
  existsEnd: boolean;
  setExistsEnd: (value: boolean) => void;
  setSubjects: (subjects: SubjectPreview[]) => void;
  setUnits: (units: Unit[]) => void;
  markSubjectAsComplete: (id: string, value: boolean) => void;
  deleteSubject: (id: string) => void;
  deleteUnit: (id: string) => void;
  addChildToSubject: (childId: string, parentId: string) => void;
  createSubject: (
    title: string,
    learningPathId: string,
    parentId: string
  ) => void;
  deleteEndNode: () => void;
  setSubjectTitle: (id: string, newTitle: string) => void;
  createEndNode: (id: string) => void;
  createFromStartNode: (title: string) => void;
  addUnit: (title: string, order: number) => void;
  addSubjectToUnit: (subjectId: string, unitId: string) => void;
  changeUnitTitle: (unitId: string, newTitle: string) => void;
  deleteSubjectFromUnit: (subjectId: string, unitId: string) => void;
};

export const useStore = create<Store>((set) => ({
  units: [],
  subjects: [],
  existsEnd: false,
  learningPathTitle: '',

  addUnit: (title: string, order: number) =>
    set((state) => {
      const newUnit: Unit = {
        id: uuidv4(),
        title: title,
        order: order,
      };
      return { units: [...state.units, newUnit] };
    }),

  addSubjectToUnit: (subjectId: string, unitId: string) =>
    set((state) => {
      const unit = state.units.find((unit) => unit.id === unitId);
      if (!unit) {
        console.error(`No unit found with id: ${unitId}`);
        return state;
      }

      return {
        subjects: state.subjects.map((subject) =>
          subject.id === subjectId ? { ...subject, unit: unit } : subject
        ),
      };
    }),
  deleteSubjectFromUnit: (subjectId: string, unitId: string) =>
    set((state) => {
      const subjectInUnit = state.subjects.find(
        (subject) => subject.id === subjectId && subject.unit.id === unitId
      );

      if (!subjectInUnit) {
        console.error(
          `No subject found with id: ${subjectId} in unit with id: ${unitId}`
        );
        return state;
      }

      const emptyUnit: Unit = { id: '', title: '', order: Infinity };

      return {
        subjects: state.subjects.map((subject) =>
          subject.id === subjectId ? { ...subject, unit: emptyUnit } : subject
        ),
      };
    }),

  changeUnitTitle: (unitId: string, newTitle: string) =>
    set((state) => {
      const updatedUnits = state.units.map((unit) =>
        unit.id === unitId ? { ...unit, title: newTitle } : unit
      );

      const updatedSubjects = state.subjects.map((subject) =>
        subject.unit && subject.unit.id === unitId
          ? { ...subject, unit: { ...subject.unit, title: newTitle } }
          : subject
      );

      return { units: updatedUnits, subjects: updatedSubjects };
    }),

  setExistsEnd: (value) => set({ existsEnd: value }),

  setSubjects: (subjects) =>
    set((state) => {
      let existsEnd = false;
      for (const subject of subjects) {
        if (subject.children.includes('END')) {
          existsEnd = true;
          break;
        }
      }

      return { ...state, subjects, existsEnd };
    }),
  createFromStartNode: (title) =>
    set((state) => {
      const newSubject: SubjectPreview = {
        id: uuidv4(),
        title: title,
        complete: false,
        learningPathId: '', // assuming you want to set this to an empty string or some other value
        unit: {
          id: '',
          title: '',
          order: Infinity,
        },
        order: state.subjects.length, // assuming you want to append this subject to the end
        prerequisites: ['START'],
        children: [],
      };
      return { subjects: [...state.subjects, newSubject] };
    }),
  setUnits: (units) => set({ units }),
  markSubjectAsComplete: (id, value) =>
    set((state) => ({
      subjects: state.subjects.map((subject) =>
        subject.id === id ? { ...subject, complete: value } : subject
      ),
    })),
  deleteSubject: (id) =>
    set((state) => ({
      subjects: state.subjects
        .map((subject) => {
          // remove id from the children array
          const children = subject.children.filter((childId) => childId !== id);

          // return the new subject object
          return { ...subject, children };
        })
        .filter((subject) => subject.id !== id), // filter out the subject with the given id
    })),
  deleteUnit: (id) =>
    set((state) => ({
      units: state.units.filter((unit) => unit.id !== id),
    })),
  createSubject: (title, learningPathId, parentId, childId?: string) =>
    set((state) => {
      const newSubject: SubjectPreview = {
        id: childId || uuidv4(),
        title,
        learningPathId,
        complete: false,
        unit: {
          id: '',
          title: '',
          order: Infinity,
        },
        order: 0,
        prerequisites: [],
        children: [],
      };
      const updatedSubjects = state.subjects.map((subject) =>
        subject.id === parentId
          ? {
              ...subject,
              children: [...subject.children, newSubject.id],
            }
          : subject
      );
      return {
        subjects: [...updatedSubjects, newSubject],
      };
    }),
  addChildToSubject: (childId, parentId) =>
    set((state) => ({
      subjects: state.subjects.map((subject) =>
        subject.id === parentId
          ? {
              ...subject,
              children: [...subject.children, childId],
            }
          : subject
      ),
    })),

  deleteEndNode: () =>
    set((state) => {
      const newSubjects = state.subjects.map((subject) => ({
        ...subject,
        children: subject.children.filter((child) => child !== 'END'),
      }));

      return { ...state, subjects: newSubjects };
    }),

  setSubjectTitle: (id, newTitle) =>
    set((state) => ({
      subjects: state.subjects.map((subject) =>
        subject.id === id ? { ...subject, title: newTitle } : subject
      ),
    })),
  createEndNode: (parentId) =>
    set((state) => {
      const newSubjects = state.subjects.map((subject) => {
        if (subject.id === parentId) {
          return {
            ...subject,
            children: [...subject.children, 'END'],
          };
        } else {
          return subject;
        }
      });

      return { ...state, subjects: newSubjects };
    }),
}));

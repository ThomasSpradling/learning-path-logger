import { LearningPlanPreview, SubjectPreview } from '@/types/LearningPathTypes';

export const learningPaths: LearningPlanPreview[] = [
  {
    id: '0',
    title: 'Nuclear Physics',
    backdrop:
      'https://plus.unsplash.com/premium_photo-1681426678542-613c306013e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
    subjectsComplete: 15,
    subjectsCount: 20,
    firstSubject: '0',
  },
  {
    id: '1',
    title: 'American History',
    backdrop:
      'https://plus.unsplash.com/premium_photo-1677151193419-9be7a26c02cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2380&q=80',
    subjectsComplete: 12,
    subjectsCount: 15,
    firstSubject: '0',
  },
  {
    id: '2',
    title: 'T3 Tech Stack',
    backdrop:
      'https://i1.wp.com/tolustar.com/wp-content/uploads/2020/02/Front-end-Development.jpeg?w=750&ssl=1',
    subjectsComplete: 8,
    subjectsCount: 10,
    firstSubject: '0',
  },
  {
    id: '3',
    title: 'Devops',
    backdrop:
      'https://images.unsplash.com/photo-1593720218365-b2076cfdefee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1742&q=80',
    subjectsComplete: 6,
    subjectsCount: 8,
    firstSubject: '0',
  },
  {
    id: '4',
    title: 'Algebraic Topology',
    backdrop:
      'https://www.researchgate.net/publication/311900931/figure/fig2/AS:443380174987268@1482721479898/Tools-for-Higher-Order-Interactions-from-Algebraic-Topology-a-The-human-connectome-is.png',
    subjectsComplete: 18,
    subjectsCount: 20,
    firstSubject: '0',
  },
  {
    id: '5',
    title: 'Calisthenics',
    backdrop:
      'https://www.streetworkoutstkilda.com/wp-content/uploads/2020/08/human-flag-beast-1.jpeg',
    subjectsComplete: 4,
    subjectsCount: 6,
    firstSubject: '0',
  },
  {
    id: '6',
    title: 'Basic Backend Development',
    backdrop:
      'https://s7280.pcdn.co/wp-content/uploads/2016/06/database-blue.png',
    subjectsComplete: 9,
    subjectsCount: 12,
    firstSubject: '0',
  },
  {
    id: '7',
    title: 'Basic Organic Chemistry',
    backdrop:
      'https://www.asbmb.org/getattachment/8f434166-ef18-48cd-baae-10b5db4328e7/remdesivir-structure-anatomy-of-a-molecule-march-17-Primary-900x506.jpg?lang=en-US&width=900&height=506&ext=.jpg',
    subjectsComplete: 14,
    subjectsCount: 20,
    firstSubject: '0',
  },
  {
    id: '8',
    title: "Didn't",
    backdrop: '',
    subjectsComplete: 5,
    subjectsCount: 8,
    firstSubject: '0',
  },
  {
    id: '9',
    title: 'Want',
    backdrop: '',
    subjectsComplete: 10,
    subjectsCount: 15,
    firstSubject: '0',
  },
  {
    id: '10',
    title: 'To',
    backdrop: '',
    subjectsComplete: 7,
    subjectsCount: 10,
    firstSubject: '0',
  },
  {
    id: '11',
    title: 'Add',
    backdrop: '',
    subjectsComplete: 7,
    subjectsCount: 10,
    firstSubject: '0',
  },
  {
    id: '12',
    title: 'More',
    backdrop: '',
    subjectsComplete: 7,
    subjectsCount: 10,
    firstSubject: '0',
  },
  {
    id: '13',
    title: 'Subjects',
    backdrop: '',
    subjectsComplete: 7,
    subjectsCount: 10,
    firstSubject: '0',
  },
];

export const exampleSubjects: SubjectPreview[] = [
  {
    id: '0',
    learningPathId: '2',
    complete: true,
    title: 'HTML',
    order: 1,
    unit: {
      id: '1',
      title: 'Fundamental Concepts',
      order: 1,
    },
    prerequisites: ['START'],
    children: ['8'],
  },
  {
    id: '1',
    learningPathId: '2',
    complete: false,
    title: 'CSS',
    order: 2,
    unit: {
      id: '1',
      title: 'Fundamental Concepts',
      order: 1,
    },
    prerequisites: ['START'],
    children: ['8', '4'],
  },
  {
    id: '2',
    learningPathId: '2',
    complete: false,
    title: 'JavaScript',
    order: 3,
    unit: {
      id: '1',
      title: 'Fundamental Concepts',
      order: 1,
    },
    prerequisites: ['START'],
    children: ['8', '5', '6'],
  },
  {
    id: '3',
    learningPathId: '2',
    complete: false,
    title: 'PostgreSQL',
    order: 1,
    unit: {
      id: '3',
      title: 'Backend Concepts',
      order: 3,
    },
    prerequisites: ['START'],
    children: ['7'],
  },
  {
    id: '6',
    learningPathId: '2',
    complete: false,
    title: 'Node.js',
    order: 2,
    unit: {
      id: '3',
      title: 'Backend Concepts',
      order: 3,
    },
    prerequisites: ['2'],
    children: ['9', '10'],
  },
  {
    id: '7',
    learningPathId: '2',
    complete: false,
    title: 'Prisma',
    order: 1,
    unit: {
      id: '5',
      title: 'Further Tech',
      order: 5,
    },
    prerequisites: ['3', '5'],
    children: [],
  },
  {
    id: '12',
    learningPathId: '2',
    complete: false,
    title: 'Next.js',
    order: 2,
    unit: {
      id: '5',
      title: 'Further tech',
      order: 5,
    },
    prerequisites: ['8'],
    children: ['END', '13'],
  },
  {
    id: '9',
    learningPathId: '2',
    complete: false,
    title: 'REST API',
    order: 1,
    unit: {
      id: '4',
      title: 'API Paradigms',
      order: 4,
    },
    prerequisites: ['6'],
    children: ['11'],
  },
  {
    id: '10',
    learningPathId: '2',
    complete: false,
    title: 'GraphQL API',
    order: 2,
    unit: {
      id: '4',
      title: 'API Paradigms',
      order: 4,
    },
    prerequisites: ['6'],
    children: ['11'],
  },
  {
    id: '8',
    learningPathId: '2',
    complete: false,
    title: 'React.js',
    order: 1,
    unit: {
      id: '2',
      title: 'Language Frameworks',
      order: 2,
    },
    prerequisites: ['0', '1', '2'],
    children: ['12'],
  },
  {
    id: '4',
    learningPathId: '2',
    complete: false,
    title: 'TailwindCSS',
    order: 2,
    unit: {
      id: '2',
      title: 'Language Frameworks',
      order: 2,
    },
    prerequisites: ['1'],
    children: [],
  },
  {
    id: '5',
    learningPathId: '2',
    complete: false,
    title: 'TypeScript',
    order: 3,
    unit: {
      id: '2',
      title: 'Language Frameworks',
      order: 2,
    },
    prerequisites: ['2'],
    children: ['END', '7', '11'],
  },
  {
    id: '13',
    learningPathId: '2',
    complete: false,
    title: 'NextAuth.js',
    order: 1,
    unit: {
      id: '6',
      title: 'Bonus Topics',
      order: 6,
    },
    prerequisites: ['12'],
    children: [],
  },
  {
    id: '11',
    learningPathId: '2',
    complete: false,
    title: 'tRPC',
    order: 2,
    unit: {
      id: '6',
      title: 'Bonus Topics',
      order: 6,
    },
    prerequisites: ['9', '10', '5'],
    children: [],
  },
];

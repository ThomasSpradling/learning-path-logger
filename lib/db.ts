const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const seed = async () => {
  try {
    const learningPaths = [
      {
        id: '1',
        title: 'Example learning path 1',
        backdrop:
          'https://images.unsplash.com/photo-1576502200916-3808e07386a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2930&q=80',
        complete: false,
        userId: '0',
      },
      {
        id: '2',
        title: 'Example learning path 2',
        backdrop:
          'https://plus.unsplash.com/premium_photo-1674595900656-704739908c7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80',
        complete: false,
        userId: '0',
      },
      {
        id: '3',
        title: 'Example learning path 3',
        backdrop: '',
        complete: false,
        userId: '0',
      },
      {
        id: '4',
        title: 'Example learning path 4',
        backdrop:
          'https://images.unsplash.com/photo-1588585995296-a801061a06de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        complete: true,
        userId: '0',
      },
      {
        id: '5',
        title: 'Example learning path 5',
        backdrop:
          'https://plus.unsplash.com/premium_photo-1673187699896-f4e82e99cca0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80',
        complete: false,
        userId: '0',
      },
      {
        id: '6',
        title: 'Example learning path 6',
        backdrop:
          'https://plus.unsplash.com/premium_photo-1673959393387-59c08c4f700f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2832&q=80',
        complete: true,
        userId: '0',
      },
      {
        id: '7',
        title: 'Example learning path 7',
        backdrop:
          'https://images.unsplash.com/photo-1486551937199-baf066858de7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1533&q=80',
        complete: false,
        userId: '0',
      },
      {
        id: '8',
        title: 'Example learning path 8',
        backdrop:
          'https://plus.unsplash.com/premium_photo-1673187700018-16ed05b10692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80',
        complete: true,
        userId: '0',
      },
      {
        id: '9',
        title: 'Example learning path 9',
        backdrop: '',
        complete: true,
        userId: '0',
      },
      {
        id: '10',
        title: 'Example learning path 10',
        backdrop:
          'https://images.unsplash.com/photo-1553356084-58ef4a67b2a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80',
        complete: false,
        userId: '0',
      },
    ];

    console.log('hello');

    await prisma.learningPath.createMany({
      data: learningPaths,
      skipDuplicates: true,
    });

    console.log('meme');

    const subjects = [
      {
        id: '0',
        title: 'Letter A',
        learningPathId: '1',
        phaseId: '0',
      },
      {
        id: '1',
        title: 'Letter B',
        learningPathId: '1',
        phaseId: '1',
        prerequisites: {
          connect: [{ id: '0' }],
        },
      },
      {
        id: '2',
        title: 'Letter C',
        learningPathId: '1',
        phaseId: '2',
        prerequisites: {
          connect: [{ id: '1' }],
        },
      },
      {
        id: '3',
        title: 'Letter D',
        learningPathId: '1',
        phaseId: '2',
        prerequisites: {
          connect: [{ id: '1' }],
        },
      },
      {
        id: '4',
        title: 'Letter E',
        learningPathId: '1',
        phaseId: '1',
      },
      {
        id: '5',
        title: 'Letter F',
        learningPathId: '1',
        phaseId: '2',
        prerequisites: {
          connect: [{ id: '4' }],
        },
      },
      {
        id: '6',
        title: 'Letter G',
        learningPathId: '1',
        phaseId: '3',
        prerequisites: {
          connect: [{ id: '5' }, { id: '3' }],
        },
      },
    ];

    await prisma.subject.createMany({
      data: subjects,
      skipDuplicates: true,
    });

    const phases = [
      {
        id: '0',
        title: 'Phase 1',
        learningPathId: '1',
      },
      {
        id: '1',
        title: 'Phase 2',
        learningPathId: '1',
      },
      {
        id: '2',
        title: 'Phase 3',
        learningPathId: '1',
      },
      {
        id: '3',
        title: 'Phase 4',
        learningPathId: '1',
      },
    ];

    await prisma.phase.createMany({
      data: phases,
      skipDuplicates: true,
    });
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
};

seed();

export default prisma;

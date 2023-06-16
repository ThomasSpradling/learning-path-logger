import prisma from '@/lib/db';
import { SubjectPreview } from '@/types/LearningPathTypes';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const {
    userId,
    title,
    subjects,
  }: {
    userId: string;
    title: string;
    subjects: SubjectPreview[];
  } = await req.json();

  try {
    const learningPath = await prisma.learningPath.create({
      data: {
        title: title,
        backdrop: '',
        complete: false,
        userId: userId,
      },
    });

    console.log('SUBJECTS', subjects);

    const units = subjects
      .map((subject) => subject.unit)
      .filter(
        (unit, index, self) => index === self.findIndex((t) => t.id === unit.id)
      );

    await Promise.all(
      units.map(async (unit) => {
        await prisma.unit.upsert({
          where: { id: unit.id },
          create: {
            id: unit.id,
            title: unit.title,
            order: unit.order,
            learningPathId: learningPath.id,
          },
          update: {},
        });
      })
    );

    // Create subjects and units
    const createdSubjects = await Promise.all(
      subjects.map(async (subject) => {
        const { id, title, complete, unit, order } = subject;

        const createdSubject = await prisma.subject.create({
          data: {
            id,
            title,
            complete,
            order,
            learningPath: {
              connect: { id: learningPath.id },
            },
            unit: {
              connect: { id: unit.id },
            },
          },
        });

        return createdSubject;
      })
    );

    console.log('CREATED', createdSubjects);

    const updateChildren = async () => {
      await Promise.all(
        subjects.map(async (subject, index) => {
          const { children } = subject;

          if (children) {
            await prisma.subject.update({
              where: { id: createdSubjects[index].id },
              data: {
                children: {
                  connect: children
                    .filter(
                      (childId) => childId !== 'END' && childId !== 'START'
                    )
                    .map((childId) => ({ id: childId })),
                },
              },
            });
          }
        })
      );
    };

    await updateChildren();

    console.log('UPDATE');

    // Update prereqsHaveStart and childrenHaveEnd
    const subjectUpdates = subjects.map(async (subject, index) => {
      const prereqsHaveStart = subject.prerequisites.some(
        (prereqId) => prereqId === 'START'
      );
      const childrenHaveEnd = subject.children.some(
        (childId) => childId === 'END'
      );

      await prisma.subject.update({
        where: { id: createdSubjects[index].id },
        data: {
          prereqsHaveStart,
          childrenHaveEnd,
        },
      });
    });

    await Promise.all(subjectUpdates);

    return NextResponse.json({ message: 'Learning path created successfully' });
  } catch (error) {
    NextResponse.json({ error: 'Failed to create learning path' });
  }
}

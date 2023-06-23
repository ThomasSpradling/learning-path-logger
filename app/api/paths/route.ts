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
        title,
        backdrop: '',
        complete: false,
        userId,
      },
    });

    const units = subjects
      .map((subject) => subject.unit)
      .filter(
        (unit, index, self) => index === self.findIndex((t) => t.id === unit.id)
      );

    await Promise.all(
      units.map((unit) => {
        return prisma.unit.upsert({
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

    const createdSubjects = await Promise.all(
      subjects.map(({ id, title, complete, unit, order }) => {
        return prisma.subject.create({
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
      })
    );

    const updateChildrenAndPrereqs = subjects.map(async (subject, index) => {
      const { children, prerequisites } = subject;
      const prereqsHaveStart = prerequisites.some(
        (prereqId) => prereqId === 'START'
      );
      const childrenHaveEnd = children.some((childId) => childId === 'END');

      const updateData: any = {
        prereqsHaveStart,
        childrenHaveEnd,
      };

      if (children) {
        updateData.children = {
          connect: children
            .filter((childId) => childId !== 'END' && childId !== 'START')
            .map((childId) => ({ id: childId })),
        };
      }

      return prisma.subject.update({
        where: { id: createdSubjects[index].id },
        data: updateData,
      });
    });

    await Promise.all(updateChildrenAndPrereqs);

    return NextResponse.json({ message: 'Learning path created successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create learning path' });
  }
}

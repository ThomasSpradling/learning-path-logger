import prisma from '@/lib/db';

export async function PUT(req: Request) {
  const res: { pathId: string; backdrop: string } = await req.json();

  await prisma.learningPath.update({
    where: {
      id: res.pathId,
    },
    data: {
      backdrop: res.backdrop,
    },
  });

  return new Response('Success', { status: 200 });
}

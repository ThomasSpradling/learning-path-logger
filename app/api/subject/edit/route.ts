import prisma from '@/lib/db';
import { NextResponse } from 'next/server';

export async function PUT(request: Request) {
  const body: { id: string; content: string } = await request.json();

  try {
    await prisma.subject.update({
      where: {
        id: body.id,
      },
      data: {
        content: body.content,
      },
    });

    return NextResponse.json({ id: body.id });
  } catch (e) {
    return new Response('A server error has occurred!', { status: 500 });
  }
}

import prisma from '@/lib/db';
import { NextResponse } from 'next/server';

export async function PUT(request: Request) {
  const body: { id: string; complete: boolean } = await request.json();

  try {
    const subject = await prisma.subject.update({
      where: {
        id: body.id,
      },
      data: {
        complete: body.complete,
      },
    });

    return NextResponse.json({ id: body.id, complete: subject.complete });
  } catch (e) {
    console.log(e);
    return new Response('A server error has occurred!', { status: 500 });
  }
}

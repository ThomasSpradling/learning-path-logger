import { getAuthSession } from '@/lib/auth';
import prisma from '@/lib/db';
import { z } from 'zod';

export async function GET(req: Request) {
  const url = new URL(req.url);

  const session = await getAuthSession();

  try {
    const { limit, page } = z
      .object({
        limit: z.string(),
        page: z.string(),
      })
      .parse({
        limit: url.searchParams.get('limit'),
        page: url.searchParams.get('page'),
      });

    if (session) {
    }

    if (session?.user) {
      const paths = await prisma.learningPath.findMany({
        where: {
          userId: session.user.id,
        },
        include: {
          user: true,
          subjects: true,
          units: true,
        },
        take: parseInt(limit),
        skip: (parseInt(page) - 1) * parseInt(limit),
        // orderBy: {
        //   createdAt: 'desc',
        // }
      });

      return new Response(JSON.stringify(paths));
    } else {
      return new Response('Not authorized', { status: 401 });
    }
  } catch (error) {
    return new Response('Could not fetch paths', { status: 500 });
  }
}

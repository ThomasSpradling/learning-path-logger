import prisma from '@/lib/db';
import * as bcrypt from 'bcrypt';

interface RequestBody {
  username: string;
  password: string;
}

export async function POST(request: Request) {
  if (!request.body) {
    return new Response('No body found');
  }
  const body: RequestBody = await request.json();

  const user = await prisma.user.findFirst({
    where: {
      username: body.username,
    },
  });

  if (user && (await bcrypt.compare(body.password, user.password))) {
    const { password, ...userWithoutPass } = user;
    return new Response(JSON.stringify(userWithoutPass));
  }
  return new Response('Unknown error has occured');
}

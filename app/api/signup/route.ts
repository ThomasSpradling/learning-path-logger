import prisma from '@/lib/db';
import * as bcrypt from 'bcrypt';

interface RequestBody {
  username: string;
  email: string;
  password: string;
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json();

  const user = await prisma.user.findUnique({
    where: {
      username: body.username,
    },
  });

  if (!user) {
    const { password, ...userWithoutPass } = body;
    await prisma.user.create({
      data: {
        username: body.username,
        password: await bcrypt.hash(body.password, 10),
        email: body.email,
      },
    });
    return new Response(JSON.stringify(userWithoutPass));
  }
  return new Response(JSON.stringify(null));
}

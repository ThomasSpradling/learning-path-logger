import prisma from '@/lib/db';
import { signupSchema } from '@/lib/validators/auth';
import * as bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import { z } from 'zod';

interface RequestBody {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json();

  const userName = await prisma.user.findUnique({
    where: {
      username: body.username,
    },
  });

  if (userName) {
    return new Response('A user with this username already exists!', {
      status: 409,
    });
  }

  const userEmail = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (userEmail) {
    return new Response('A user with this email already exists!', {
      status: 409,
    });
  }

  try {
    const { username, email, password } = signupSchema.parse({
      username: body.username,
      email: body.email,
      password: body.password,
      confirmPassword: body.confirmPassword,
    });

    await prisma.user.create({
      data: {
        username,
        email,
        password: await bcrypt.hash(password, 10),
      },
    });

    return NextResponse.json({
      username,
      email,
    });
  } catch (error) {
    console.log(error);
    return new Response('Server error', { status: 500 });
  }
}

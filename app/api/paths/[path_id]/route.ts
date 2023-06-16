import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
  const body = await req.json();
  return NextResponse.json({ example: 'this' });
}

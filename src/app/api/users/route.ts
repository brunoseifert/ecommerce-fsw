import { prismaClient } from '@/lib/prisma';
import bcrypt from 'bcrypt';

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const data = await request.json();
  const { name, email, password } = data;
  console.log('ROUTE HANDLER', data);

  if (!name || !email || !password) {
    return NextResponse.json({ message: 'Dados inválidos' }, { status: 400 });
  }

  const isUserExists = await prismaClient.user.findUnique({
    where: { email },
  });

  if (isUserExists) {
    return NextResponse.json({ message: 'Usuário já existe' }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prismaClient.user.create({
    data: {
      name,
      email,
      hashedPassword,
    },
  });

  return NextResponse.json(user, { status: 201 });
}

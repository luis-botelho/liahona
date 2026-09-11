import type { FastifyRequest } from 'fastify';

import { prisma } from '../../infrastructure/database/prisma.js';

export async function getOptionalUser(
  request: FastifyRequest,
): Promise<{ id: string; role: string } | null> {
  if (!request.headers.authorization) return null;

  try {
    const payload = await request.jwtVerify<{ sub: string }>();
    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
      select: { id: true, role: true },
    });

    return user;
  } catch {
    return null;
  }
}
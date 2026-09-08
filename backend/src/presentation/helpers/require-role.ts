import type { FastifyReply, FastifyRequest } from 'fastify';

import { prisma } from '../../infrastructure/database/prisma.js';

export async function requireUser(
  request: FastifyRequest,
  reply: FastifyReply,
  role: 'WORKER' | 'RECRUITER',
) {
  const payload = await request.jwtVerify<{ sub: string }>();

  const user = await prisma.user.findUnique({
    where: { id: payload.sub },
    select: { id: true, role: true },
  });

  if (!user) {
    reply.status(401).send({
      success: false,
      message: 'Usuário autenticado não encontrado.',
    });

    return null;
  }

  if (user.role !== role) {
    reply.status(403).send({
      success: false,
      message: `Only ${role.toLowerCase()}s can access this resource`,
    });

    return null;
  }

  return user;
}
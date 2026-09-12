import type { FastifyReply, FastifyRequest } from 'fastify';

import { prisma } from '../../infrastructure/database/prisma.js';

export async function requireUser(
  request: FastifyRequest,
  reply: FastifyReply,
  role: 'WORKER' | 'RECRUITER',
) {
  const user = await findAuthenticatedUser(request);

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

export async function requireAnyUser(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const user = await findAuthenticatedUser(request);

  if (!user) {
    reply.status(401).send({
      success: false,
      message: 'Usuário autenticado não encontrado.',
    });

    return null;
  }

  return user;
}

async function findAuthenticatedUser(request: FastifyRequest) {
  const payload = await request.jwtVerify<{ sub: string }>();

  return prisma.user.findUnique({
    where: { id: payload.sub },
    select: {
      id: true,
      role: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}
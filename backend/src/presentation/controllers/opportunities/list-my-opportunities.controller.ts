import type { FastifyReply, FastifyRequest } from 'fastify';

import { prisma } from '../../../infrastructure/database/prisma.js';

export async function listMyOpportunitiesController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const payload = await request.jwtVerify<{ sub: string }>();
  const user = await prisma.user.findUnique({
    where: { id: payload.sub },
    select: { id: true, role: true },
  });

  if (!user) {
    return reply.status(401).send({
      success: false,
      message: 'Usuário autenticado não encontrado.',
    });
  }

  if (user.role !== 'RECRUITER') {
    return reply.status(403).send({
      success: false,
      message: 'Only recruiters can view their opportunities',
    });
  }

  const opportunities = await prisma.opportunity.findMany({
    where: { authorId: user.id },
    orderBy: { createdAt: 'desc' },
    include: {
      author: {
        select: { id: true, name: true },
      },
    },
  });

  return reply.send({ success: true, data: opportunities });
}

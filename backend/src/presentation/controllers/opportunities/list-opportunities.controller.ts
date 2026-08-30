import type { FastifyReply, FastifyRequest } from 'fastify';

import { prisma } from '../../../infrastructure/database/prisma.js';

export async function listOpportunitiesController(
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  const opportunities = await prisma.opportunity.findMany({
    where: { status: 'ACTIVE' },
    orderBy: { createdAt: 'desc' },
    include: {
      author: {
        select: { id: true, name: true },
      },
    },
  });

  return reply.send({ success: true, data: opportunities });
}

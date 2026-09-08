import type { FastifyReply, FastifyRequest } from 'fastify';

import { prisma } from '../../../infrastructure/database/prisma.js';

export async function getOpportunityController(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) {
  const payload = await request.jwtVerify<{ sub: string }>();

  const opportunity = await prisma.opportunity.findUnique({
    where: { id: request.params.id },
    include: {
      author: {
        select: { id: true, name: true },
      },
    },
  });

  if (!opportunity) {
    return reply.status(404).send({
      success: false,
      message: 'Oportunidade não encontrada.',
    });
  }

  const user = await prisma.user.findUnique({
    where: { id: payload.sub },
    select: { id: true, role: true },
  });

  let hasApplied = false;

  if (user?.role === 'WORKER') {
    const application = await prisma.application.findUnique({
      where: {
        opportunityId_workerId: {
          opportunityId: opportunity.id,
          workerId: user.id,
        },
      },
      select: { id: true },
    });

    hasApplied = Boolean(application);
  }

  return reply.send({
    success: true,
    data: {
      ...opportunity,
      tags: opportunity.tags ?? [],
      hasApplied,
    },
  });
}
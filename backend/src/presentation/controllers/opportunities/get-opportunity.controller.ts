import type { FastifyReply, FastifyRequest } from 'fastify';

import { prisma } from '../../../infrastructure/database/prisma.js';

export async function getOpportunityController(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) {
  await request.jwtVerify<{ sub: string }>();

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

  return reply.send({ success: true, data: opportunity });
}
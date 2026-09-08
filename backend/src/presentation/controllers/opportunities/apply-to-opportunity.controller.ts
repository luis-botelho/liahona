import type { FastifyReply, FastifyRequest } from 'fastify';

import { prisma } from '../../../infrastructure/database/prisma.js';
import { requireUser } from '../../helpers/require-role.js';

export async function applyToOpportunityController(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) {
  const user = await requireUser(request, reply, 'WORKER');
  if (!user) return;

  const opportunity = await prisma.opportunity.findUnique({
    where: { id: request.params.id },
    select: { id: true, status: true },
  });

  if (!opportunity) {
    return reply.status(404).send({
      success: false,
      message: 'Oportunidade não encontrada.',
    });
  }

  if (opportunity.status !== 'ACTIVE') {
    return reply.status(400).send({
      success: false,
      message: 'Esta oportunidade está encerrada.',
    });
  }

  try {
    const application = await prisma.application.create({
      data: {
        opportunityId: opportunity.id,
        workerId: user.id,
      },
    });

    return reply.status(201).send({ success: true, data: application });
  } catch (error) {
    if (
      error instanceof Error &&
      error.name === 'PrismaClientKnownRequestError'
    ) {
      const prismaError = error as { code?: string };

      if (prismaError.code === 'P2002') {
        return reply.status(400).send({
          success: false,
          message: 'Você já demonstrou interesse nesta oportunidade.',
        });
      }
    }

    throw error;
  }
}
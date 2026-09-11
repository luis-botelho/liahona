import type { FastifyReply, FastifyRequest } from 'fastify';

import { prisma } from '../../../infrastructure/database/prisma.js';
import { requireUser } from '../../helpers/require-role.js';
import { isTerminalStatus } from '../../../shared/applications/status.js';

export async function withdrawApplicationController(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) {
  const user = await requireUser(request, reply, 'WORKER');
  if (!user) return;

  const application = await prisma.application.findUnique({
    where: { id: request.params.id },
    select: { id: true, workerId: true, status: true },
  });

  if (!application) {
    return reply.status(404).send({
      success: false,
      message: 'Candidatura não encontrada.',
    });
  }

  if (application.workerId !== user.id) {
    return reply.status(403).send({
      success: false,
      message: 'Você não pode alterar esta candidatura.',
    });
  }

  if (isTerminalStatus(application.status)) {
    return reply.status(400).send({
      success: false,
      message: `A candidatura já está ${application.status.toLowerCase()}.`,
    });
  }

  const updated = await prisma.application.update({
    where: { id: application.id },
    data: { status: 'WITHDRAWN' },
    select: { id: true, status: true, updatedAt: true },
  });

  return reply.send({ success: true, data: updated });
}
import type { FastifyReply, FastifyRequest } from 'fastify';

import { prisma } from '../../../infrastructure/database/prisma.js';
import { requireUser } from '../../helpers/require-role.js';
import { canRecruiterSetStatus, type ApplicationStatus } from '../../../shared/applications/status.js';

interface UpdateApplicationStatusParams {
  id: string;
}

interface UpdateApplicationStatusBody {
  status?: string;
}

export async function updateApplicationStatusController(
  request: FastifyRequest<{
    Params: UpdateApplicationStatusParams;
    Body: UpdateApplicationStatusBody;
  }>,
  reply: FastifyReply,
) {
  const user = await requireUser(request, reply, 'RECRUITER');
  if (!user) return;

  const { status } = request.body ?? {};

  if (!status || !canRecruiterSetStatus(status)) {
    return reply.status(400).send({
      success: false,
      message: 'Status inválido para esta ação.',
    });
  }

  const application = await prisma.application.findUnique({
    where: { id: request.params.id },
    select: { id: true, opportunity: { select: { authorId: true } } },
  });

  if (!application) {
    return reply.status(404).send({
      success: false,
      message: 'Candidatura não encontrada.',
    });
  }

  if (application.opportunity.authorId !== user.id) {
    return reply.status(403).send({
      success: false,
      message: 'Você não pode alterar esta candidatura.',
    });
  }

  const updated = await prisma.application.update({
    where: { id: application.id },
    data: { status: status as ApplicationStatus },
    select: { id: true, status: true, updatedAt: true },
  });

  return reply.send({ success: true, data: updated });
}
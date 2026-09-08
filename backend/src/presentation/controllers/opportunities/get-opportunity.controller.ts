import type { FastifyReply, FastifyRequest } from 'fastify';

import { prisma } from '../../../infrastructure/database/prisma.js';

export async function getOpportunityController(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
) {
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

  const user = await getOptionalUser(request);

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

  let authorWhatsapp: string | null = null;

  // O WhatsApp do recrutador é um contato comercial exposto apenas para
  // oportunidades publicadas no LIA, e somente quando houver número configurado.
  if (opportunity.source === 'LIA') {
    const recruiterProfile = await prisma.recruiterProfile.findUnique({
      where: { userId: opportunity.authorId },
      select: { whatsapp: true },
    });

    authorWhatsapp = recruiterProfile?.whatsapp ?? null;
  }

  return reply.send({
    success: true,
    data: {
      ...opportunity,
      tags: opportunity.tags ?? [],
      hasApplied,
      authorWhatsapp,
    },
  });
}

async function getOptionalUser(
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
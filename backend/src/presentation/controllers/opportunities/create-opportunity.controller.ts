import type { FastifyReply, FastifyRequest } from 'fastify';

import { prisma } from '../../../infrastructure/database/prisma.js';
import { normalizeTags } from '../../../shared/matching/match.js';
import { notifyMatchingWorkers } from '../../../shared/notifications/notify-matching-workers.js';

interface CreateOpportunityBody {
  title: string;
  description: string;
  type: 'JOB' | 'SERVICE';
  location?: string;
  category?: string;
  tags?: string[];
}

export async function createOpportunityController(
  request: FastifyRequest<{ Body: CreateOpportunityBody }>,
  reply: FastifyReply,
) {
  try {
    const payload = await request.jwtVerify<{ sub: string }>();
    const { title, description, type, location, category, tags } = request.body;
    const normalizedTitle = title.trim();
    const normalizedDescription = description.trim();
    const normalizedCategory = category?.trim() || null;

    if (normalizedTitle.length < 3 || normalizedDescription.length < 10) {
      return reply.status(400).send({
        success: false,
        message: 'Título ou descrição inválidos.',
      });
    }

    const author = await prisma.user.findUnique({
      where: { id: payload.sub },
      select: { id: true, role: true },
    });

    if (!author) {
      return reply.status(401).send({
        success: false,
        message: 'Usuário autenticado não encontrado.',
      });
    }

    if (author.role !== 'RECRUITER') {
      return reply.status(403).send({
        success: false,
        message: 'Only recruiters can create opportunities',
      });
    }

    const opportunity = await prisma.opportunity.create({
      data: {
        title: normalizedTitle,
        description: normalizedDescription,
        type,
        location: location?.trim() || null,
        category: normalizedCategory,
        tags: normalizeTags(tags ?? []),
        source: 'LIA',
        authorId: payload.sub,
      },
      include: {
        author: {
          select: { id: true, name: true },
        },
      },
    });

    reply.status(201).send({ success: true, data: opportunity });

    void notifyMatchingWorkers(opportunity).catch((error) => {
      request.log.error(error);
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.name === 'PrismaClientKnownRequestError'
    ) {
      request.log.error(error);
      return reply.status(400).send({
        success: false,
        message:
          'Não foi possível vincular a oportunidade ao usuário autenticado.',
      });
    }

    throw error;
  }
}

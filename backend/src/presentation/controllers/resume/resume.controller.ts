import type { FastifyReply, FastifyRequest } from 'fastify';

import { prisma } from '../../../infrastructure/database/prisma.js';
import { requireUser } from '../../helpers/require-role.js';
import { generateResumePdf } from '../../../application/services/resume/resume-pdf.service.js';

interface ResumeQuery {
  opportunityId?: string;
}

function slugify(value: string): string {
  return (
    value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') || 'curriculo'
  );
}

export async function getResumeController(
  request: FastifyRequest<{ Querystring: ResumeQuery }>,
  reply: FastifyReply,
) {
  const user = await requireUser(request, reply, 'WORKER');
  if (!user) return;

  const profile = await prisma.workerProfile.findUnique({
    where: { userId: user.id },
  });

  let opportunity: { title: string | null; tags: string[] } | null = null;

  if (request.query.opportunityId) {
    opportunity = await prisma.opportunity.findFirst({
      where: {
        id: request.query.opportunityId,
        type: 'JOB',
      },
      select: { title: true, tags: true },
    });

    if (!opportunity) {
      return reply.status(404).send({
        success: false,
        message: 'Oportunidade não encontrada.',
      });
    }
  }

  const resume = await generateResumePdf({
    name: user.name,
    email: user.email,
    professionalTitle: profile?.professionalTitle,
    whatsapp: profile?.whatsapp,
    city: profile?.city,
    neighborhood: profile?.neighborhood,
    bio: profile?.bio,
    skills: profile?.skills ?? [],
    interests: profile?.interests ?? [],
    desiredRoles: profile?.desiredRoles ?? [],
    workPreferences: profile?.workPreferences ?? [],
    availability: profile?.availability,
    opportunity,
  });

  reply.header('Content-Type', 'application/pdf');
  reply.header(
    'Content-Disposition',
    `attachment; filename="curriculo-${slugify(user.name)}.pdf"`,
  );
  reply.header('Content-Length', String(resume.length));

  return reply.send(resume);
}
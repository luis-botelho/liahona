import type { FastifyReply, FastifyRequest } from 'fastify';

import { prisma } from '../../../infrastructure/database/prisma.js';

interface GetCertificateParams {
  code: string;
}

export async function getCertificateController(
  request: FastifyRequest<{ Params: GetCertificateParams }>,
  reply: FastifyReply,
) {
  const { code } = request.params;

  const certificate = await prisma.certificate.findUnique({
    where: { code },
    include: {
      course: {
        select: { id: true, title: true, provider: true, category: true },
      },
      worker: { select: { name: true } },
    },
  });

  if (!certificate) {
    return reply.status(404).send({
      success: false,
      message: 'Certificado não encontrado.',
    });
  }

  return reply.send({ success: true, data: certificate });
}
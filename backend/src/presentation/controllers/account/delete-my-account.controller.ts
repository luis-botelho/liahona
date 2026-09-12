import type { FastifyReply, FastifyRequest } from 'fastify';

import { prisma } from '../../../infrastructure/database/prisma.js';
import { requireAnyUser } from '../../helpers/require-role.js';

export async function deleteMyAccountController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const user = await requireAnyUser(request, reply);
  if (!user) return;

  // Direito ao esquecimento (LGPD): exclui a conta e todos os dados associados.
  // As relações com onDelete: Cascade removem oportunidades publicadas,
  // aplicações, inscrições e certificados.
  await prisma.user.delete({ where: { id: user.id } });

  return reply.send({ success: true });
}
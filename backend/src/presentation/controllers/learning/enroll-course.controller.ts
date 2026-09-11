import type { FastifyReply, FastifyRequest } from 'fastify';

import { prisma } from '../../../infrastructure/database/prisma.js';
import { enrollWorkerInCourse } from '../../../application/services/learning/learning-service.js';
import { requireUser } from '../../helpers/require-role.js';

interface EnrollCourseParams {
  id: string;
}

export async function enrollCourseController(
  request: FastifyRequest<{ Params: EnrollCourseParams }>,
  reply: FastifyReply,
) {
  const worker = await requireUser(request, reply, 'WORKER');
  if (!worker) return;

  const { id } = request.params;

  const course = await prisma.course.findUnique({ where: { id }, select: { id: true } });

  if (!course) {
    return reply.status(404).send({
      success: false,
      message: 'Curso não encontrado.',
    });
  }

  const enrollment = await enrollWorkerInCourse(prisma, id, worker.id);

  return reply.send({ success: true, data: enrollment });
}
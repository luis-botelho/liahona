import type { FastifyReply, FastifyRequest } from 'fastify';

import { prisma } from '../../../infrastructure/database/prisma.js';
import { getOptionalUser } from '../../helpers/get-optional-user.js';

interface GetCourseParams {
  id: string;
}

export async function getCourseController(
  request: FastifyRequest<{ Params: GetCourseParams }>,
  reply: FastifyReply,
) {
  const { id } = request.params;

  const course = await prisma.course.findUnique({
    where: { id },
    include: {
      lessons: { orderBy: { orderIndex: 'asc' } },
    },
  });

  if (!course) {
    return reply.status(404).send({
      success: false,
      message: 'Curso não encontrado.',
    });
  }

  const user = await getOptionalUser(request);

  let enrollment = null;
  let certificate = null;

  if (user?.role === 'WORKER') {
    enrollment = await prisma.courseEnrollment.findUnique({
      where: { courseId_workerId: { courseId: id, workerId: user.id } },
    });

    certificate = await prisma.certificate.findUnique({
      where: { courseId_workerId: { courseId: id, workerId: user.id } },
    });
  }

  return reply.send({ success: true, data: { ...course, enrollment, certificate } });
}
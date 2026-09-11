import type { FastifyReply, FastifyRequest } from 'fastify';

import { prisma } from '../../../infrastructure/database/prisma.js';
import { getOptionalUser } from '../../helpers/get-optional-user.js';

export async function listCoursesController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const user = await getOptionalUser(request);

  const courses = await prisma.course.findMany({
    orderBy: [{ createdAt: 'asc' }, { title: 'asc' }],
    select: {
      id: true,
      title: true,
      description: true,
      category: true,
      skills: true,
      provider: true,
      externalUrl: true,
      source: true,
      createdAt: true,
      _count: { select: { lessons: true } },
    },
  });

  let enrollments: Array<{
    courseId: string;
    status: string;
    completedLessonIds: string[];
    completedAt: Date | null;
  }> = [];

  if (user?.role === 'WORKER') {
    enrollments = await prisma.courseEnrollment.findMany({
      where: { workerId: user.id },
      select: {
        courseId: true,
        status: true,
        completedLessonIds: true,
        completedAt: true,
      },
    });
  }

  const enrollmentByCourse = new Map(
    enrollments.map((enrollment) => [enrollment.courseId, enrollment]),
  );

  const data = courses.map(({ _count, ...course }) => ({
    ...course,
    lessonCount: _count.lessons,
    enrollment: enrollmentByCourse.get(course.id) ?? null,
  }));

  return reply.send({ success: true, data });
}
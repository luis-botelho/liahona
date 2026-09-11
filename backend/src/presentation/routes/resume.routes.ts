import type { FastifyInstance } from 'fastify';

import { getResumeController } from '../controllers/resume/resume.controller.js';

const resumeQuerySchema = {
  querystring: {
    type: 'object',
    additionalProperties: false,
    properties: {
      opportunityId: { type: 'string' },
    },
  },
} as const;

export async function resumeRoutes(app: FastifyInstance) {
  app.get('/resume', { schema: resumeQuerySchema }, getResumeController);
}
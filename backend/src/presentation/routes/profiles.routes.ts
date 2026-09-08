import type { FastifyInstance } from 'fastify';

import { getWorkerProfileController, upsertWorkerProfileController } from '../controllers/profiles/worker-profile.controller.js';
import { getRecruiterProfileController, upsertRecruiterProfileController } from '../controllers/profiles/recruiter-profile.controller.js';

const workerProfileSchema = {
  body: {
    type: 'object',
    additionalProperties: false,
    properties: {
      whatsapp: { type: 'string', maxLength: 20 },
      city: { type: 'string', maxLength: 80 },
      neighborhood: { type: 'string', maxLength: 80 },
      bio: { type: 'string', maxLength: 500 },
      skills: {
        type: 'array',
        maxItems: 20,
        items: { type: 'string', maxLength: 40 },
      },
      interests: {
        type: 'array',
        maxItems: 20,
        items: { type: 'string', maxLength: 40 },
      },
      whatsappOptIn: { type: 'boolean' },
    },
  },
} as const;

const recruiterProfileSchema = {
  body: {
    type: 'object',
    additionalProperties: false,
    properties: {
      organizationName: { type: 'string', maxLength: 120 },
      whatsapp: { type: 'string', maxLength: 20 },
      city: { type: 'string', maxLength: 80 },
      neighborhood: { type: 'string', maxLength: 80 },
      description: { type: 'string', maxLength: 500 },
    },
  },
} as const;

export async function profilesRoutes(app: FastifyInstance) {
  app.get('/profile/worker', getWorkerProfileController);
  app.put(
    '/profile/worker',
    { schema: workerProfileSchema },
    upsertWorkerProfileController,
  );
  app.get('/profile/recruiter', getRecruiterProfileController);
  app.put(
    '/profile/recruiter',
    { schema: recruiterProfileSchema },
    upsertRecruiterProfileController,
  );
}
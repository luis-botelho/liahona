import type { FastifyInstance } from 'fastify';

import { createOpportunityController } from '../controllers/opportunities/create-opportunity.controller.js';
import { listOpportunitiesController } from '../controllers/opportunities/list-opportunities.controller.js';

const createOpportunitySchema = {
  body: {
    type: 'object',
    additionalProperties: false,
    required: ['title', 'description', 'type'],
    properties: {
      title: { type: 'string', minLength: 3, maxLength: 120 },
      description: { type: 'string', minLength: 10, maxLength: 2000 },
      type: { type: 'string', enum: ['JOB', 'SERVICE'] },
      location: { type: 'string', maxLength: 120 },
    },
  },
} as const;

export async function opportunitiesRoutes(app: FastifyInstance) {
  app.get('/opportunities', listOpportunitiesController);
  app.post(
    '/opportunities',
    { schema: createOpportunitySchema },
    createOpportunityController,
  );
}

import Fastify from 'fastify';
import { registerRoutes } from './routes/register.routes.js';

export const app = Fastify({
  logger: true,
});

app.get('/health', async () => ({
  status: 'ok',
}));

app.register(registerRoutes);

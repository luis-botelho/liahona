import Fastify from 'fastify';
import cors from '@fastify/cors';
import { registerRoutes } from './routes/register.routes.js';
import { authRoutes } from './routes/auth.routes.js';
import jwtPlugin from '../infrastructure/http/plugins/jwt.js';

export const app = Fastify({
  logger: true,
});

await app.register(cors, {
  origin: true, // Em desenvolvimento, isso libera para qualquer origem (como o seu localhost:5173)
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Garante que os métodos principais estão liberados
});

app.get('/health', async () => ({
  status: 'ok',
}));

app.register(registerRoutes);
await app.register(authRoutes);
await app.register(jwtPlugin);

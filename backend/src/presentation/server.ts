import Fastify from 'fastify';
import cors from '@fastify/cors';
import { registerRoutes } from './routes/register.routes.js';
import { authRoutes } from './routes/auth.routes.js';
import jwtPlugin from '../infrastructure/http/plugins/jwt.js';
import { opportunitiesRoutes } from './routes/opportunities.routes.js';
import { profilesRoutes } from './routes/profiles.routes.js';
import { applicationsRoutes } from './routes/applications.routes.js';

const corsOrigin = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(',').map((origin) => origin.trim()).filter(Boolean)
  : true;

export const app = Fastify({
  logger: true,
});

// Em desenvolvimento, sem FRONTEND_URL definida, o CORS reflete qualquer origem.
// Em produção, defina FRONTEND_URL com a (ou as, separadas por vírgula) origem permitida.
await app.register(cors, {
  origin: corsOrigin,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Garante que os métodos principais estão liberados
});

app.get('/health', async () => ({
  status: 'ok',
}));

app.register(registerRoutes);
await app.register(authRoutes);
await app.register(jwtPlugin);
await app.register(opportunitiesRoutes);
await app.register(profilesRoutes);
await app.register(applicationsRoutes);

import { app } from './presentation/server.js';

const start = async () => {
  try {
    await app.listen({
      port: 3333,
      host: '0.0.0.0',
    });

    app.log.info('LIA Backend iniciado.');
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

start();

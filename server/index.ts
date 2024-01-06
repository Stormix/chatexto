import { env } from '@/lib/env.mjs';
import { logger } from './logger';
import app from './app';

const main = async () => {
  return app.listen(env.WEBSOCKET_PORT);
};

main().catch((err) => {
  logger.error(err);
  process.exit(1);
});

import { db } from '@/lib/db';
import { env } from '@/lib/env.mjs';
import { Server, Socket } from 'socket.io';
import Chat from './chat';
import { logger } from './logger';

export class App {
  server: Server | null = null;
  debug = env.NODE_ENV === 'development';
  db = db;

  async setup() {
    this.server = new Server({
      cors: {
        origin: [env.NEXTAUTH_URL, 'http://localhost:3000'],
      },
    });

    this.server.on('connection', (socket) => {
      logger.info('Socket connected', socket.id);
      this.registerHandlers(socket);
    });

    this.server.on('disconnect', (socket) => {
      logger.info('Socket disconnected', socket.id);
    });

    this.server.on('error', (err) => {
      logger.error('Socket error', err);
    });
  }

  async registerHandlers(socket: Socket) {
    socket?.on('chat:join', (channel) => {
      logger.info('Joining channel', channel);
      const chat = Chat.getInstance(channel, socket, this.db);
      chat.connect();
    });

    socket?.on('chat:leave', (channel) => {
      logger.info('Leaving channel', channel);
      const chat = Chat.getInstance(channel, socket, this.db);
      chat.disconnect();
    });
  }

  async listen(port: number) {
    await this.setup();

    this.server?.listen(port);
    logger.info('⚡ Starting server on port', port);
  }

  async stop() {
    this.server?.close();
    logger.info('Stopped server');

    Chat.disconnectAll();

    await this.db.$disconnect();
    logger.info('Disconnected from database');
  }
}

const app = new App();

export default app;

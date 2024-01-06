import { io } from 'socket.io-client';
import { env } from './env.mjs';

const URL = env.NEXT_PUBLIC_WEBSOCKET_ENDPOINT ?? 'http://localhost:3001';

export const socket = io(URL, {
  autoConnect: false,
});

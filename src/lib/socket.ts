import { io } from 'socket.io-client';

const URL = 'http://localhost:3001'; // TODO: env.WEBSOCKET_PORT

export const socket = io(URL, {
  autoConnect: false,
});

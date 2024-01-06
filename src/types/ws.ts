import { MakeGuess } from '@/lib/api/games/mutations';
import { ChatMessage } from './chat';

export interface WebsocketPayload<T = unknown> {
  type: string;
  payload: unknown;
}

export type ChatPayload = WebsocketPayload<ChatMessage>;
export type GuessPayload = WebsocketPayload<MakeGuess>;

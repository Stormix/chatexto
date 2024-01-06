import { makeGuess } from '@/lib/api/games/mutations';
import { GetGame, getGame } from '@/lib/api/games/queries';
import { env } from '@/lib/env.mjs';
import { EmoteFetcher, EmoteParser } from '@mkody/twitch-emoticons';
import { PrismaClient } from '@prisma/client';
import { Socket } from 'socket.io';
import * as Tmi from 'tmi.js';

class Chat {
  client: Tmi.Client;
  socket: Socket;
  channel: string;
  parser: EmoteParser | null = null;
  emoteFetcher: EmoteFetcher;
  db: PrismaClient;
  game: Awaited<GetGame> = null;

  static instances: Record<string, Chat> = {};

  static getInstance(channel: string, ws: Socket, db: PrismaClient) {
    if (!this.instances[channel]) {
      this.instances[channel] = new Chat(channel, ws, db);
    }
    return this.instances[channel];
  }

  constructor(channel: string, ws: Socket, db: PrismaClient) {
    this.channel = channel;
    this.socket = ws;
    this.client = new Tmi.Client({
      connection: {
        reconnect: true,
        secure: true,
      },
      channels: [channel],
    });

    this.emoteFetcher = new EmoteFetcher(env.TWITCH_CLIENT_ID, env.TWITCH_CLIENT_SECRET);
    this.db = db;
  }

  async user(channel: string) {
    const user = await this.db.user.findFirst({
      where: {
        name: channel,
      },

      include: {
        accounts: true,
      },
    });

    return user;
  }

  async disconnect() {
    await this.client.disconnect();
  }

  async connect() {
    const user = await this.user(this.channel);
    if (!user) return;
    this.game = await getGame(user?.id);
    await this.client.connect();
    await Promise.all([
      this.emoteFetcher.fetchTwitchEmotes(),
      this.emoteFetcher.fetchSevenTVEmotes(),
      // ...[channelId ? [this.emoteFetcher.fetchTwitchEmotes(channelId)] : []], TODO: investigate later
    ]);

    this.parser = new EmoteParser(this.emoteFetcher, {
      type: 'markdown',
      match: /(\w+)+?/g,
    });

    this.client.on('message', (channel, tags, message, self) => {
      if (self || !tags.username) return;
      makeGuess(this.game, message, tags.username).then(
        (guess) => {
          if (guess) {
            this.socket.emit('game:guess', {
              type: 'guess',
              payload: guess,
            });
          }
          this.socket.emit('chat:message', {
            type: 'message',
            channel: channel,
            payload: {
              message: message, //  this.parser?.parse(message),
              author: {
                name: tags.username,
                color: tags.color,
              },
            },
          });
        },
        (err) => {
          console.error(err);
        },
      );
    });
  }
}

export default Chat;

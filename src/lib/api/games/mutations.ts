import { db } from '@/lib/db/index';
import { logger } from 'server/logger';
import { GetGame } from './queries';

export const makeGuess = async (game: GetGame, message: string, author: string) => {
  try {
    if (!game) throw new Error('Game not found');
    const regex = /^!guess\s(\w+)$/i;
    const match = message.match(regex);
    if (!match) return;
    const guess = match[1];
    const distance = Math.random() * 15000; // TODO: replace this with a real distance
    const score = 1500 - distance; // TODO: replace this with a real score

    const newGuess = await db.guess.create({
      data: {
        guess,
        distance,
        score,
        participant: {
          connectOrCreate: {
            where: {
              name: author,
            },
            create: {
              name: author,
            },
          },
        },
        game: {
          connect: {
            id: game.id,
          },
        },
      },
      include: {
        participant: true,
      },
    });

    return newGuess;
  } catch (err) {
    logger.error('Failed to make guess', { err });
    return null;
  }
};

export type MakeGuess = Awaited<ReturnType<typeof makeGuess>>;

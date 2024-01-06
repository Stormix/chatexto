import { db } from '@/lib/db';
import { startOfDay } from 'date-fns';

export const getGame = async (userId: string) => {
  // const
  const today = new Date();

  let game = await db.game.findFirst({
    where: {
      userId,
      createdAt: {
        gte: startOfDay(today),
      },
    },
    include: {
      participants: true,
      guesses: {
        include: {
          participant: true,
        },
        orderBy: {
          score: 'desc',
        },
      },
    },
  });

  if (!game) {
    // Create a new game
    const word = 'student'; // TODO: Get a random word from a dictionary

    game = await db.game.create({
      data: {
        word,
        userId,
      },
      include: {
        participants: true,
        guesses: {
          include: {
            participant: true,
          },
          orderBy: {
            score: 'desc',
          },
        },
      },
    });
  }

  return game
    ? {
        ...game,
        guesses: game.guesses.slice(0, 10),
      }
    : null;
};

export type GetGame = Awaited<ReturnType<typeof getGame>>;

import { db } from '@/lib/db';
import { startOfDay } from 'date-fns';
import { generate } from 'random-words';

export const getGame = async (userId: string) => {
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
    const [word] = generate(1);

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
            distance: 'asc',
          },
        },
      },
    });
  }

  return game
    ? {
        ...game,
        guesses: game.guesses.sort((a, b) => a.distance - b.distance).slice(0, 20),
        totalGuesses: game.guesses.length,
      }
    : null;
};

export type GetGame = Awaited<ReturnType<typeof getGame>>;

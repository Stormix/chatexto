import { db } from '@/lib/db/index';
import { distanceToScore, similarityToDistance } from '@/lib/game/utils';
import inference from '@/lib/inference';
import { logger } from 'server/logger';
import { GetGame } from './queries';

export const rewardParticipant = async (author: string, score: number) => {
  try {
    const participant = await db.participant.findUnique({
      where: {
        name: author,
      },
    });

    if (!participant) throw new Error('Participant not found');

    const newScore = participant.totalScore + score;

    const updatedParticipant = await db.participant.update({
      where: {
        id: participant.id,
      },
      data: {
        totalScore: newScore,
      },
    });

    return updatedParticipant;
  } catch (err) {
    logger.error('Failed to reward participant', { err });
    return null;
  }
};

export const makeGuess = async (game: GetGame, message: string, author: string) => {
  try {
    if (!game) throw new Error('Game not found');
    const regex = /^!guess\s(\w+)$/i;
    const match = message.match(regex);
    if (!match) return;
    const guess = match[1];

    // Get word similariy from inference service
    const { similarity } = await inference.predict({
      word: game.word,
      guess,
    });

    const distance = similarityToDistance(similarity);
    const score = distanceToScore(distance);

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
              totalScore: score,
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

    await rewardParticipant(author, score);

    return newGuess;
  } catch (err) {
    logger.error('Failed to make guess', { err });
    return null;
  }
};

export type MakeGuess = Awaited<ReturnType<typeof makeGuess>>;

import * as z from 'zod';
import {
  CompleteGuess,
  CompleteParticipant,
  CompleteUser,
  relatedGuessSchema,
  relatedParticipantSchema,
  relatedUserSchema,
} from './index';

export const gameSchema = z.object({
  id: z.string(),
  word: z.string(),
  userId: z.string(),
  duration: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export interface CompleteGame extends z.infer<typeof gameSchema> {
  user: CompleteUser;
  guesses: CompleteGuess[];
  participants: CompleteParticipant[];
}

/**
 * relatedGameSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedGameSchema: z.ZodSchema<CompleteGame> = z.lazy(() =>
  gameSchema.extend({
    user: relatedUserSchema,
    guesses: relatedGuessSchema.array(),
    participants: relatedParticipantSchema.array(),
  }),
);

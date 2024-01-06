import * as z from "zod"
import { CompleteGame, relatedGameSchema, CompleteParticipant, relatedParticipantSchema } from "./index"

export const guessSchema = z.object({
  id: z.string(),
  gameId: z.string(),
  participantId: z.string(),
  guess: z.string(),
  distance: z.number().int(),
  score: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteGuess extends z.infer<typeof guessSchema> {
  game: CompleteGame
  participant: CompleteParticipant
}

/**
 * relatedGuessSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedGuessSchema: z.ZodSchema<CompleteGuess> = z.lazy(() => guessSchema.extend({
  game: relatedGameSchema,
  participant: relatedParticipantSchema,
}))

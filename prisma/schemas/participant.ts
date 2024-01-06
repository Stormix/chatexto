import * as z from "zod"
import { CompleteGuess, relatedGuessSchema, CompleteGame, relatedGameSchema } from "./index"

export const participantSchema = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  totalScore: z.number().int(),
})

export interface CompleteParticipant extends z.infer<typeof participantSchema> {
  guesses: CompleteGuess[]
  games: CompleteGame[]
}

/**
 * relatedParticipantSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedParticipantSchema: z.ZodSchema<CompleteParticipant> = z.lazy(() => participantSchema.extend({
  guesses: relatedGuessSchema.array(),
  games: relatedGameSchema.array(),
}))

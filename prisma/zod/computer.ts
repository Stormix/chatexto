import * as z from "zod"

export const computerSchema = z.object({
  id: z.string(),
  brand: z.string(),
  cores: z.number().int(),
})

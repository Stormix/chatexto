import { computerSchema } from '@/zodAutoGenSchemas';
import { z } from 'zod';

export const insertComputerSchema = computerSchema;
export const insertComputerParams = computerSchema.omit({
  id: true,
});

export const updateComputerSchema = computerSchema.extend({
  id: z.string().cuid(),
});
export const updateComputerParams = updateComputerSchema.extend({
  brand: z.string().min(2),
  cores: z.coerce.number().min(2),
});
export const computerIdSchema = updateComputerSchema.pick({ id: true });

// Types for computers - used to type API request params and within Components
export type Computer = z.infer<typeof updateComputerSchema>;
export type NewComputer = z.infer<typeof computerSchema>;
export type NewComputerParams = z.infer<typeof insertComputerParams>;
export type UpdateComputerParams = z.infer<typeof updateComputerParams>;
export type ComputerId = z.infer<typeof computerIdSchema>['id'];

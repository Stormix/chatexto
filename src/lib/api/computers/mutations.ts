import { db } from '@/lib/db/index';
import {
  ComputerId,
  NewComputerParams,
  UpdateComputerParams,
  updateComputerSchema,
  insertComputerSchema,
  computerIdSchema,
} from '@/lib/db/schema/computers';

export const createComputer = async (computer: NewComputerParams) => {
  const newComputer = insertComputerSchema.parse({
    ...computer,
  });
  try {
    const c = await db.computer.create({ data: newComputer });
    return { computer: c };
  } catch (err) {
    return { error: (err as Error).message ?? 'Error, please try again' };
  }
};

export const updateComputer = async (id: ComputerId, computer: UpdateComputerParams) => {
  const { id: computerId } = computerIdSchema.parse({ id });
  const newComputer = updateComputerSchema.parse({
    ...computer,
  });
  try {
    const c = await db.computer.update({
      where: { id: computerId },
      data: newComputer,
    });
    return { computer: c };
  } catch (err) {
    return { error: (err as Error).message ?? 'Error, please try again' };
  }
};

export const deleteComputer = async (id: ComputerId) => {
  const { id: computerId } = computerIdSchema.parse({ id });
  try {
    const c = await db.computer.delete({ where: { id: computerId } });
    return { computer: c };
  } catch (err) {
    return { error: (err as Error).message ?? 'Error, please try again' };
  }
};

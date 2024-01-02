import { publicProcedure, router } from '@/lib/server/trpc';
import { getComputers } from '@/lib/api/computers/queries';
export const computersRouter = router({
  getComputers: publicProcedure.query(async () => {
    return getComputers();
  }),
});

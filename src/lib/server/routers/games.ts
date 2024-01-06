import { getGame } from '@/lib/api/games/queries';
import { protectedProcedure, router } from '@/lib/server/trpc';

export const gamesRouter = router({
  game: protectedProcedure.query(async ({ ctx }) => {
    const { session } = ctx;
    return getGame(session.user.id!);
  }),
});

import { router } from '@/lib/server/trpc';
import { gamesRouter } from './games';

export const appRouter = router({
  game: gamesRouter,
});

export type AppRouter = typeof appRouter;

import { env } from '../env.mjs';

export function getUrl() {
  return env.NEXT_PUBLIC_NEXTAUTH_URL + '/api/trpc';
}

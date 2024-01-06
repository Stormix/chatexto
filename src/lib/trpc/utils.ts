import { env } from '../env.mjs';

export function getUrl() {
  return env.NEXTAUTH_URL + '/api/trpc';
}

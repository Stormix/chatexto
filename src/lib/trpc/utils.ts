export function getBaseHost() {
  if (typeof window !== 'undefined') return '';
  if (process.env.VERCEL_URL) return `${process.env.VERCEL_URL}`;
  return 'localhost:3000';
}

export function getBaseUrl() {
  if (typeof window !== 'undefined') return '';
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'http://localhost:3000';
}

export function getUrl() {
  return getBaseUrl() + '/api/trpc';
}

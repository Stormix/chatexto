import SignIn from '@/components/auth/SignIn';
import { getUserAuth } from '@/lib/auth/utils';

export default async function Home() {
  const { session } = await getUserAuth();
  return (
    <main className="space-y-4">
      {session ? (
        <pre className="bg-card p-4 rounded-sm overflow-hidden">{JSON.stringify(session, null, 2)}</pre>
      ) : null}
      <SignIn />
    </main>
  );
}

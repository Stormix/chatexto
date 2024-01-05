import Logo from '@/components/atoms/logo';
import TwitchButton from '@/components/atoms/twitch-button';
import { getUserAuth } from '@/lib/auth/utils';

const Home = async () => {
  const { session } = await getUserAuth();

  // if (session) redirect('/game');

  return (
    <div className="flex items-center w-full h-full">
      <div className="flex flex-col items-center justify-center gap-8 m-auto w-fit">
        <Logo />
        <div className="space-y-8">
          <TwitchButton className="w-full" />
          <p className="text-sm text-center text-white/50 w-96">
            By signing in, you agree to our{' '}
            <a href="#" target="_blank">
              Terms and conditions
            </a>{' '}
            and{' '}
            <a href="#" target="_blank">
              privacy policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;

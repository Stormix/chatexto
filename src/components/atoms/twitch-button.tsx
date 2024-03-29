'use client';

import { env } from '@/lib/env.mjs';
import { cn } from '@/lib/utils';
import { signIn } from 'next-auth/react';
import { PiTwitchLogoFill } from 'react-icons/pi';
import { Button } from './button';

const TwitchButton = ({ className }: { className?: string }) => {
  return (
    <Button
      className={cn(className)}
      onClick={() => signIn('twitch', { callbackUrl: `${env.NEXT_PUBLIC_NEXTAUTH_URL}/game` })}
      variant={'twitch'}
      icon={<PiTwitchLogoFill className="w-5 h-5" />}
      size={'lg'}
    >
      <span className="uppercase">Login with twitch</span>
    </Button>
  );
};

export default TwitchButton;

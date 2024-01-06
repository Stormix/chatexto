'use client';

import { AuthSession } from '@/lib/auth/utils';
import { LuSettings } from 'react-icons/lu';

interface NavbarProps {
  session: AuthSession['session'];
}

const Navbar = ({ session }: NavbarProps) => {
  return (
    <div className="flex items-center justify-between px-6 py-3 border-2 rounded-lg">
      <p className="text-base uppercase">
        Connected as <span className="text-chatexto">{session?.user.name}</span>
      </p>

      <LuSettings className="w-6 h-6" />
    </div>
  );
};

export default Navbar;

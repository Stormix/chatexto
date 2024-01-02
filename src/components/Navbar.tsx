import { getUserAuth } from '@/lib/auth/utils';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/atoms/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/atoms/avatar';

import { ModeToggle } from '@/components/atoms/ThemeToggle';

export default async function Navbar() {
  const { session } = await getUserAuth();
  const nameExists = !!session?.user.name && session?.user.name.length > 2;

  if (session?.user) {
    return (
      <div className="bg-popover border-b mb-2 md:p-0 px-4">
        <nav className="py-2 flex items-center justify-between transition-all duration-300 max-w-3xl mx-auto">
          <h1 className="font-semibold hover:opacity-75 transition-hover cursor-pointer">
            <Link href="/">Logo</Link>
          </h1>
          <div className="space-x-2 flex items-center">
            <ModeToggle />
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarFallback>
                      {nameExists
                        ? session.user.name
                            ?.split(' ')
                            .map((word) => word[0].toUpperCase())
                            .join('')
                        : '~'}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <span className="font-semibold">{nameExists ? session.user.name : 'New User'}</span>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link href="/account">
                    <DropdownMenuItem className="cursor-pointer">Account</DropdownMenuItem>
                  </Link>
                  <Link href="/api/auth/signout">
                    <DropdownMenuItem className="cursor-pointer">Sign out</DropdownMenuItem>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/sign-in">Sign in</Link>
            )}
          </div>
        </nav>
      </div>
    );
  } else return null;
}

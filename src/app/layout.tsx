import { Toaster } from '@/components/atoms/toaster';
import Footer from '@/components/molecules/footer';
import NextAuthProvider from '@/lib/auth/provider';
import TrpcProvider from '@/lib/trpc/provider';
import type { Metadata } from 'next';
import { Inter, Press_Start_2P } from 'next/font/google';
import { cookies } from 'next/headers';

import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/providers/theme-provider';
import './globals.css';

const pressStart2p = Press_Start_2P({
  subsets: ['latin'],
  weight: '400',
});

const inter = Inter({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Chatexto',
  description: 'Contexto for twitch chat',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={cn(pressStart2p.className, inter.variable)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <NextAuthProvider>
            <TrpcProvider cookies={cookies().toString()}>
              <main className="flex flex-col w-screen h-screen px-4 md:p-0">
                {children} <Footer />
                <Toaster />
              </main>
            </TrpcProvider>
          </NextAuthProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

import { GetGame } from '@/lib/api/games/queries';
import { AuthSession } from '@/lib/auth/utils';
import { socket } from '@/lib/socket';
import { trpc } from '@/lib/trpc/client';
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Socket } from 'socket.io-client';

type GameProviderProps = {
  children: React.ReactNode;
  session: AuthSession['session'];
};

type GameProviderState = {
  game: Awaited<GetGame> | undefined;
  socket?: Socket;
  connected?: React.MutableRefObject<boolean>;
  started: boolean;
  start: () => void;
  stop: () => void;
};

const initialState: GameProviderState = {
  game: undefined,
  socket: undefined,
  connected: undefined,
  started: false,
  start: () => {},
  stop: () => {},
};

const GameProviderContext = createContext<GameProviderState>(initialState);

export const GameProvider = ({ children, session }: GameProviderProps) => {
  const connected = useRef(false);
  const [started, setStarted] = useState(false);
  const { data } = trpc.game.game.useQuery(undefined, {
    refetchInterval: 2_000, // TODO: use subscription
  });

  useEffect(() => {
    if (!session?.user || connected.current) return;

    socket.on('connect', () => {
      console.log('Connected to ws!');
      connected.current = true;
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from ws!');
      connected.current = false;
    });

    socket.connect();
  }, [session]);

  const value = {
    game: data ?? undefined,
    socket,
    connected,
    started,
    start: () => {
      if (!session?.user || started) return;
      socket.emit('chat:join', session?.user.name);
      setStarted(true);
    },
    stop: () => {
      if (!session?.user || !started) return;
      setStarted(false);
      socket.emit('chat:leave', session?.user.name);
    },
  };

  return <GameProviderContext.Provider value={value}>{children}</GameProviderContext.Provider>;
};

export const useGame = () => {
  const context = useContext(GameProviderContext);
  if (context === undefined) throw new Error('useGame must be used within a GameProvider');
  return context;
};

'use client';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/atoms/resizable';
import { AuthSession } from '@/lib/auth/utils';
import { GameProvider } from '@/providers/game-provider';
import Contexto from './contexto';
import GameInfo from './game-info';
import Navbar from './navbar';
import LeftSidebar from './sidebars/left';
import RightSidebar from './sidebars/right';

interface GameProps {
  session: AuthSession['session'];
}

const Game = ({ session }: GameProps) => {
  return (
    <GameProvider session={session}>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={20}>
          <LeftSidebar />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={60} className="flex flex-col h-full gap-4 py-4">
          <Navbar session={session} />
          <Contexto className="flex-grow" />
          <GameInfo />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={20}>
          <RightSidebar />
        </ResizablePanel>
      </ResizablePanelGroup>
    </GameProvider>
  );
};

export default Game;

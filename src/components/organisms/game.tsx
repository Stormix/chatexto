'use client';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/atoms/resizable';
import LeftSidebar from './sidebards/left';
import RightSidebar from './sidebards/right';

const Game = () => {
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={20}>
        <LeftSidebar />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={60}>Two</ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={20}>
        <RightSidebar />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default Game;

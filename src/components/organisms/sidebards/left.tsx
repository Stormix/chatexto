import CameraPlaceholder from '@/components/atoms/camera';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/atoms/resizable';
import { BsChatLeftFill } from 'react-icons/bs';

import { cn } from '@/lib/utils';
import { PiTwitchLogoFill } from 'react-icons/pi';
import Leaderboard from '../leaderboard';

interface LeftSidebarProps {
  className?: string;
}

const dummyPlayers = [
  {
    name: 'Stormix',
    score: 100,
  },
  {
    name: 'Maadlou',
    score: 80,
  },
  {
    name: 'EKB9816',
    score: 70,
  },
  {
    name: 'Ratchaw',
    score: 0,
  },
  {
    name: 'Ratchaw',
    score: 0,
  },
  {
    name: 'Ratchaw',
    score: 0,
  },
  {
    name: 'Ratchaw',
    score: 0,
  },
  {
    name: 'Ratchaw',
    score: 0,
  },
  {
    name: 'Ratchaw',
    score: 0,
  },
  {
    name: 'Ratchaw',
    score: 0,
  },
  {
    name: 'Ratchaw',
    score: 0,
  },
  {
    name: 'Ratchaw',
    score: 0,
  },
  {
    name: 'Ratchaw',
    score: 0,
  },
];

const LeftSidebar = ({ className }: LeftSidebarProps) => {
  return (
    <div className={cn(className, 'flex flex-col gap-4 p-4 w-full h-full')}>
      <ResizablePanelGroup direction="vertical">
        <ResizablePanel defaultSize={25} className="mb-4">
          <CameraPlaceholder />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={75} className="flex flex-col flex-1">
          <Leaderboard
            title={
              <>
                <PiTwitchLogoFill className="w-6 h-6" />
                Streamers Leaderboard
              </>
            }
            players={dummyPlayers.slice(0, 4)}
          />
          <Leaderboard
            className="flex-1"
            title={
              <>
                <BsChatLeftFill className="w-6 h-6" />
                Chat Leaderboard
              </>
            }
            players={dummyPlayers}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default LeftSidebar;

import { cn } from '@/lib/utils';
import Chat from '../chat';
import GameControls from '../game-controls';

interface RightSidebarProps {
  className?: string;
}

const RightSidebar = ({ className }: RightSidebarProps) => {
  return (
    <div className={cn('flex flex-col gap-4 p-4 h-full', className)}>
      <GameControls />
      <Chat className="flex-1" />
    </div>
  );
};

export default RightSidebar;

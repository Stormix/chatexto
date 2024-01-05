import { useState } from 'react';
import { IoPlayOutline } from 'react-icons/io5';
import { LuPause } from 'react-icons/lu';
import { Button } from '../atoms/button';

const GameControls = () => {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-4">
      <div className="flex flex-col items-center justify-center gap-1">
        <p className="text-xs text-white/75">Time Elapsed</p>
        <h2 className="text-xl text-chatexto-orange">00:13:50</h2>
      </div>
      <Button
        className="w-full"
        onClick={() => setPlaying(!playing)}
        icon={!playing ? <IoPlayOutline className="w-4 h-4" /> : <LuPause className="w-4 h-4" />}
      >
        Start Game
      </Button>
    </div>
  );
};

export default GameControls;

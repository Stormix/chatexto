import { cn } from '@/lib/utils';
import { Player } from '@/types/player';
import { ReactNode } from 'react';
import { PiTrophyFill } from 'react-icons/pi';
import Section from './section';

interface Leaderboard {
  title: ReactNode;
  players: Player[];
  className?: string;
}

interface LeaderboardItem {
  player: Player;
  rank: number;
}

const LeaderboardItem = ({ player, rank }: LeaderboardItem) => {
  return (
    <div
      className={cn('flex rounded-md items-center justify-center p-[2px]', {
        'bg-chatexto-gradient': rank === 0,
      })}
    >
      <div
        className={cn('px-5 flex gap-3 py-3 bg-leaderboard border-2 border-transparent rounded-md w-full h-full', {
          'text-white': rank === 0,
          'text-white/75': rank === 1,
          'text-white/60': rank === 2,
          'text-white/50': rank > 2,
          'border-leaderboard-border': rank > 0,
        })}
      >
        {rank < 3 ? <PiTrophyFill className="w-6 h-6" /> : <span className="w-0 h-6 -ml-2" />}
        <div className="flex items-center justify-between flex-grow text-base">
          <p>{player.name}</p>
          <p>{player.score}</p>
        </div>
      </div>
    </div>
  );
};

const Leaderboard = ({ title, players, className }: Leaderboard) => {
  return (
    <Section title={title} className={className}>
      <div className="flex flex-col w-full gap-2 p-4 overflow-auto">
        {players
          .sort((a, b) => b.score - a.score)
          .map((player, index) => (
            <LeaderboardItem key={player.name} player={player} rank={index} />
          ))}
      </div>
    </Section>
  );
};

export default Leaderboard;

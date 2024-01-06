import { GetGame } from '@/lib/api/games/queries';
import { THRESHOLDS } from '@/lib/config';
import { cn } from '@/lib/utils';
import { useMemo } from 'react';

interface GuessProps {
  guess: Exclude<Awaited<GetGame>, null | undefined>['guesses'][number];
}

export const Guess = ({ guess }: GuessProps) => {
  const width = useMemo(() => {
    if (guess.distance === 0) {
      return '100%';
    }
    if (guess.distance <= THRESHOLDS[1]) {
      return `${100 - (guess.distance / THRESHOLDS[1]) * 100}%`;
    }
    if (guess.distance > THRESHOLDS[1]) {
      return '1%';
    }
  }, [guess.distance]);

  return (
    <div
      className={cn('relative rounded-md items-center  border-2 w-full', {
        'border-chatexto': guess.distance <= THRESHOLDS[0],
        'border-chatexto-yellow': guess.distance > THRESHOLDS[0] && guess.distance <= THRESHOLDS[1],
        'border-chatexto-orange': guess.distance > THRESHOLDS[1],
      })}
    >
      <div
        className={cn('h-full absolute top-0 left-0 z-0', {
          'bg-chatexto': guess.distance <= THRESHOLDS[0],
          'bg-chatexto-yellow': guess.distance > THRESHOLDS[0] && guess.distance <= THRESHOLDS[1],
          'bg-chatexto-orange': guess.distance > THRESHOLDS[1],
        })}
        style={{
          width,
        }}
      />
      <div className="relative z-10 grid w-full h-full grid-cols-3 p-4">
        <span className="uppercase">{guess.participant.name}</span>
        <span>{guess.guess}</span>
        <span className="text-end">{guess.distance}</span>
      </div>
    </div>
  );
};

export default Guess;

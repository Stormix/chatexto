import { cn } from '@/lib/utils';
import { useGame } from '@/providers/game-provider';
import Guess from './guess';

interface ContextoProps {
  className?: string;
}

const Contexto = ({ className }: ContextoProps) => {
  const { game } = useGame();

  return (
    <div className={cn('border-2 rounded-lg flex justify-center items-center', className)}>
      <div className="flex flex-col w-6/12 gap-4">
        {game?.guesses.map((guess, index) => <Guess key={index} guess={guess} />)}
      </div>
    </div>
  );
};

export default Contexto;

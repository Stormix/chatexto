import { MakeGuess } from '@/lib/api/games/mutations';
import { socket } from '@/lib/socket';
import { useGame } from '@/providers/game-provider';
import { GuessPayload } from '@/types/ws';
import { useEffect, useMemo, useState } from 'react';
import { PiFireSimpleFill, PiFlagFill } from 'react-icons/pi';
import Alert from '../atoms/alert';
import GuessAlert from './guess-alert';

const GameInfo = () => {
  const [guesses, setGuesses] = useState<Exclude<MakeGuess, null | undefined>[]>([]);
  const { game } = useGame();

  const topScore = useMemo(() => {
    return game?.guesses?.reduce((acc, guess) => {
      if (guess.score > acc) return guess.score;
      return acc;
    }, 0);
  }, [game?.guesses]);

  useEffect(() => {
    socket.on('game:guess', (message: GuessPayload) => {
      setGuesses((prev) => {
        if (message.payload === null) return prev;
        return [...prev, message.payload].slice(-3) as Exclude<MakeGuess, null | undefined>[];
      });
    });
  }, []);

  return (
    <div className="flex justify-between py-6 border-t-2">
      <div className="flex flex-col w-1/2 gap-4">
        {guesses.map((guess) => (
          <GuessAlert key={guess.id} guess={guess} />
        ))}
      </div>
      <div className="flex flex-col items-end justify-center w-1/2 gap-4">
        <Alert className="text-chatexto-yellow">
          <PiFireSimpleFill className="w-6 h-6" />
          <span className="uppercase">Top Score : {topScore}</span>
        </Alert>
        <Alert>
          <PiFlagFill className="w-6 h-6" />
          <span className="uppercase">Total guesses : {game?.guesses?.length ?? 0}</span>
        </Alert>
      </div>
    </div>
  );
};

export default GameInfo;

import { MakeGuess } from '@/lib/api/games/mutations';
import { PiSword } from 'react-icons/pi';
import Alert from '../atoms/alert';

interface GuessAlertProps {
  guess: Exclude<MakeGuess, null | undefined>;
}

const GuessAlert = ({ guess }: GuessAlertProps) => {
  return (
    <Alert>
      <PiSword className="w-6 h-6" />
      <span className="uppercase">
        {guess.participant.name} guessed &quot;{guess.guess}&quot;
      </span>
    </Alert>
  );
};

export default GuessAlert;

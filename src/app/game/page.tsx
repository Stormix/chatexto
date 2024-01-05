import Game from '@/components/organisms/game';
import { checkAuth, getUserAuth } from '@/lib/auth/utils';

const GamePage = async () => {
  await checkAuth();
  const { session } = await getUserAuth();

  return <Game />;
};

export default GamePage;

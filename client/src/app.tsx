import { useMemo, useState } from 'preact/hooks';
import { fetchNextGameState } from '@/api/post/next-game-state';
import { sleep } from './utils/sleep';
import { GameStateEnum } from './shared/enums';
import { GameBoard } from './components/game-board';
import { cn } from './utils/cn';

type GameState = {
  board: string;
  state: GameStateEnum;
};

const defaultGameState: GameState = {
  board: '_________',
  state: GameStateEnum.InProgress,
};

export function App() {
  const [isLoading, setIsLoading] = useState(false);

  const [gameState, setGameState] = useState(defaultGameState);

  const handlePlayerMove = async (index: number) => {
    const nextState = gameState.board.split('');

    nextState[index] = 'x';

    setGameState((prev) => ({ ...prev, board: nextState.join('') }));

    setIsLoading(true);

    try {
      const response = await fetchNextGameState(nextState.join(''));

      if (!response) return;

      await sleep(1000);

      setGameState(response.data);
    } finally {
      setIsLoading(false);
    }
  };

  const resetGame = () => {
    setGameState(defaultGameState);
  };

  const title = useMemo(() => {
    if (gameState.state === GameStateEnum.OWon) return 'Oh no!';

    if (gameState.state === GameStateEnum.XWon) return 'Hell yeah!';

    if (gameState.state === GameStateEnum.NoWinner) return 'Good luck next time!';

    return 'You can do it!';
  }, [gameState.state]);

  const isGameOver = gameState.state !== GameStateEnum.InProgress;

  return (
    <section className="flex size-full flex-col items-center justify-center gap-20 px-4">
      <h1 className="text-2xl font-semibold">{title}</h1>

      <div className="w-full max-w-md">
        <GameBoard gameState={gameState} loading={isLoading} onCellClick={handlePlayerMove} />
      </div>

      <button
        className={cn(
          'w-full bg-black px-6 py-3 text-base text-white transition-all sm:w-36',
          isGameOver ? 'opacity-100' : 'opacity-0',
        )}
        disabled={!isGameOver}
        onClick={resetGame}
      >
        Restart
      </button>
    </section>
  );
}

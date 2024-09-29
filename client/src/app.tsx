import { useState } from 'preact/hooks';
import { fetchNextGameState } from '@/api/post/next-game-state';
import { sleep } from './utils/sleep';
import { GameCellsEnum, GameStateEnum } from './shared/enums';

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

  const handlePlayerMove = (index: number) => async () => {
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

  return (
    <section className="flex h-full flex-col items-center justify-center">
      <ul className="mx-auto grid w-full max-w-md grid-cols-3">
        {gameState.board.split('').map((cell, index) => {
          const content = (() => {
            if (cell === GameCellsEnum.X) return <span className="text-2xl">X</span>;

            if (cell === GameCellsEnum.O) return <span className="text-2xl">0</span>;

            return (
              <button
                className="size-full outline-4 outline-offset-1 outline-blue-600 focus:z-10 focus:outline"
                disabled={isLoading || gameState.state !== GameStateEnum.InProgress}
                onClick={handlePlayerMove(index)}
              />
            );
          })();

          return (
            <li className="flex aspect-square w-full items-center justify-center border border-gray-300" key={index}>
              {content}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

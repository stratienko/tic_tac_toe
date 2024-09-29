import { GameCell } from '@/elements/game-cell';
import { GameStateEnum } from '@/shared/enums';

type GameState = {
  board: string;
  state: GameStateEnum;
};

type Props = {
  gameState: GameState;
  loading?: boolean;

  onCellClick: (index: number) => VoidLike;
};

export const GameBoard = (props: Props) => {
  const { gameState, onCellClick, loading } = props;

  const handleCellClick = (index: number) => () => {
    onCellClick(index);
  };

  return (
    <ul className="grid size-full grid-cols-3">
      {gameState.board.split('').map((cell, index) => {
        return (
          <li className="flex aspect-square w-full items-center justify-center" key={index}>
            <GameCell disabled={loading} index={index} value={cell} onClick={handleCellClick(index)} />
          </li>
        );
      })}
    </ul>
  );
};

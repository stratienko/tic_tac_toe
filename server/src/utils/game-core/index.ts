import { type GameBoard, gameBoardSchema } from '@/schemas/game';
import { WINNING_COMBINATIONS } from '@/shared/constants';
import { GameCellsEnum, GameStateEnum } from '@/shared/enums';
import { pickRandomFrom } from '../common/pick-random-from';

export const parseGameState = (board: GameBoard): GameStateEnum => {
  const parsedState = gameBoardSchema.parse(board.toLowerCase());

  const symbols = ['x', '0'];

  let state = GameStateEnum.InProgress;

  for (const combination of WINNING_COMBINATIONS) {
    const [a, b, c] = combination;

    const symbolAtA = parsedState.at(a);

    if (!symbolAtA) continue;

    if (!symbols.includes(symbolAtA)) continue;

    if (symbolAtA === parsedState.at(b) && symbolAtA === parsedState.at(c)) {
      state = symbolAtA === 'x' ? GameStateEnum.XWon : GameStateEnum.OWon;

      break;
    }
  }

  if (state == GameStateEnum.InProgress && !parsedState.includes(GameCellsEnum.Empty)) {
    return GameStateEnum.NoWinner;
  }

  return state;
};

export const getNextBoard = (board: GameBoard): GameBoard => {
  const nextBoard = board.split('');

  const emptyCells: Array<number> = [];

  for (let i = 0; i < nextBoard.length; i++) {
    if (nextBoard[i] !== GameCellsEnum.Empty) continue;

    emptyCells.push(i);
  }

  if (emptyCells.length === 0) return board;

  const randomCellIndex = pickRandomFrom(emptyCells);

  nextBoard[randomCellIndex] = GameCellsEnum.O;

  return nextBoard.join('');
};

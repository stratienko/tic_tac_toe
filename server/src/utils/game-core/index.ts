import { type GameBoard, gameBoardSchema } from '@/schemas/game';
import { WINNING_COMBINATIONS } from '@/shared/constants';
import { GameCellsEnum, GameStateEnum } from '@/shared/enums';

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

const makeTurn = (board: GameBoard, cellIndex: number, symbol: GameCellsEnum): GameBoard => {
  const nextBoard = board.split('');

  nextBoard[cellIndex] = symbol;

  return nextBoard.join('');
};

const getEmptyCells = (board: GameBoard): Array<number> => {
  const emptyCells: Array<number> = [];

  for (let i = 0; i < board.length; i++) {
    if (board[i] === GameCellsEnum.Empty) {
      emptyCells.push(i);
    }
  }

  return emptyCells;
};

const valueByGameStateLookup = {
  [GameStateEnum.XWon]: -1,
  [GameStateEnum.OWon]: 1,
  [GameStateEnum.NoWinner]: 0,
};

const minimax = (board: GameBoard, isMaximizing: boolean, cache: Record<string, number> = {}): number => {
  if (cache[board]) return cache[board];

  const gameState = parseGameState(board);

  if (gameState !== GameStateEnum.InProgress) return valueByGameStateLookup[gameState];

  const emptyCells = getEmptyCells(board);

  return emptyCells.reduce(
    (acc, cell) => {
      const nextBoard = makeTurn(board, cell, isMaximizing ? GameCellsEnum.O : GameCellsEnum.X);

      const score = minimax(nextBoard, !isMaximizing, cache);

      cache[nextBoard] = score;

      return isMaximizing ? Math.max(acc, score) : Math.min(acc, score);
    },
    isMaximizing ? -Infinity : Infinity,
  );
};

// We use this cache to reduce the number of calculations since a lot of them are already computed
// This cache will live for the duration of the server process and will be shared between all requests
// It will contain all of the possible game states for a 3x3 board probably in a couple of games
const cellScoresLookup = {};

export const getNextBoard = (board: GameBoard): GameBoard => {
  const emptyCells = getEmptyCells(board);

  if (emptyCells.length === 0) return board;

  const bestOption = emptyCells.reduce(
    (acc, cell) => {
      const score = minimax(makeTurn(board, cell, GameCellsEnum.O), false, cellScoresLookup);

      if (acc.score > score) return acc;

      return { cell, score };
    },
    { cell: -1, score: -Infinity },
  );

  const { cell } = bestOption;

  return makeTurn(board, cell, GameCellsEnum.O);
};

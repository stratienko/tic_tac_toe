import { nextGameStateInputSchema, nextGameStateOutputSchema } from '@/schemas/next-game-state';
import { GameStateEnum } from '@/shared/enums';
import { getNextBoard, getGameState } from '@/utils/game-core';
import { defaultEndpointsFactory } from 'express-zod-api';

export const nextGameState = defaultEndpointsFactory.build({
  method: 'post',
  input: nextGameStateInputSchema,
  output: nextGameStateOutputSchema,
  handler: async ({ input: { board } }) => {
    const currentGameState = getGameState(board);

    if (currentGameState !== GameStateEnum.InProgress) {
      return { board, state: currentGameState };
    }

    const nextBoard = getNextBoard(board);

    return { board: nextBoard, state: getGameState(nextBoard) };
  },
});

import { nextGameStateInputSchema, nextGameStateOutputSchema } from '@/schemas/next-game-state';
import { GameStateEnum } from '@/shared/enums';
import { getNextBoard, parseGameState } from '@/utils/game-core';
import { defaultEndpointsFactory } from 'express-zod-api';

export const nextGameState = defaultEndpointsFactory.build({
  method: 'post',
  input: nextGameStateInputSchema,
  output: nextGameStateOutputSchema,
  handler: async ({ input: { board }, logger }) => {
    logger.debug('Current state:', { board });

    const currentGameState = parseGameState(board);

    if (currentGameState !== GameStateEnum.InProgress) {
      return { board, state: currentGameState };
    }

    const nextBoard = getNextBoard(board);

    return { board: nextBoard, state: parseGameState(nextBoard) };
  },
});

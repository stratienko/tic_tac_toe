import { apiClient } from '@/api/client';
import { buildResponseSchema } from '@/schemas/api-response';
import { GameStateEnum } from '@/shared/enums';
import { z } from 'zod';

const responseSchema = buildResponseSchema(
  z.object({
    board: z.string().length(9, 'Game state must be 9 characters long'),
    state: z.nativeEnum(GameStateEnum),
  }),
);

type NextGameStateResponse = z.infer<typeof responseSchema>;

/**
 * This function sends the current game state to the server and returnes the next game state.
 * @param {string}board - The current game state. A string of 9 characters including 'x', '0', or '_'.
 * @returns {Promise<NextGameStateResponse>} The next game state.
 */
export const fetchNextGameState = async (board: string): Promise<NextGameStateResponse> => {
  try {
    const response = await apiClient.post('/v1/next-game-state', JSON.stringify({ board }));

    const parsedResult = responseSchema.parse(response.data);

    return parsedResult;
  } catch (error) {
    // TODO: Add error handling
    console.error({ error });

    throw error;
  }
};

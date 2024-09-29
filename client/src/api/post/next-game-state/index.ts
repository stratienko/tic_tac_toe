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

export const fetchNextGameState = async (board: string) => {
  try {
    const response = await apiClient.post('/v1/next-game-state', JSON.stringify({ board }));

    const parsedResult = responseSchema.parse(response.data);

    return parsedResult;
  } catch (error) {
    console.log({ error });
  }
};

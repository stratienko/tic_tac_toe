import z from 'zod';
import { gameBoardSchema, gameStateSchema } from '@/schemas/game';

export const nextGameStateInputSchema = z.object({
  board: gameBoardSchema,
});

export const nextGameStateOutputSchema = gameStateSchema;

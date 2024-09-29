import { GameCellsEnum, GameStateEnum } from '@/shared/enums';
import z from 'zod';

export const gameBoardSchema = z
  .string()
  .length(9)
  .refine((value) => {
    const allowedChars: string[] = [GameCellsEnum.Empty, GameCellsEnum.O, GameCellsEnum.X];

    for (const char of value.toLowerCase()) {
      if (!allowedChars.includes(char)) return false;
    }

    return true;
  }, 'Game state includes invalid characters');

export type GameBoard = z.infer<typeof gameBoardSchema>;

export const gameStateSchema = z.object({
  board: gameBoardSchema,
  state: z.nativeEnum(GameStateEnum),
});

export type GameState = z.infer<typeof gameStateSchema>;

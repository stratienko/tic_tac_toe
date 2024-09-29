import type { Routing } from 'express-zod-api';
import { nextGameState } from '@/endpoints/v1/post/next-game-state';

export const v1: Routing[string] = {
  ['next-game-state']: nextGameState,
};

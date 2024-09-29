import { z } from 'zod';

export const environmentSchema = z.object({
  BASE_URL: z.string().readonly(),
  DEV: z.boolean().readonly(),
  MODE: z.string().readonly(),
  PROD: z.boolean().readonly(),
  SSR: z.boolean().readonly(),
  VITE_API_URL: z.string().readonly(),
});

export type Environment = z.infer<typeof environmentSchema>;

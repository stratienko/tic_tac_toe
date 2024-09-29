import { environmentSchema } from '@/schemas/env';

/**
 * A function that reads the environment variables and validates them against the environment schema
 * @param env - The environment variables
 * @returns The validated environment variables or throws an error if the environment variables are missing or invalid
 */
export const readEnvironment = (env: Maybe<Record<string, unknown>>) => {
  if (!env) throw new Error('Environment variables are missing');

  return environmentSchema.parse(env);
};

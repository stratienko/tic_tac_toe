import { AnyZodObject, z } from 'zod';

export const buildResponseSchema = <T extends AnyZodObject>(data: T) =>
  z.object({
    data,
    status: z.string().min(1),
  });

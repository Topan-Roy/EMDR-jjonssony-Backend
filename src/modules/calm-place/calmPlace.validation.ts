import { z } from 'zod';

export const saveCalmPlaceSchema = z.object({
  body: z.object({
    image: z.string().optional(),
    soundLink: z.string().optional(),
    describe: z.string().min(1, 'Description is required'),
  }),
});

export const idParamSchema = z.object({
  params: z.object({ id: z.string().regex(/^[a-f\d]{24}$/i, 'Invalid ID') }),
});

import { z } from 'zod';

export const saveCalmPlaceSchema = z.object({
  body: z.object({
    image: z.string().optional(),
    soundLink: z.string().optional(),
    describe: z.string().min(1, 'Description is required'),
  }),
});

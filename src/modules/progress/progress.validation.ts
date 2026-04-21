import { z } from 'zod';

const objectId = z.string().regex(/^[a-f\d]{24}$/i, 'Invalid ID');

export const updateProgressSchema = z.object({
  params: z.object({ mediaId: objectId }),
  body: z.object({
    watchedSeconds: z.number({ required_error: 'watchedSeconds is required' }).min(0),
    totalSeconds:   z.number({ required_error: 'totalSeconds is required' }).min(1),
  }),
});

export const categoryIdSchema = z.object({
  params: z.object({ categoryId: objectId }),
});

export const journeyIdSchema = z.object({
  params: z.object({ journeyId: objectId }),
});

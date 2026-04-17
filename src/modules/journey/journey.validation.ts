import { z } from 'zod';

const objectId = z.string().regex(/^[a-f\d]{24}$/i, 'Invalid ID');

export const createJourneySchema = z.object({
  body: z.object({
    journeyName: z.string({ required_error: 'Journey name is required' }).min(2).max(150).trim(),
    description: z.string().max(1000).trim().optional(),
    imageUrl:    z.string().url('Invalid image URL').optional(),
  }),
});

export const updateJourneySchema = z.object({
  params: z.object({ id: objectId }),
  body: z.object({
    journeyName: z.string().min(2).max(150).trim().optional(),
    description: z.string().max(1000).trim().optional(),
    imageUrl:    z.string().url('Invalid image URL').optional(),
    isActive:    z.coerce.boolean().optional(),
  }),
});

export const idParamSchema = z.object({
  params: z.object({ id: objectId }),
});

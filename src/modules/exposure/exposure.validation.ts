import { z } from 'zod';

const objectId = z.string().regex(/^[a-f\d]{24}$/i, 'Invalid ID');

/* ── Single hierarchy step ────────────────────────────────── */
const hierarchyStepInput = z.object({
  step: z.string({ required_error: 'Step description is required' }).min(2).max(300).trim(),
  suds: z.number({ required_error: 'SUDS rating is required' }).int().min(0).max(10),
});

/* ── Create plan ──────────────────────────────────────────── */
export const createPlanSchema = z.object({
  body: z.object({
    selectedBehavior: z
      .string({ required_error: 'Selected behavior is required' })
      .min(2)
      .max(300)
      .trim(),
    hierarchy: z
      .array(hierarchyStepInput)
      .min(1, 'At least 1 step is required')
      .max(10, 'Maximum 10 steps allowed'),
  }),
});

/* ── Update step completion ───────────────────────────────── */
export const updateStepSchema = z.object({
  params: z.object({ id: objectId }),
  body: z.object({
    stepIndex: z.number({ required_error: 'Step index is required' }).int().min(0),
    completed: z.boolean({ required_error: 'Completed flag is required' }),
  }),
});

/* ── ID param only ────────────────────────────────────────── */
export const idParamSchema = z.object({
  params: z.object({ id: objectId }),
});

/* ── Weekly Review ────────────────────────────────────────── */
const stepReviewInput = z.object({
  stepIndex: z.number().int().min(0),
  status: z.enum(['completed', 'in-progress', 'not-started']),
  sudsRating: z.number().min(0).max(10).optional().nullable(),
  problemType: z.string().optional().nullable(),
  plannedDay: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
});

export const weeklyReviewSchema = z.object({
  params: z.object({ id: objectId }),
  body: z.object({
    weekNumber: z.number().int().min(1),
    overallFeeling: z.string().optional().nullable(),
    stepReviews: z.array(stepReviewInput).default([]),
  }),
});

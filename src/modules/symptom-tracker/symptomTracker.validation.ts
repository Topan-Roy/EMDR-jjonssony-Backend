import { z } from 'zod';

// ─────────────────────────────────────────────────────────────────────────────
// SUB-SCHEMAS
// ─────────────────────────────────────────────────────────────────────────────

const trackerItemSchema = z.object({
  text   : z.string().trim().min(1).max(500),
  reverse: z.boolean().default(false),
});

const trackerOptionSchema = z.object({
  value: z.number().int().min(0).max(10),
  label: z.string().trim().min(1).max(50),
});

const trackerBandSchema = z.object({
  max        : z.number().int().min(0),
  label      : z.string().trim().min(1).max(100),
  description: z.string().trim().min(1).max(1000),
});

const trackerAlertSchema = z.object({
  item   : z.number().int().min(1),
  trigger: z.enum(['>=1', '>=2', '>=3']),
  title  : z.string().trim().min(1).max(200),
  message: z.string().trim().min(1).max(1000),
});

// ─────────────────────────────────────────────────────────────────────────────
// CREATE CONFIG
// ─────────────────────────────────────────────────────────────────────────────

export const createTrackerConfigSchema = z.object({
  body: z.object({
    trackerType: z
      .string()
      .trim()
      .min(1)
      .max(50)
      .toLowerCase()
      .regex(/^[a-z0-9-]+$/, 'trackerType must be lowercase alphanumeric with hyphens only'),
    name       : z.string().trim().min(1).max(100),
    description: z.string().trim().min(1).max(500),
    items      : z.array(trackerItemSchema).min(1, 'At least 1 item required'),
    options    : z.array(trackerOptionSchema).min(2, 'At least 2 options required'),
    bands      : z.array(trackerBandSchema).min(1, 'At least 1 band required'),
    alerts     : z.array(trackerAlertSchema).default([]),
    stemKey    : z.string().trim().nullable().default(null),
    isActive   : z.boolean().default(true),
  }),
});

// ─────────────────────────────────────────────────────────────────────────────
// UPDATE CONFIG (all fields optional)
// ─────────────────────────────────────────────────────────────────────────────

export const updateTrackerConfigSchema = z.object({
  params: z.object({
    type: z.string().trim().min(1),
  }),
  body: z.object({
    name       : z.string().trim().min(1).max(100).optional(),
    description: z.string().trim().min(1).max(500).optional(),
    items      : z.array(trackerItemSchema).min(1).optional(),
    options    : z.array(trackerOptionSchema).min(2).optional(),
    bands      : z.array(trackerBandSchema).min(1).optional(),
    alerts     : z.array(trackerAlertSchema).optional(),
    stemKey    : z.string().trim().nullable().optional(),
    isActive   : z.boolean().optional(),
  }),
});

// ─────────────────────────────────────────────────────────────────────────────
// TYPE PARAM
// ─────────────────────────────────────────────────────────────────────────────

export const typeParamSchema = z.object({
  params: z.object({
    type: z.string().trim().min(1).max(50),
  }),
});

// ─────────────────────────────────────────────────────────────────────────────
// SUBMIT TRACKER
// ─────────────────────────────────────────────────────────────────────────────

export const submitTrackerSchema = z.object({
  body: z.object({
    trackerType: z.string().trim().min(1).max(50).toLowerCase(),
    // raw answers array — one integer per item, in order
    answers    : z.array(z.number().int().min(0).max(10)).min(1, 'At least 1 answer required'),
    stemValue  : z.string().trim().max(200).nullable().optional(),
  }),
});

// ─────────────────────────────────────────────────────────────────────────────
// HISTORY QUERY
// ─────────────────────────────────────────────────────────────────────────────

export const historyQuerySchema = z.object({
  query: z.object({
    trackerType: z.string().trim().min(1).optional(),
    page       : z.string().transform(Number).pipe(z.number().int().min(1)).optional(),
    limit      : z.string().transform(Number).pipe(z.number().int().min(1).max(100)).optional(),
  }),
});

// ─────────────────────────────────────────────────────────────────────────────
// SUBMISSION ID PARAM
// ─────────────────────────────────────────────────────────────────────────────

export const submissionIdParamSchema = z.object({
  params: z.object({
    id: z.string().trim().min(1),
  }),
});

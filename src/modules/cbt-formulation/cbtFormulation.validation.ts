import { z } from 'zod';

const objectId = z.string().regex(/^[a-f\d]{24}$/i, 'Invalid ID');

/* ── Allowed emotion values ──────────────────────────────────── */
const emotionEnum = z.enum([
  'Sad', 'Shocked', 'Angry', 'Irritated', 'Anxious', 'Panic',
  'Frightened', 'Stressed', 'Scared', 'Confused', 'Guilty',
  'Ashamed', 'Hurt', 'Grief',
]);

/* ── Allowed section names (for PATCH auto-save) ─────────────── */
const sectionEnum = z.enum([
  'childhood', 'deepBeliefs', 'rules', 'triggers',
  'recentHappening', 'thoughts', 'feelings', 'behaviors',
  'consequences', 'consequencesOther', 'superpowers',
]);

/* ══════════════════════════════════════════════════════════════
   CREATE — full or partial initial save
   ══════════════════════════════════════════════════════════════ */
export const createCbtFormulationSchema = z.object({
  body: z.object({
    childhood:         z.string().max(2000).trim().optional(),
    deepBeliefs:       z.array(z.string().max(200).trim()).max(20).optional(),
    rules:             z.string().max(2000).trim().optional(),
    triggers:          z.string().max(2000).trim().optional(),
    recentHappening:   z.string().max(2000).trim().optional(),
    thoughts:          z.string().max(2000).trim().optional(),
    feelings:          z.array(emotionEnum).max(14).optional(),
    behaviors:         z.string().max(2000).trim().optional(),
    consequences:      z.array(z.string().max(500).trim()).max(15).optional(),
    consequencesOther: z.string().max(1000).trim().optional(),
    superpowers:       z.string().max(2000).trim().optional(),
    status:            z.enum(['draft', 'completed']).optional(),
  }),
});

/* ══════════════════════════════════════════════════════════════
   UPDATE — full replace, all optional
   ══════════════════════════════════════════════════════════════ */
export const updateCbtFormulationSchema = z.object({
  params: z.object({ id: objectId }),
  body: z.object({
    childhood:         z.string().max(2000).trim().optional(),
    deepBeliefs:       z.array(z.string().max(200).trim()).max(20).optional(),
    rules:             z.string().max(2000).trim().optional(),
    triggers:          z.string().max(2000).trim().optional(),
    recentHappening:   z.string().max(2000).trim().optional(),
    thoughts:          z.string().max(2000).trim().optional(),
    feelings:          z.array(emotionEnum).max(14).optional(),
    behaviors:         z.string().max(2000).trim().optional(),
    consequences:      z.array(z.string().max(500).trim()).max(15).optional(),
    consequencesOther: z.string().max(1000).trim().optional(),
    superpowers:       z.string().max(2000).trim().optional(),
    status:            z.enum(['draft', 'completed']).optional(),
  }),
});

/* ══════════════════════════════════════════════════════════════
   PATCH — single section auto-save
   ══════════════════════════════════════════════════════════════ */
export const patchSectionSchema = z.object({
  params: z.object({ id: objectId }),
  body: z.object({
    section: sectionEnum,
    value: z.union([
      z.string().max(2000),
      z.array(z.string().max(500)).max(20),
    ]),
  }),
});

/* ══════════════════════════════════════════════════════════════
   ID param only
   ══════════════════════════════════════════════════════════════ */
export const idParamSchema = z.object({
  params: z.object({ id: objectId }),
});

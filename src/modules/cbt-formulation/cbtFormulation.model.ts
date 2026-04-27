import mongoose, { Schema, Document } from 'mongoose';

/* ══════════════════════════════════════════════════════════════
   EMDR Negative Beliefs — therapist-curated predefined list
   ══════════════════════════════════════════════════════════════ */
export const NEGATIVE_BELIEFS = [
  "I don't deserve love",
  'I am a bad person',
  'I am terrible',
  'I am worthless/inadequate',
  'I am shameful',
  'I am not lovable',
  'I am not good enough',
  'I deserve only bad things',
  'I am permanently damaged',
  'I am ugly/my body is hateful',
  'I do not deserve...',
  'I am stupid/not smart enough',
  'I am insignificant/unimportant',
  'I am a disappointment',
  'I deserve to die',
  'I deserve to be miserable',
  "I am different/don't belong",
  'I should have done something',
  'I did something wrong',
  'I should have known better',
  'I should have done more',
  "It's my fault",
  'I cannot trust myself',
  'I cannot trust my judgment',
  'I cannot succeed',
  'I am not in control',
  'I am powerless/helpless',
  'I am weak',
  'I cannot stand up for myself',
  'I cannot let it out',
  'I am in danger',
  'I am not safe',
  'I cannot trust anyone',
  'I cannot protect myself',
  "It's not OK to feel/show my emotions",
  'I am alone',
  'I have to be perfect/please everyone',
  'I am responsible for others',
] as const;

/* ══════════════════════════════════════════════════════════════
   Consequence options — predefined checklist
   ══════════════════════════════════════════════════════════════ */
export const CONSEQUENCE_OPTIONS = [
  'Difficulty forming relationships',
  'Difficulty calming the body and mind',
  'Struggles with feeling safe',
  'Fear of the unknown',
  'Difficulty caring for oneself',
  'Holding on to bitterness or past hurts',
  'Loss of meaning or hope',
  'Avoidance of difficult thoughts or feelings',
] as const;

/* ══════════════════════════════════════════════════════════════
   Emotion options — predefined emotion palette
   ══════════════════════════════════════════════════════════════ */
export const EMOTION_OPTIONS = [
  'Sad',
  'Shocked',
  'Angry',
  'Irritated',
  'Anxious',
  'Panic',
  'Frightened',
  'Stressed',
  'Scared',
  'Confused',
  'Guilty',
  'Ashamed',
  'Hurt',
  'Grief',
] as const;

/* ══════════════════════════════════════════════════════════════
   TypeScript interface
   ══════════════════════════════════════════════════════════════ */
export interface ICbtFormulation extends Document {
  userId: mongoose.Types.ObjectId;

  /* Early Experiences */
  childhood: string;

  /* Core Beliefs — selected from NEGATIVE_BELIEFS */
  deepBeliefs: string[];

  /* Rules for Living */
  rules: string;

  /* Critical Incidents / Triggers */
  triggers: string;

  /* Current Situation */
  recentHappening: string;

  /* Responses (Hot Cross Bun) */
  thoughts: string;
  feelings: string[];
  behaviors: string;

  /* Consequences */
  consequences: string[];
  consequencesOther: string;

  /* Strengths */
  superpowers: string;

  /* Meta */
  status: 'draft' | 'completed';
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

/* Required fields to mark a formulation as "completed" */
export const REQUIRED_FIELDS: (keyof ICbtFormulation)[] = [
  'recentHappening',
  'thoughts',
  'feelings',
  'behaviors',
];

/* ══════════════════════════════════════════════════════════════
   Mongoose Schema
   ══════════════════════════════════════════════════════════════ */
const cbtFormulationSchema = new Schema<ICbtFormulation>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },

    /* ── Early Experiences ───────────────────────────────────── */
    childhood: {
      type: String,
      trim: true,
      maxlength: [2000, 'Childhood text cannot exceed 2000 characters'],
      default: '',
    },

    /* ── Core Beliefs ────────────────────────────────────────── */
    deepBeliefs: {
      type: [String],
      default: [],
    },

    /* ── Rules for Living ────────────────────────────────────── */
    rules: {
      type: String,
      trim: true,
      maxlength: [2000, 'Rules text cannot exceed 2000 characters'],
      default: '',
    },

    /* ── Triggers ────────────────────────────────────────────── */
    triggers: {
      type: String,
      trim: true,
      maxlength: [2000, 'Triggers text cannot exceed 2000 characters'],
      default: '',
    },

    /* ── Current Situation ───────────────────────────────────── */
    recentHappening: {
      type: String,
      trim: true,
      maxlength: [2000, 'Recent happening text cannot exceed 2000 characters'],
      default: '',
    },

    /* ── Thoughts ────────────────────────────────────────────── */
    thoughts: {
      type: String,
      trim: true,
      maxlength: [2000, 'Thoughts text cannot exceed 2000 characters'],
      default: '',
    },

    /* ── Feelings ────────────────────────────────────────────── */
    feelings: {
      type: [String],
      default: [],
    },

    /* ── Behaviors ───────────────────────────────────────────── */
    behaviors: {
      type: String,
      trim: true,
      maxlength: [2000, 'Behaviors text cannot exceed 2000 characters'],
      default: '',
    },

    /* ── Consequences ────────────────────────────────────────── */
    consequences: {
      type: [String],
      default: [],
    },

    consequencesOther: {
      type: String,
      trim: true,
      maxlength: [1000, 'Custom consequences text cannot exceed 1000 characters'],
      default: '',
    },

    /* ── Strengths ───────────────────────────────────────────── */
    superpowers: {
      type: String,
      trim: true,
      maxlength: [2000, 'Superpowers text cannot exceed 2000 characters'],
      default: '',
    },

    /* ── Status tracking ─────────────────────────────────────── */
    status: {
      type: String,
      enum: ['draft', 'completed'],
      default: 'draft',
    },

    completedAt: { type: Date },
  },
  { timestamps: true }
);

/* Compound index: fast lookup by user + status */
cbtFormulationSchema.index({ userId: 1, status: 1 });
cbtFormulationSchema.index({ userId: 1, createdAt: -1 });

export const CbtFormulation = mongoose.model<ICbtFormulation>(
  'CbtFormulation',
  cbtFormulationSchema
);

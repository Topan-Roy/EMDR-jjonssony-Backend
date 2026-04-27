import mongoose, { Schema, Document } from 'mongoose';

/* ── Hierarchy step (sub-document) ──────────────────────────── */
export interface IHierarchyStep {
  step: string;
  suds: number;       // Subjective Units of Distress Scale (0-10)
  completed: boolean;
  completedAt?: Date;
}

const hierarchyStepSchema = new Schema<IHierarchyStep>(
  {
    step:        { type: String, required: true, trim: true },
    suds:        { type: Number, required: true, min: 0, max: 10 },
    completed:   { type: Boolean, default: false },
    completedAt: { type: Date },
  },
  { _id: true }      // each step gets its own _id for easy referencing
);

/* ── Exposure Plan (main document) ──────────────────────────── */
export interface IExposurePlan extends Document {
  userId: mongoose.Types.ObjectId;
  selectedBehavior: string;
  hierarchy: IHierarchyStep[];
  currentWeek: number;
  progressPercent: number;
  status: 'not_started' | 'in_progress' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}

const exposurePlanSchema = new Schema<IExposurePlan>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    selectedBehavior: {
      type: String,
      required: [true, 'Selected behavior is required'],
      trim: true,
    },
    hierarchy: {
      type: [hierarchyStepSchema],
      validate: {
        validator: (v: IHierarchyStep[]) => v.length >= 1 && v.length <= 10,
        message: 'Hierarchy must have between 1 and 10 steps',
      },
    },
    currentWeek: {
      type: Number,
      default: 1,
      min: 1,
    },
    progressPercent: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    status: {
      type: String,
      enum: ['not_started', 'in_progress', 'completed'],
      default: 'not_started',
    },
  },
  { timestamps: true }
);

export const ExposurePlan = mongoose.model<IExposurePlan>('ExposurePlan', exposurePlanSchema);

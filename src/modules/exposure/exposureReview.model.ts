import mongoose, { Schema, Document } from 'mongoose';

export interface IStepReview {
  stepIndex: number;
  status: 'completed' | 'in-progress' | 'not-started';
  sudsRating?: number;
  problemType?: string;
  plannedDay?: string;
  notes?: string;
}

export interface IExposureWeeklyReview extends Document {
  planId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  weekNumber: number;
  overallFeeling?: string;
  stepReviews: IStepReview[];
  createdAt: Date;
  updatedAt: Date;
}

const stepReviewSchema = new Schema<IStepReview>(
  {
    stepIndex: { type: Number, required: true },
    status: { type: String, enum: ['completed', 'in-progress', 'not-started'], required: true },
    sudsRating: { type: Number, min: 0, max: 10 },
    problemType: { type: String },
    plannedDay: { type: String },
    notes: { type: String },
  },
  { _id: false }
);

const exposureWeeklyReviewSchema = new Schema<IExposureWeeklyReview>(
  {
    planId: {
      type: Schema.Types.ObjectId,
      ref: 'ExposurePlan',
      required: true,
      index: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    weekNumber: {
      type: Number,
      required: true,
      min: 1,
    },
    overallFeeling: {
      type: String,
    },
    stepReviews: {
      type: [stepReviewSchema],
      default: [],
    },
  },
  { timestamps: true }
);

// Ensure a user can only have one review per week per plan
exposureWeeklyReviewSchema.index({ planId: 1, weekNumber: 1 }, { unique: true });

export const ExposureWeeklyReview = mongoose.model<IExposureWeeklyReview>('ExposureWeeklyReview', exposureWeeklyReviewSchema);

import mongoose, { Schema, Document } from 'mongoose';

export interface IJourney extends Document {
  journeyName: string;
  description?: string;
  imageUrl?: string;
  imagePublicId?: string;
  isActive: boolean;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const journeySchema = new Schema<IJourney>(
  {
    journeyName: {
      type: String,
      required: [true, 'Journey name is required'],
      trim: true,
      minlength: [2, 'Journey name must be at least 2 characters'],
      maxlength: [150, 'Journey name cannot exceed 150 characters'],
    },
    description:    { type: String, trim: true, maxlength: 1000 },
    imageUrl:       { type: String },
    imagePublicId:  { type: String, select: false },
    isActive:       { type: Boolean, default: true, index: true },
    createdBy:      { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export const Journey = mongoose.model<IJourney>('Journey', journeySchema);

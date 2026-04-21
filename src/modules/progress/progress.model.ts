import mongoose, { Schema, Document } from 'mongoose';

// ── Media Progress ────────────────────────────────────────────────────────
export interface IMediaProgress extends Document {
  userId:          mongoose.Types.ObjectId;
  mediaId:         mongoose.Types.ObjectId;
  categoryId:      mongoose.Types.ObjectId;
  watchedSeconds:  number;
  totalSeconds:    number;
  percentage:      number;
  isCompleted:     boolean;
  lastWatchedAt:   Date;
  createdAt:       Date;
  updatedAt:       Date;
}

const mediaProgressSchema = new Schema<IMediaProgress>(
  {
    userId:         { type: Schema.Types.ObjectId, ref: 'User',     required: true, index: true },
    mediaId:        { type: Schema.Types.ObjectId, ref: 'Media',    required: true, index: true },
    categoryId:     { type: Schema.Types.ObjectId, ref: 'Category', required: true, index: true },
    watchedSeconds: { type: Number, required: true, min: 0, default: 0 },
    totalSeconds:   { type: Number, required: true, min: 1 },
    percentage:     { type: Number, required: true, min: 0, max: 100, default: 0 },
    isCompleted:    { type: Boolean, default: false, index: true },
    lastWatchedAt:  { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// One record per user per media
mediaProgressSchema.index({ userId: 1, mediaId: 1 }, { unique: true });
mediaProgressSchema.index({ userId: 1, categoryId: 1 });

export const MediaProgress = mongoose.model<IMediaProgress>('MediaProgress', mediaProgressSchema);

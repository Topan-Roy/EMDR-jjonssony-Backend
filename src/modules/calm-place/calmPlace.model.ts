import mongoose, { Schema, Document } from 'mongoose';

export interface ICalmPlace extends Document {
  userId: mongoose.Types.ObjectId;
  image: string;      // Cloudinary URL
  soundLink: string;  // link or Cloudinary URL
  describe: string;
  createdAt: Date;
  updatedAt: Date;
}

const calmPlaceSchema = new Schema<ICalmPlace>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true, index: true },
    image: { type: String, default: '' },
    soundLink: { type: String, default: '' },
    describe: { type: String, trim: true, default: '' },
  },
  { timestamps: true }
);

export const CalmPlace = mongoose.model<ICalmPlace>('CalmPlace', calmPlaceSchema);

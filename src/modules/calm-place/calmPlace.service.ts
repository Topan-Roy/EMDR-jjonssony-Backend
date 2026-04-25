import { CalmPlace } from './calmPlace.model';
import { uploadGeneralMedia, deleteFromCloudinary } from '../../utils/uploadImage';
import { ApiError } from '../../utils/ApiError';
import { logger } from '../../config/logger';

export class CalmPlaceService {
  /**
   * Create or Update Calm Place
   */
  async save(
    userId: string, 
    data: { describe?: string, image?: string, soundLink?: string }, 
    files?: { image?: Express.Multer.File[], sound?: Express.Multer.File[] }
  ) {
    const existing = await CalmPlace.findOne({ userId });
    
    let { describe, image, soundLink } = data;

    // Handle Image Upload
    if (files?.image?.[0]) {
      const uploaded = await uploadGeneralMedia(
        files.image[0].buffer, 
        'my-emdr/calm-place', 
        `img_${userId}_${Date.now()}`
      );
      image = uploaded.url;
      // Delete old image if it was a cloudinary link
      if (existing?.image && existing.image.includes('cloudinary')) {
        deleteFromCloudinary(existing.image).catch(() => {});
      }
    }

    // Handle Sound Upload
    if (files?.sound?.[0]) {
      const uploaded = await uploadGeneralMedia(
        files.sound[0].buffer, 
        'my-emdr/calm-place', 
        `snd_${userId}_${Date.now()}`
      );
      soundLink = uploaded.url;
      // Delete old sound if it was a cloudinary link
      if (existing?.soundLink && existing.soundLink.includes('cloudinary')) {
        deleteFromCloudinary(existing.soundLink).catch(() => {});
      }
    }

    const updateData: Record<string, any> = {};
    if (describe !== undefined) updateData.describe = describe;
    if (image !== undefined) updateData.image = image;
    if (soundLink !== undefined) updateData.soundLink = soundLink;

    const calmPlace = await CalmPlace.findOneAndUpdate(
      { userId },
      updateData,
      { upsert: true, new: true, runValidators: true }
    );

    logger.info('Calm place saved', { userId, id: calmPlace._id });
    return calmPlace;
  }

  async get(userId: string) {
    const calmPlace = await CalmPlace.findOne({ userId }).lean();
    return calmPlace || { userId: userId, describe: '', image: '', soundLink: '' };
  }

  async delete(userId: string) {
    const calmPlace = await CalmPlace.findOne({ userId });
    if (!calmPlace) throw ApiError.notFound('Calm place not found');

    if (calmPlace.image && calmPlace.image.includes('cloudinary')) {
      deleteFromCloudinary(calmPlace.image).catch(() => {});
    }
    if (calmPlace.soundLink && calmPlace.soundLink.includes('cloudinary')) {
      deleteFromCloudinary(calmPlace.soundLink).catch(() => {});
    }

    await calmPlace.deleteOne();
    logger.info('Calm place deleted', { userId });
    return { message: 'Calm place deleted successfully' };
  }
}

export const calmPlaceService = new CalmPlaceService();

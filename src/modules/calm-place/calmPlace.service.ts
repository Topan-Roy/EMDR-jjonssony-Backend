import { CalmPlace } from './calmPlace.model';
import { uploadGeneralMedia, deleteFromCloudinary } from '../../utils/uploadImage';
import { ApiError } from '../../utils/ApiError';
import { logger } from '../../config/logger';

export class CalmPlaceService {
  /**
   * Create a new Calm Place
   */
  async save(
    userId: string, 
    data: { describe?: string, image?: string, soundLink?: string }, 
    files?: { image?: Express.Multer.File[], sound?: Express.Multer.File[] }
  ) {
    let { describe, image, soundLink } = data;

    // Handle Image Upload
    if (files?.image?.[0]) {
      const uploaded = await uploadGeneralMedia(
        files.image[0].buffer, 
        'my-emdr/calm-place', 
        `img_${userId}_${Date.now()}`
      );
      image = uploaded.url;
    }

    // Handle Sound Upload
    if (files?.sound?.[0]) {
      const uploaded = await uploadGeneralMedia(
        files.sound[0].buffer, 
        'my-emdr/calm-place', 
        `snd_${userId}_${Date.now()}`
      );
      soundLink = uploaded.url;
    }

    // Drop the unique index to allow multiple calm places (temporary fix to update DB)
    try {
      await CalmPlace.collection.dropIndex('userId_1');
    } catch (e) {
      // Ignore if index doesn't exist
    }

    const calmPlace = await CalmPlace.create({
      userId,
      describe,
      image,
      soundLink
    });

    logger.info('Calm place created', { userId, id: calmPlace._id });
    return calmPlace;
  }

  async get(userId: string) {
    const calmPlaces = await CalmPlace.find({ userId }).sort({ createdAt: -1 }).lean();
    return calmPlaces;
  }

  async delete(id: string, userId: string) {
    const calmPlace = await CalmPlace.findOne({ _id: id, userId });
    if (!calmPlace) throw ApiError.notFound('Calm place not found');

    if (calmPlace.image && calmPlace.image.includes('cloudinary')) {
      deleteFromCloudinary(calmPlace.image).catch(() => {});
    }
    if (calmPlace.soundLink && calmPlace.soundLink.includes('cloudinary')) {
      deleteFromCloudinary(calmPlace.soundLink).catch(() => {});
    }

    await calmPlace.deleteOne();
    logger.info('Calm place deleted', { id, userId });
    return { message: 'Calm place deleted successfully' };
  }
}

export const calmPlaceService = new CalmPlaceService();

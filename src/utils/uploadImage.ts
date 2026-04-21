import { cloudinary } from '../config/cloudinary';
import { logger } from '../config/logger';
import { ApiError } from '../utils/ApiError';

/**
 * Upload a file buffer to Cloudinary
 * Returns the secure URL of the uploaded image
 */
export const uploadToCloudinary = (
  buffer: Buffer,
  folder: string,
  publicId: string,
  resourceType: 'image' | 'video' | 'raw' = 'image'
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        public_id: publicId,
        overwrite: true,
        resource_type: resourceType,
        ...(resourceType === 'image' && {
          transformation: [
            { width: 800, height: 800, crop: 'limit' }, // More reasonable default for general images
            { quality: 'auto', fetch_format: 'auto' },
          ],
        }),
      },
      (error, result) => {
        if (error || !result) {
          logger.error('Cloudinary upload failed', { error: error?.message || error, publicId });
          return reject(new ApiError(500, 'UPLOAD_FAILED', `Upload failed: ${error?.message || 'Unknown error'}`));
        }
        resolve(result.secure_url);
      }
    );
    stream.end(buffer);
  });
};

/**
 * Upload any media file (Image, Video, Audio) to Cloudinary
 * Auto-detects the resource type and uploads without heavy image transformations
 */
export const uploadGeneralMedia = (
  buffer: Buffer,
  folder: string,
  filename: string
): Promise<{ url: string; resourceType: string; format: string }> => {
  return new Promise((resolve, reject) => {
    // Note: For files > 100MB, Cloudinary recommends upload_large or chunked upload.
    // upload_stream works but may timeout on slow connections.
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        public_id: filename,
        resource_type: 'auto',
        chunk_size: 6000000, // 6MB chunks (default is 20MB, smaller can be more stable)
      },
      (error, result) => {
        if (error || !result) {
          logger.error('Cloudinary media upload failed', {
            error: error?.message || error,
            filename
          });
          return reject(new ApiError(500, 'MEDIA_UPLOAD_FAILED', `Media upload failed: ${error?.message || 'Unknown error'}`));
        }
        resolve({
          url: result.secure_url,
          resourceType: result.resource_type,
          format: result.format || '',
        });
      }
    );
    stream.end(buffer);
  });
};

/**
 * Delete an image from Cloudinary by URL
 */
export const deleteFromCloudinary = async (imageUrl: string): Promise<void> => {
  try {
    // Extract public_id from URL
    const parts = imageUrl.split('/');
    const folder = parts[parts.length - 2];
    const filename = parts[parts.length - 1].split('.')[0];
    const publicId = `${folder}/${filename}`;
    await cloudinary.uploader.destroy(publicId);
  } catch (err) {
    logger.warn('Cloudinary delete failed', { imageUrl });
  }
};

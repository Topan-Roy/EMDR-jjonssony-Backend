import { Request, Response, NextFunction } from 'express';
import { uploadMediaFile } from '../../middleware/upload';
import { uploadGeneralMedia } from '../../utils/uploadImage';
import { ApiError } from '../../utils/ApiError';

export class UploadController {
  async uploadMedia(req: Request, res: Response, next: NextFunction): Promise<void> {
    // We use multer as a wrapper so we can catch its errors manually if needed, 
    // but the route can also just pass the middleware. Doing it inside allows better error mapping.
    uploadMediaFile(req as any, res, async (err) => {
      try {
        if (err) return next(err);

        const file = (req as any).file;
        if (!file) {
          throw ApiError.validationError('No file provided or file type is unsupported. Use field name "file".');
        }

        const userId = req.user?.userId || 'anonymous';
        const buffer = file.buffer;
        
        // Generate a filename like user_id_timestamp
        const filename = `media_${userId}_${Date.now()}`;
        
        // Upload to Cloudinary auto-detecting the format
        const result = await uploadGeneralMedia(buffer, 'my-emdr/media', filename);

        res.status(200).json({
          success: true,
          data: {
            url: result.url,
            resourceType: result.resourceType,
            format: result.format
          },
          meta: { timestamp: new Date().toISOString() }
        });
      } catch (error: any) {
        if (error?.message?.includes('Timeout') || error?.message?.includes('ETIMEDOUT') || error?.http_code === 499) {
          return next(new ApiError(408, 'UPLOAD_TIMEOUT', 'File upload timed out. Please try a smaller file or check your internet connection.'));
        }
        next(error);
      }
    });
  }
}

export const uploadController = new UploadController();

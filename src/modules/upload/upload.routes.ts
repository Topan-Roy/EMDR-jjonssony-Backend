import { Router } from 'express';
import { uploadController } from './upload.controller';
import { authenticate } from '../../middleware/authMiddleware';

const router = Router();

// Endpoint for uploading general media files (Video, Image, Audio)
router.post('/', authenticate, uploadController.uploadMedia);

export default router;

import { Router } from 'express';
import multer from 'multer';
import { calmPlaceController as ctrl } from './calmPlace.controller';
import { authenticate } from '../../middleware/authMiddleware';
import { validate } from '../../middleware/validate';
import { saveCalmPlaceSchema } from './calmPlace.validation';

const router = Router();
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 100 * 1024 * 1024 } // 100MB limit
});

router.use(authenticate);

/**
 * @route   POST /api/calm-place
 * @desc    Save (Create or Update) Calm Place
 * @access  Private
 * @body    { image: string (optional), soundLink: string (optional), describe: string } 
 *          OR use form-data with fields 'image' (file) and 'sound' (file)
 */
router.post(
  '/', 
  upload.fields([
    { name: 'image', maxCount: 1 }, 
    { name: 'sound', maxCount: 1 }
  ]), 
  // validate(saveCalmPlaceSchema), // Note: Validation might need to be partial for form-data
  ctrl.save
);

/**
 * @route   GET /api/calm-place
 * @desc    Get user's Calm Place
 * @access  Private
 */
router.get('/', ctrl.get);

/**
 * @route   DELETE /api/calm-place
 * @desc    Delete user's Calm Place
 * @access  Private
 */
router.delete('/', ctrl.delete);

export default router;

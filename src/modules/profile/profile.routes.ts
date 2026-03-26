import { Router } from 'express';
import { profileController } from './profile.controller';
import { authenticate } from '../../middleware/authMiddleware';
import { validate } from '../../middleware/validate';
import { updateProfileSchema } from './profile.validation';

const router = Router();

router.use(authenticate);

router.get('/', profileController.getProfile.bind(profileController));
router.patch('/',validate(updateProfileSchema), profileController.updateProfile.bind(profileController));
router.delete('/', profileController.deleteAccount.bind(profileController));

export default router;

import { Router } from 'express';
import { progressController as ctrl } from './progress.controller';
import { authenticate } from '../../middleware/authMiddleware';
import { validate } from '../../middleware/validate';
import { updateProgressSchema, categoryIdSchema, journeyIdSchema } from './progress.validation';

const router = Router();

router.use(authenticate);

// Update media watch progress (called by Flutter every 10-15 seconds)
router.patch('/media/:mediaId', validate(updateProgressSchema), ctrl.updateMediaProgress);

// Get category progress for current user
router.get('/category/:categoryId', validate(categoryIdSchema), ctrl.getCategoryProgress);

// Get journey progress for current user
router.get('/journey/:journeyId', validate(journeyIdSchema), ctrl.getJourneyProgress);

export default router;

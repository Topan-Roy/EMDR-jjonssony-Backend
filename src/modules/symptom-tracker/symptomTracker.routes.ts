import { Router } from 'express';
import { symptomTrackerController as ctrl } from './symptomTracker.controller';
import { authenticate, requireAdmin } from '../../middleware/authMiddleware';
import { validate } from '../../middleware/validate';
import {
  createTrackerConfigSchema,
  updateTrackerConfigSchema,
  typeParamSchema,
  submitTrackerSchema,
  historyQuerySchema,
  submissionIdParamSchema,
} from './symptomTracker.validation';

const router = Router();

router.get('/configs', ctrl.listConfigs);
router.get('/configs/:type', validate(typeParamSchema), ctrl.getConfigByType);
router.use(authenticate);
router.post('/submit', validate(submitTrackerSchema), ctrl.submit);
router.get('/history', validate(historyQuerySchema), ctrl.getHistory);
router.get('/history/:id', validate(submissionIdParamSchema), ctrl.getSubmissionById);
router.get('/trend', ctrl.getTrend);
router.get('/latest', ctrl.getLatest);
router.use(requireAdmin);
router.get('/admin/configs', ctrl.listConfigsAdmin);
router.post('/admin/configs', validate(createTrackerConfigSchema), ctrl.createConfig);
router.patch('/admin/configs/:type', validate(updateTrackerConfigSchema), ctrl.updateConfig);
router.delete('/admin/configs/:type', validate(typeParamSchema), ctrl.deleteConfig);

/** GET /api/symptom-tracker/admin/submissions — all user submissions (paginated, filterable) */
router.get('/admin/submissions', ctrl.adminListSubmissions);

/** GET /api/symptom-tracker/admin/stats — aggregate stats per tracker type */
router.get('/admin/stats', ctrl.adminStats);

export default router;
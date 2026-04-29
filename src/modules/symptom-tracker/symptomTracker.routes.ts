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

// ─────────────────────────────────────────────────────────────────────────────
// PUBLIC — no auth required
// ─────────────────────────────────────────────────────────────────────────────

/** GET /api/symptom-tracker/configs — list all active tracker configs */
router.get('/configs', ctrl.listConfigs);

/** GET /api/symptom-tracker/configs/:type — get one config (e.g. "anxiety") */
router.get('/configs/:type', validate(typeParamSchema), ctrl.getConfigByType);

// ─────────────────────────────────────────────────────────────────────────────
// USER — authenticated
// ─────────────────────────────────────────────────────────────────────────────

router.use(authenticate);

/** POST /api/symptom-tracker/submit — submit answers, server scores & saves */
router.post('/submit', validate(submitTrackerSchema), ctrl.submit);

/** GET /api/symptom-tracker/history — paginated submission history */
router.get('/history', validate(historyQuerySchema), ctrl.getHistory);

/** GET /api/symptom-tracker/history/:id — single submission detail */
router.get('/history/:id', validate(submissionIdParamSchema), ctrl.getSubmissionById);

/** GET /api/symptom-tracker/trend?trackerType=anxiety — score trend for chart */
router.get('/trend', ctrl.getTrend);

/** GET /api/symptom-tracker/latest — latest submission per tracker type */
router.get('/latest', ctrl.getLatest);

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN — authenticate + admin role
// ─────────────────────────────────────────────────────────────────────────────

router.use(requireAdmin);

/** GET /api/symptom-tracker/admin/configs — all configs incl. inactive */
router.get('/admin/configs', ctrl.listConfigsAdmin);

/** POST /api/symptom-tracker/admin/configs — create tracker config */
router.post('/admin/configs', validate(createTrackerConfigSchema), ctrl.createConfig);

/** PATCH /api/symptom-tracker/admin/configs/:type — update tracker config */
router.patch('/admin/configs/:type', validate(updateTrackerConfigSchema), ctrl.updateConfig);

/** DELETE /api/symptom-tracker/admin/configs/:type — delete tracker config */
router.delete('/admin/configs/:type', validate(typeParamSchema), ctrl.deleteConfig);

export default router;

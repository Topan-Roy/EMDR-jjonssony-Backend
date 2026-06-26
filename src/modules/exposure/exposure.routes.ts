import { Router } from 'express';
import { exposureController as ctrl } from './exposure.controller';
import { authenticate } from '../../middleware/authMiddleware';
import { validate } from '../../middleware/validate';
import { createPlanSchema, updateStepSchema, idParamSchema, weeklyReviewSchema } from './exposure.validation';

const router = Router();

// All exposure routes require authentication
router.use(authenticate);

// 1️⃣  GET  /api/exposure/behaviors       → থেরাপিস্ট সেট করা আচরণগুলো
router.get('/behaviors', ctrl.getBehaviors);

// 2️⃣  POST /api/exposure/plan             → নতুন প্ল্যান তৈরি
router.post('/plan', validate(createPlanSchema), ctrl.createPlan);

//     GET  /api/exposure/plans            → ইউজারের সব প্ল্যান
router.get('/plans', ctrl.getUserPlans);

// 3️⃣  GET  /api/exposure/plan/:id         → নির্দিষ্ট প্ল্যান দেখা
router.get('/plan/:id', validate(idParamSchema), ctrl.getPlan);

// 4️⃣  PATCH /api/exposure/plan/:id/step   → ধাপ সম্পন্ন/অসম্পন্ন করা
router.patch('/plan/:id/step', validate(updateStepSchema), ctrl.updateStep);

// 5️⃣  GET  /api/exposure/plan/:id/progress → প্রোগ্রেস দেখা
router.get('/plan/:id/progress', validate(idParamSchema), ctrl.getProgress);

// 6️⃣  GET  /api/exposure/plan/:id/weekly-review → Get active weekly review
router.get('/plan/:id/weekly-review', validate(idParamSchema), ctrl.getWeeklyReview);

// 7️⃣  GET  /api/exposure/plan/:id/weekly-review/history → Get all past weekly reviews
router.get('/plan/:id/weekly-review/history', validate(idParamSchema), ctrl.getWeeklyReviewHistory);

// 8️⃣  POST /api/exposure/plan/:id/weekly-review → Create/Update weekly review
router.post('/plan/:id/weekly-review', validate(weeklyReviewSchema), ctrl.saveWeeklyReview);

//     DELETE /api/exposure/plan/:id        → প্ল্যান ডিলিট
router.delete('/plan/:id', validate(idParamSchema), ctrl.deletePlan);

export default router;

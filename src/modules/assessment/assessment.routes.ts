import { Router } from 'express';
import { assessmentController as ctrl } from './assessment.controller';
import { authenticate } from '../../middleware/authMiddleware';
import { validate } from '../../middleware/validate';
import { phq9Schema, gad7Schema, des11Schema, assessmentSchema } from './assessment.validation';

const router = Router();

router.use(authenticate);

// 3-Stage Assessment Submission
router.post('/phq9',  validate(phq9Schema),  ctrl.submitPhq9);
router.post('/gad7',  validate(gad7Schema),  ctrl.submitGad7);
router.post('/des11', validate(des11Schema), ctrl.submitDes11);

// Standard Full Assessment Submission
router.post('/submit', validate(assessmentSchema), ctrl.submitFull);

router.get('/result', ctrl.getResult);

export default router;

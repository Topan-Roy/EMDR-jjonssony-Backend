import { Router } from 'express';
import { cbtFormulationController as ctrl } from './cbtFormulation.controller';
import { authenticate } from '../../middleware/authMiddleware';
import { validate } from '../../middleware/validate';
import {
  createCbtFormulationSchema,
  updateCbtFormulationSchema,
  patchSectionSchema,
  idParamSchema,
} from './cbtFormulation.validation';

const router = Router();

// All CBT formulation routes require authentication
router.use(authenticate);

// 1️⃣  GET  /api/cbt-formulation/options          → predefined beliefs, emotions, consequences
router.get('/options', ctrl.getOptions);

// 2️⃣  POST /api/cbt-formulation                  → create new formulation (draft or full)
router.post('/', validate(createCbtFormulationSchema), ctrl.create);

// 3️⃣  GET  /api/cbt-formulation                  → list all formulations for user
router.get('/', ctrl.list);

// 4️⃣  GET  /api/cbt-formulation/:id              → single formulation by ID
router.get('/:id', validate(idParamSchema), ctrl.getById);

// 5️⃣  PUT  /api/cbt-formulation/:id              → full update
router.put('/:id', validate(updateCbtFormulationSchema), ctrl.update);

// 6️⃣  PATCH /api/cbt-formulation/:id/section     → auto-save single section
router.patch('/:id/section', validate(patchSectionSchema), ctrl.patchSection);

// 7️⃣  DELETE /api/cbt-formulation/:id            → remove formulation
router.delete('/:id', validate(idParamSchema), ctrl.delete);

export default router;

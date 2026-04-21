import { Router } from 'express';
import multer from 'multer';
import { categoryController, mediaController } from './category.controller';
import { authenticate, requireAdmin } from '../../middleware/authMiddleware';
import { validate } from '../../middleware/validate';
import {
  createCategorySchema, updateCategorySchema,
  createMediaSchema, updateMediaSchema,
  idParamSchema, listQuerySchema,
} from './category.validation';
import { ApiError } from '../../utils/ApiError';

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 500 * 1024 * 1024 },
});

router.use(authenticate);

router.get('/categories', categoryController.list);
router.get('/categories/:id', validate(idParamSchema), categoryController.getById);
router.post('/categories', requireAdmin, validate(createCategorySchema), categoryController.create);
router.put('/categories/:id', requireAdmin, validate(updateCategorySchema), categoryController.update);
router.delete('/categories/:id', requireAdmin, validate(idParamSchema), categoryController.delete);

router.get('/media', validate(listQuerySchema), mediaController.list);
router.get('/media/:id', validate(idParamSchema), mediaController.getById);
router.post('/media', requireAdmin, upload.single('image'), validate(createMediaSchema), mediaController.upload);
router.put('/media/:id', requireAdmin, validate(updateMediaSchema), mediaController.update);
router.delete('/media/:id', requireAdmin, validate(idParamSchema), mediaController.delete);

export default router;

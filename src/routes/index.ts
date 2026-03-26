import { Router } from 'express';
import authRoutes from '../modules/auth/auth.routes';
import notificationRoutes from '../modules/notification/notification.routes';
import profileRoutes from '../modules/profile/profile.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/notifications', notificationRoutes);
router.use('/profile', profileRoutes);

export default router;

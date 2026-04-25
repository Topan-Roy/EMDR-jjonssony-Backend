import { Router } from 'express';
import { adminController } from './admin.controller';
import { authenticate, requireAdmin } from '../../middleware/authMiddleware';

const router = Router();

// All admin routes — must be authenticated + admin role
router.use(authenticate, requireAdmin);

/**
 * @route   GET /api/admin/dashboard
 * @desc    Get system overview stats (Dashboard)
 * @access  Private (Admin)
 */
router.get('/dashboard', adminController.getDashboardStats);

/**
 * @route   GET /api/admin/profile
 * @desc    Get admin profile
 * @access  Private (Admin)
 */
router.get('/profile', adminController.getProfile);

/**
 * @route   PATCH /api/admin/profile
 * @desc    Update admin profile
 * @access  Private (Admin)
 */
router.patch('/profile', adminController.updateProfile);

/** 
 * --- User Management ---
 */

/**
 * @route   GET /api/admin/users
 * @desc    Get all users with pagination and search
 * @access  Private (Admin)
 */
router.get('/users', adminController.getAllUsers);

/**
 * @route   GET /api/admin/users/:userId
 * @desc    Get detailed user information
 * @access  Private (Admin)
 */
router.get('/users/:userId', adminController.getUserDetails);

/**
 * @route   PATCH /api/admin/users/:userId/status
 * @desc    Activate or Suspend user
 * @access  Private (Admin)
 */
router.patch('/users/:userId/status', adminController.updateUserStatus);

export default router;

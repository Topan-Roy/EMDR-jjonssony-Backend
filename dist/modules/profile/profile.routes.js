"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const profile_controller_1 = require("./profile.controller");
const authMiddleware_1 = require("../../middleware/authMiddleware");
const validate_1 = require("../../middleware/validate");
const profile_validation_1 = require("./profile.validation");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const router = (0, express_1.Router)();
// Strict rate limit for password change — 5 attempts per 15 min
const passwordChangeLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, error: { code: 'TOO_MANY_REQUESTS', message: 'Too many password change attempts. Try again later.' } },
});
router.use(authMiddleware_1.authenticate);
/**
 * @swagger
 * tags:
 *   name: Profile
 *   description: User Profile Management
 */
/**
 * @swagger
 * /api/profile:
 *   get:
 *     summary: Get current user profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id: { type: string, example: "60d0fe2f5311236168a10b18" }
 *                     email: { type: string, example: "user@example.com" }
 *                     firstName: { type: string, example: "John" }
 *                     lastName: { type: string, example: "Doe" }
 *                     role: { type: string, example: "user" }
 *                     isEmailVerified: { type: boolean, example: true }
 *                     subscription:
 *                       type: object
 *                       properties:
 *                         status: { type: string, example: "active" }
 *                         planId: { type: string, example: "60d0fe2f5311236168a10b22" }
 *                         endDate: { type: string, example: "2024-10-01T12:00:00Z" }
 */
router.get('/', profile_controller_1.profileController.getProfile.bind(profile_controller_1.profileController));
/**
 * @swagger
 * /api/profile:
 *   patch:
 *     summary: Update profile information
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName: { type: string, example: "Jane" }
 *               lastName: { type: string, example: "Smith" }
 *     responses:
 *       200:
 *         description: Profile updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id: { type: string, example: "60d0fe2f5311236168a10b18" }
 *                     firstName: { type: string, example: "Jane" }
 *                     lastName: { type: string, example: "Smith" }
 */
router.patch('/', profile_controller_1.profileController.updateProfile.bind(profile_controller_1.profileController));
/**
 * @swagger
 * /api/profile/change-password:
 *   patch:
 *     summary: Change account password
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [oldPassword, newPassword, confirmPassword]
 *             properties:
 *               oldPassword: { type: string, example: "Old@1234" }
 *               newPassword: { type: string, example: "New@1234" }
 *               confirmPassword: { type: string, example: "New@1234" }
 *     responses:
 *       200:
 *         description: Password changed
 */
router.patch('/change-password', passwordChangeLimiter, (0, validate_1.validate)(profile_validation_1.changePasswordSchema), profile_controller_1.profileController.changePassword.bind(profile_controller_1.profileController));
/**
 * @swagger
 * /api/profile:
 *   delete:
 *     summary: Delete user account
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Account deleted
 */
router.delete('/', profile_controller_1.profileController.deleteAccount.bind(profile_controller_1.profileController));
exports.default = router;
//# sourceMappingURL=profile.routes.js.map
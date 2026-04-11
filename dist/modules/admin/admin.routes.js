"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_controller_1 = require("./admin.controller");
const authMiddleware_1 = require("../../middleware/authMiddleware");
const router = (0, express_1.Router)();
// All admin routes — must be authenticated + admin role
router.use(authMiddleware_1.authenticate, authMiddleware_1.requireAdmin);
/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Administrator Management and Control
 */
/**
 * @swagger
 * /api/admin/profile:
 *   get:
 *     summary: Get admin profile
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Admin profile data retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id: { type: string, example: "60d0fe2f5311236168a10b19" }
 *                     email: { type: string, example: "admin@example.com" }
 *                     firstName: { type: string, example: "Super" }
 *                     lastName: { type: string, example: "Admin" }
 *                     role: { type: string, example: "admin" }
 */
router.get('/', admin_controller_1.adminController.getProfile);
/**
 * @swagger
 * /api/admin/profile:
 *   patch:
 *     summary: Update admin profile
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName: { type: string, example: "Super" }
 *               lastName: { type: string, example: "Admin" }
 *     responses:
 *       200:
 *         description: Admin profile updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id: { type: string, example: "60d0fe2f5311236168a10b19" }
 *                     firstName: { type: string, example: "Super" }
 *                     lastName: { type: string, example: "Admin" }
 */
router.patch('/', admin_controller_1.adminController.updateProfile);
exports.default = router;
//# sourceMappingURL=admin.routes.js.map
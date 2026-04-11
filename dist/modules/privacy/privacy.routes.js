"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const privacy_controller_1 = require("./privacy.controller");
const authMiddleware_1 = require("../../middleware/authMiddleware");
const validate_1 = require("../../middleware/validate");
const privacy_validation_1 = require("./privacy.validation");
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Privacy
 *   description: CMS - Privacy Policy Management
 */
// PUBLIC — no auth required
/**
 * @swagger
 * /api/privacy/active:
 *   get:
 *     summary: Get currently active Privacy Policy
 *     tags: [Privacy]
 *     responses:
 *       200:
 *         description: Active privacy policy content
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id: { type: string, example: "60d0fe2f5311236168a10b15" }
 *                     overview: { type: string, example: "<p>We value your <b>privacy</b>. This policy explains how we handle your data.</p>" }
 *                     version: { type: string, example: "1.0.1" }
 *                     effectiveDate: { type: string, example: "2023-10-01T12:00:00Z" }
 *                     sections:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           title: { type: string, example: "Data Collection" }
 *                           content: { type: string, example: "<ul><li>We collect email addresses.</li><li>We collect usage data.</li></ul>" }
 *                           order: { type: number, example: 1 }
 *                     isActive: { type: boolean, example: true }
 *                     updatedAt: { type: string, example: "2023-10-01T12:00:00Z" }
 */
router.get('/active', privacy_controller_1.privacyController.getActive);
// ADMIN ONLY
/**
 * @swagger
 * /api/privacy:
 *   get:
 *     summary: Get all privacy policy versions (Admin Only)
 *     tags: [Privacy]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of privacy policies
 */
router.use(authMiddleware_1.authenticate, authMiddleware_1.requireAdmin);
router.get('/', privacy_controller_1.privacyController.getAll);
/**
 * @swagger
 * /api/privacy/{id}:
 *   get:
 *     summary: Get privacy policy by ID (Admin Only)
 *     tags: [Privacy]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Privacy policy content retrieved
 */
router.get('/:id', (0, validate_1.validate)(privacy_validation_1.idParamSchema), privacy_controller_1.privacyController.getById);
/**
 * @swagger
 * /api/privacy:
 *   post:
 *     summary: Create new Privacy Policy version (Admin Only)
 *     tags: [Privacy]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [overview, version, sections, contactEmail, contactName]
 *             properties:
 *               version: { type: string, example: "1.0.2" }
 *               overview: { type: string, example: "<h3>Welcome</h3><p>This is the <i>new</i> version.</p>" }
 *               effectiveDate: { type: string, example: "2023-10-15T00:00:00Z" }
 *               changelog: { type: string, example: "Added detailed data retention section." }
 *               contactEmail: { type: string, example: "legal@myemdr.com" }
 *               contactName: { type: string, example: "Legal Team" }
 *               sections:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     title: { type: string, example: "1. Data We Collect" }
 *                     content: { type: string, example: "<p>We collect <u>email</u> and <s>names</s>.</p>" }
 *                     order: { type: number, example: 0 }
 *     responses:
 *       201:
 *         description: Privacy policy created
 */
router.post('/', (0, validate_1.validate)(privacy_validation_1.createPrivacySchema), privacy_controller_1.privacyController.create);
/**
 * @swagger
 * /api/privacy/{id}:
 *   put:
 *     summary: Replace a privacy policy version (Admin Only)
 *     tags: [Privacy]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [content, version]
 *             properties:
 *               content: { type: string }
 *               version: { type: string }
 *     responses:
 *       200:
 *         description: Privacy policy replaced
 */
router.put('/:id', (0, validate_1.validate)(privacy_validation_1.replacePrivacySchema), privacy_controller_1.privacyController.replace);
/**
 * @swagger
 * /api/privacy/{id}:
 *   patch:
 *     summary: Partially update a privacy policy (Admin Only)
 *     tags: [Privacy]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content: { type: string }
 *     responses:
 *       200:
 *         description: Privacy policy updated
 */
router.patch('/:id', (0, validate_1.validate)(privacy_validation_1.updatePrivacySchema), privacy_controller_1.privacyController.update);
/**
 * @swagger
 * /api/privacy/{id}/activate:
 *   patch:
 *     summary: Set a privacy policy version as active (Admin Only)
 *     tags: [Privacy]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Privacy policy activated
 */
router.patch('/:id/activate', (0, validate_1.validate)(privacy_validation_1.idParamSchema), privacy_controller_1.privacyController.setActive);
/**
 * @swagger
 * /api/privacy/{id}:
 *   delete:
 *     summary: Delete a privacy policy version (Admin Only)
 *     tags: [Privacy]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Privacy policy deleted
 */
router.delete('/:id', (0, validate_1.validate)(privacy_validation_1.idParamSchema), privacy_controller_1.privacyController.delete);
exports.default = router;
//# sourceMappingURL=privacy.routes.js.map
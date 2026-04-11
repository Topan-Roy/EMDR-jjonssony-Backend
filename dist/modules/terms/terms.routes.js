"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const terms_controller_1 = require("./terms.controller");
const authMiddleware_1 = require("../../middleware/authMiddleware");
const validate_1 = require("../../middleware/validate");
const terms_validation_1 = require("./terms.validation");
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Terms
 *   description: CMS - Terms and Conditions Management
 */
// ── PUBLIC ────────────────────────────────────────────────
/**
 * @swagger
 * /api/terms/active:
 *   get:
 *     summary: Get currently active Terms and Conditions
 *     tags: [Terms]
 *     responses:
 *       200:
 *         description: Active terms content
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
 *                     version: { type: string, example: "2.1.0" }
 *                     lastUpdated: { type: string, example: "2023-10-01T12:00:00Z" }
 *                     sections:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           title: { type: string, example: "User Obligations" }
 *                           content: { type: string, example: "<p>Users <b>must</b> keep their passwords <u>secure</u> at all times.</p>" }
 *                           order: { type: number, example: 0 }
 *                     isActive: { type: boolean, example: true }
 */
router.get('/active', terms_controller_1.termsController.getActive);
// ── AUTHENTICATED USER ────────────────────────────────────
/**
 * @swagger
 * /api/terms/accept:
 *   post:
 *     summary: Accept terms for the current user
 *     tags: [Terms]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [termsId]
 *             properties:
 *               termsId: { type: string, example: "60d0fe2f5311236168a10b18" }
 *     responses:
 *       200:
 *         description: Terms accepted
 */
router.post('/accept', authMiddleware_1.authenticate, (0, validate_1.validate)(terms_validation_1.acceptTermsSchema), terms_controller_1.termsController.acceptTerms);
/**
 * @swagger
 * /api/terms/acceptance/status:
 *   get:
 *     summary: Check if user has accepted the latest terms
 *     tags: [Terms]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Acceptance status retrieved
 */
router.get('/acceptance/status', authMiddleware_1.authenticate, terms_controller_1.termsController.checkAcceptance);
// ── ADMIN ONLY ────────────────────────────────────────────
/**
 * @swagger
 * /api/terms:
 *   get:
 *     summary: Get all terms versions (Admin Only)
 *     tags: [Terms]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of terms
 */
router.use(authMiddleware_1.authenticate, authMiddleware_1.requireAdmin);
router.get('/', terms_controller_1.termsController.getAll);
/**
 * @swagger
 * /api/terms/{id}:
 *   get:
 *     summary: Get terms by ID (Admin Only)
 *     tags: [Terms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Terms content retrieved
 */
router.get('/:id', (0, validate_1.validate)(terms_validation_1.idParamSchema), terms_controller_1.termsController.getById);
/**
 * @swagger
 * /api/terms/{id}/stats:
 *   get:
 *     summary: Get acceptance statistics for a terms version (Admin Only)
 *     tags: [Terms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Stats retrieved
 */
router.get('/:id/stats', (0, validate_1.validate)(terms_validation_1.idParamSchema), terms_controller_1.termsController.getAcceptanceStats);
/**
 * @swagger
 * /api/terms:
 *   post:
 *     summary: Create new Terms version (Admin Only)
 *     tags: [Terms]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [version, sections, contactEmail, contactName]
 *             properties:
 *               version: { type: string, example: "2.1.1" }
 *               changelog: { type: string, example: "Updated refund policy section." }
 *               contactEmail: { type: string, example: "support@myemdr.com" }
 *               contactName: { type: string, example: "Support Team" }
 *               sections:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     title: { type: string, example: "1. Introduction" }
 *                     content: { type: string, example: "<h1>Welcome</h1><p>This is formatted with <b>HTML</b> tags.</p>" }
 *                     order: { type: number, example: 0 }
 *     responses:
 *       201:
 *         description: Terms created
 */
router.post('/', (0, validate_1.validate)(terms_validation_1.createTermsSchema), terms_controller_1.termsController.create);
/**
 * @swagger
 * /api/terms/{id}:
 *   put:
 *     summary: Replace a terms version (Admin Only)
 *     tags: [Terms]
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
 *             required: [version, sections, contactEmail, contactName]
 *             properties:
 *               version: { type: string, example: "2.1.2" }
 *               sections:
 *                 type: array
 *                 items:
 *                    type: object
 *                    properties:
 *                      title: { type: string, example: "Updated Section" }
 *                      content: { type: string, example: "<p>Updated <i>rich text</i> content.</p>" }
 *                      order: { type: number, example: 0 }
 *               contactEmail: { type: string, example: "updated@myemdr.com" }
 *               contactName: { type: string, example: "Updated Team" }
 *     responses:
 *       200:
 *         description: Terms replaced
 */
router.put('/:id', (0, validate_1.validate)(terms_validation_1.replaceTermsSchema), terms_controller_1.termsController.replace);
/**
 * @swagger
 * /api/terms/{id}:
 *   patch:
 *     summary: Partially update a terms version (Admin Only)
 *     tags: [Terms]
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
 *         description: Terms updated
 */
router.patch('/:id', (0, validate_1.validate)(terms_validation_1.updateTermsSchema), terms_controller_1.termsController.update);
/**
 * @swagger
 * /api/terms/{id}/activate:
 *   patch:
 *     summary: Set a terms version as active (Admin Only)
 *     tags: [Terms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Terms activated
 */
router.patch('/:id/activate', (0, validate_1.validate)(terms_validation_1.idParamSchema), terms_controller_1.termsController.setActive);
/**
 * @swagger
 * /api/terms/{id}:
 *   delete:
 *     summary: Delete a terms version (Admin Only)
 *     tags: [Terms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Terms deleted
 */
router.delete('/:id', (0, validate_1.validate)(terms_validation_1.idParamSchema), terms_controller_1.termsController.delete);
exports.default = router;
//# sourceMappingURL=terms.routes.js.map
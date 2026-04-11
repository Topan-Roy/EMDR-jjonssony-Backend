"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const faq_controller_1 = require("./faq.controller");
const authMiddleware_1 = require("../../middleware/authMiddleware");
const validate_1 = require("../../middleware/validate");
const faq_validation_1 = require("./faq.validation");
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: FAQ
 *   description: CMS - Frequently Asked Questions Management
 */
// PUBLIC — no auth required
/**
 * @swagger
 * /api/faq:
 *   get:
 *     summary: Get all active FAQ items
 *     tags: [FAQ]
 *     responses:
 *       200:
 *         description: List of FAQs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id: { type: string, example: "60d0fe2f5311236168a10b12" }
 *                       question: { type: string, example: "HHow do I contact support?" }
 *                       answer: { type: string, example: "<p>You can contact us via <b>email</b> at <a href='mailto:support@myemdr.com'>support@myemdr.com</a>.</p>" }
 *                       order: { type: integer, example: 1 }
 *                       displayId: { type: integer, example: 1 }
 */
router.get('/', faq_controller_1.faqController.getAll);
/**
 * @swagger
 * /api/faq/{id}:
 *   get:
 *     summary: Get FAQ by ID
 *     tags: [FAQ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: FAQ item retrieved
 */
router.get('/:id', (0, validate_1.validate)(faq_validation_1.idParamSchema), faq_controller_1.faqController.getById);
// ADMIN ONLY
/**
 * @swagger
 * /api/faq/admin/all:
 *   get:
 *     summary: Get all FAQs including inactive ones (Admin Only)
 *     tags: [FAQ]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all FAQs
 */
router.use(authMiddleware_1.authenticate, authMiddleware_1.requireAdmin);
router.get('/admin/all', faq_controller_1.faqController.getAllAdmin);
/**
 * @swagger
 * /api/faq:
 *   post:
 *     summary: Create new FAQ item (Admin Only)
 *     tags: [FAQ]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [question, answer]
 *             properties:
 *               question: { type: string, example: "Is MY-EMDR secure?" }
 *               answer: { type: string, example: "<h1>Yes</h1><p>Our platform uses <b>enterprise-grade</b> encryption.</p>" }
 *               order: { type: integer, default: 0, example: 5 }
 *               isActive: { type: boolean, default: true, example: true }
 *     responses:
 *       201:
 *         description: FAQ created
 */
router.post('/', (0, validate_1.validate)(faq_validation_1.createFaqSchema), faq_controller_1.faqController.create);
/**
 * @swagger
 * /api/faq/reorder:
 *   patch:
 *     summary: Reorder FAQ items (Admin Only)
 *     tags: [FAQ]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [items]
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required: [id, order]
 *                   properties:
 *                     id: { type: string, example: "60d0fe2f5311236168a10b12" }
 *                     order: { type: integer, example: 0 }
 *     responses:
 *       200:
 *         description: FAQs reordered
 */
router.patch('/reorder', (0, validate_1.validate)(faq_validation_1.reorderSchema), faq_controller_1.faqController.reorder);
/**
 * @swagger
 * /api/faq/{id}:
 *   patch:
 *     summary: Partially update an FAQ item (Admin Only)
 *     tags: [FAQ]
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
 *               question: { type: string }
 *               answer: { type: string }
 *               isActive: { type: boolean }
 *     responses:
 *       200:
 *         description: FAQ updated
 */
router.patch('/:id', (0, validate_1.validate)(faq_validation_1.updateFaqSchema), faq_controller_1.faqController.update);
/**
 * @swagger
 * /api/faq/{id}:
 *   delete:
 *     summary: Delete an FAQ item (Admin Only)
 *     tags: [FAQ]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: FAQ deleted
 */
router.delete('/:id', (0, validate_1.validate)(faq_validation_1.idParamSchema), faq_controller_1.faqController.delete);
exports.default = router;
//# sourceMappingURL=faq.routes.js.map
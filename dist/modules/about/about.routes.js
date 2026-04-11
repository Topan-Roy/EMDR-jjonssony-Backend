"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const about_controller_1 = require("./about.controller");
const authMiddleware_1 = require("../../middleware/authMiddleware");
const validate_1 = require("../../middleware/validate");
const about_validation_1 = require("./about.validation");
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: About
 *   description: CMS - About Us Content
 */
/**
 * @swagger
 * /api/about:
 *   get:
 *     summary: Get About Us information
 *     tags: [About]
 *     responses:
 *       200:
 *         description: About Us content retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data:
 *                   type: object
 *                   properties:
 *                     overview: { type: string, example: "<h1>Welcome to MY-EMDR</h1><p>We are a <b>leading</b> health platform.</p>" }
 *                     sections:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           title: { type: string, example: "Our Mission" }
 *                           content: { type: string, example: "<ul><li>Accessible therapy.</li><li>Scientifically backed tools.</li></ul>" }
 *                           order: { type: integer, example: 1 }
 */
router.get('/', about_controller_1.aboutController.get);
// ADMIN ONLY
/**
 * @swagger
 * /api/about:
 *   post:
 *     summary: Create About Us content (Admin Only)
 *     tags: [About]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [overview, sections]
 *             properties:
 *               overview: { type: string, example: "<h1>Welcome</h1><p>Our journey began in 2023.</p>" }
 *               sections:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required: [title, content, order]
 *                   properties:
 *                     title: { type: string, example: "Our Story" }
 *                     content: { type: string, example: "<p>We started with a <i>simple</i> vision.</p>" }
 *                     order: { type: integer, example: 1 }
 *     responses:
 *       201:
 *         description: Content created
 */
router.post('/', authMiddleware_1.authenticate, authMiddleware_1.requireAdmin, (0, validate_1.validate)(about_validation_1.aboutUsSchema), about_controller_1.aboutController.create);
/**
 * @swagger
 * /api/about:
 *   put:
 *     summary: Update About Us content (Admin Only)
 *     tags: [About]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [overview, sections]
 *             properties:
 *               overview: { type: string, example: "<h2>Updated Mission</h2><p>Refined for 50+ countries.</p>" }
 *               sections:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required: [title, content, order]
 *                   properties:
 *                     title: { type: string, example: "Global Impact" }
 *                     content: { type: string, example: "<p>Expanding to <u>multilingual</u> support.</p>" }
 *                     order: { type: integer, example: 2 }
 *     responses:
 *       200:
 *         description: Content updated
 */
router.put('/', authMiddleware_1.authenticate, authMiddleware_1.requireAdmin, (0, validate_1.validate)(about_validation_1.aboutUsSchema), about_controller_1.aboutController.update);
exports.default = router;
//# sourceMappingURL=about.routes.js.map
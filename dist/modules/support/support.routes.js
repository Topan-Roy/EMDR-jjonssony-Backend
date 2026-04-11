"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const support_controller_1 = require("./support.controller");
const authMiddleware_1 = require("../../middleware/authMiddleware");
const validate_1 = require("../../middleware/validate");
const support_validation_1 = require("./support.validation");
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Support
 *   description: User Support Tickets and Complaints
 */
// ── USER ROUTES ───────────────────────────────────────────
/**
 * @swagger
 * /api/support/tickets:
 *   post:
 *     summary: Submit a support ticket/complaint
 *     tags: [Support]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [category, message]
 *             properties:
 *               category: { type: string, example: "Technical Issue" }
 *               message: { type: string, example: "I cannot update my profile picture." }
 *               priority: { type: string, enum: [low, medium, high], default: medium }
 *     responses:
 *       201:
 *         description: Ticket submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id: { type: string, example: "60d0fe4f5311236168a109ca" }
 *                     userId: { type: string, example: "60d0fe2f5311236168a109c9" }
 *                     category: { type: string, example: "Technical Issue" }
 *                     message: { type: string, example: "I cannot update my profile picture." }
 *                     status: { type: string, example: "open" }
 *                     priority: { type: string, example: "medium" }
 *                     createdAt: { type: string, example: "2023-10-01T10:00:00Z" }
 */
router.post('/tickets', authMiddleware_1.authenticate, (0, validate_1.validate)(support_validation_1.createTicketSchema), support_controller_1.supportController.create);
/**
 * @swagger
 * /api/support/tickets/my:
 *   get:
 *     summary: Get my support tickets
 *     tags: [Support]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user tickets
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
 *                       _id: { type: string, example: "60d0fe4f5311236168a109ca" }
 *                       category: { type: string, example: "General" }
 *                       status: { type: string, example: "resolved" }
 *                       adminResponse: { type: string, example: "Your issue has been fixed." }
 */
router.get('/tickets/my', authMiddleware_1.authenticate, support_controller_1.supportController.getMyTickets);
/**
 * @swagger
 * /api/support/tickets/{id}:
 *   get:
 *     summary: Get ticket details by ID
 *     tags: [Support]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Ticket details retrieved
 */
router.get('/tickets/:id', authMiddleware_1.authenticate, (0, validate_1.validate)(support_validation_1.idParamSchema), support_controller_1.supportController.getById);
// ── ADMIN ROUTES ──────────────────────────────────────────
// All routes below require Admin
router.use(authMiddleware_1.authenticate, authMiddleware_1.requireAdmin);
/**
 * @swagger
 * /api/support/admin/tickets:
 *   get:
 *     summary: Get all support tickets (Admin Only)
 *     tags: [Support]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema: { type: string, enum: [open, in-progress, resolved, closed] }
 *       - in: query
 *         name: priority
 *         schema: { type: string, enum: [low, medium, high] }
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *     responses:
 *       200:
 *         description: Paginated list of tickets
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data:
 *                   type: object
 *                   properties:
 *                     tickets:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id: { type: string, example: "60d0fe4f5311236168a109ca" }
 *                           userId: { type: object, properties: { firstName: { type: string, example: "John" }, email: { type: string, example: "john@example.com" } } }
 *                           category: { type: string, example: "Billing" }
 *                           status: { type: string, example: "open" }
 *                     pagination:
 *                       type: object
 *                       properties:
 *                         total: { type: integer, example: 50 }
 *                         totalPages: { type: integer, example: 5 }
 */
router.get('/admin/tickets', (0, validate_1.validate)(support_validation_1.adminQuerySchema), support_controller_1.supportController.getAllAdmin);
/**
 * @swagger
 * /api/support/admin/tickets/{id}:
 *   patch:
 *     summary: Respond to a support ticket (Admin Only)
 *     tags: [Support]
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
 *             required: [response]
 *             properties:
 *               response: { type: string, example: "We have fixed the issue. Please try again." }
 *               status: { type: string, enum: [in-progress, resolved, closed], default: resolved }
 *     responses:
 *       200:
 *         description: Ticket updated with response
 */
router.patch('/admin/tickets/:id', (0, validate_1.validate)(support_validation_1.respondTicketSchema), support_controller_1.supportController.respond);
exports.default = router;
//# sourceMappingURL=support.routes.js.map
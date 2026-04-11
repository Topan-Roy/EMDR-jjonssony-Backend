"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const chat_controller_1 = require("./chat.controller");
const authMiddleware_1 = require("../../middleware/authMiddleware");
const router = (0, express_1.Router)();
// Rate limit — 30 messages per minute per user
const chatLimiter = (0, express_rate_limit_1.default)({
    windowMs: 60 * 1000,
    max: 30,
    keyGenerator: (req) => req.user?.userId ?? req.ip,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, error: { code: 'TOO_MANY_REQUESTS', message: 'Too many messages. Slow down.' } },
});
router.use(authMiddleware_1.authenticate);
/**
 * @swagger
 * tags:
 *   name: Chat
 *   description: Real-time Messaging and Support
 */
/**
 * @swagger
 * /api/chat/conversation:
 *   post:
 *     summary: Get or create a conversation with Admin/User
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId: { type: string, description: "Required for Admin to start chat with a user" }
 *     responses:
 *       200:
 *         description: Conversation retrieved/created
 */
router.post('/conversation', chat_controller_1.chatController.getOrCreateConversation);
/**
 * @swagger
 * /api/chat/conversation/{conversationId}/send:
 *   post:
 *     summary: Send a message in a conversation
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: conversationId
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [content]
 *             properties:
 *               content: { type: string, example: "Hello!" }
 *               messageType: { type: string, enum: [text, image, file], default: "text" }
 *     responses:
 *       201:
 *         description: Message sent
 */
router.post('/conversation/:conversationId/send', chatLimiter, chat_controller_1.chatController.sendMessage);
/**
 * @swagger
 * /api/chat/conversation/{conversationId}/messages:
 *   get:
 *     summary: Get message history for a conversation
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: conversationId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: List of messages
 */
router.get('/conversation/:conversationId/messages', chat_controller_1.chatController.getMessages);
/**
 * @swagger
 * /api/chat/conversation/{conversationId}/unread:
 *   get:
 *     summary: Get unread message count
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: conversationId
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Unread count
 */
router.get('/conversation/:conversationId/unread', chat_controller_1.chatController.getUnreadCount);
/**
 * @swagger
 * /api/chat/messages/{id}/me:
 *   delete:
 *     summary: Delete message for myself only
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Message deleted for me
 */
router.delete('/messages/:id/me', chat_controller_1.chatController.deleteForMe);
/**
 * @swagger
 * /api/chat/messages/{id}/everyone:
 *   delete:
 *     summary: Unsend/Delete message for everyone
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Message unsent successfully
 */
router.delete('/messages/:id/everyone', chat_controller_1.chatController.deleteForEveryone);
/**
 * @swagger
 * /api/chat/admin/conversations:
 *   get:
 *     summary: Get all active conversations (Admin Only)
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of conversations
 */
router.get('/admin/conversations', authMiddleware_1.requireAdmin, chat_controller_1.chatController.getAllConversations);
/**
 * @swagger
 * /api/chat/admin/messages/{id}:
 *   delete:
 *     summary: Permanently delete any message (Admin Only)
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Message deleted by admin
 */
router.delete('/admin/messages/:id', authMiddleware_1.requireAdmin, chat_controller_1.chatController.adminDeleteMessage);
exports.default = router;
//# sourceMappingURL=chat.routes.js.map
import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { chatController as ctrl } from './chat.controller';
import { authenticate, requireAdmin } from '../../middleware/authMiddleware';

const router = Router();

// Rate limit — 30 messages per minute per user
const chatLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  keyGenerator: (req: any) => req.user?.userId ?? req.ip,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: { code: 'TOO_MANY_REQUESTS', message: 'Too many messages. Slow down.' } },
});

router.use(authenticate);

// ── STEP 1: Get or create conversation ───────────────────
// User:  POST /chat/conversation          → auto-finds admin
// Admin: POST /chat/conversation { userId } → finds specific user
router.post('/conversation', ctrl.getOrCreateConversation);

// ── STEP 2: Send & receive messages ──────────────────────
router.post  ('/conversation/:conversationId/send',     chatLimiter, ctrl.sendMessage);
router.get   ('/conversation/:conversationId/messages',              ctrl.getMessages);
router.get   ('/conversation/:conversationId/unread',                ctrl.getUnreadCount);

// ── Delete ────────────────────────────────────────────────
router.delete('/messages/:id/me',                                    ctrl.deleteForMe);
router.delete('/messages/:id/everyone',                              ctrl.deleteForEveryone);

// ── ADMIN only ────────────────────────────────────────────
router.get   ('/admin/conversations',   requireAdmin, ctrl.getAllConversations);
router.delete('/admin/messages/:id',    requireAdmin, ctrl.adminDeleteMessage);

export default router;

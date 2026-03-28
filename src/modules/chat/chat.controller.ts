import { Request, Response, NextFunction } from 'express';
import { chatService } from './chat.service';
import { AuthRequest } from '../../middleware/authMiddleware';
import { uploadChatImage } from '../../middleware/upload';
import { ApiError } from '../../utils/ApiError';

// ── Helpers ──────────────────────────────────────────────

const respond = <T>(res: Response, data: T, status = 200): void => {
  res.status(status).json({ success: true, data, meta: { timestamp: new Date().toISOString() } });
};

const parsePagination = (query: Request['query']) => ({
  page:  Math.max(1,  parseInt(String(query.page  ?? '1'),  10) || 1),
  limit: Math.min(50, Math.max(1, parseInt(String(query.limit ?? '20'), 10) || 20)),
});

const getUserId = (req: AuthRequest): string => {
  const userId = req.user?.userId;
  if (!userId) throw ApiError.unauthorized('Authentication required');
  return userId;
};

const getRole = (req: AuthRequest): 'user' | 'admin' =>
  req.user?.role === 'admin' ? 'admin' : 'user';

const isValidObjectId = (id: string) => /^[a-f\d]{24}$/i.test(id);

const withChatUpload = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
  handler: (imageBuffer?: Buffer) => Promise<void>
): void => {
  uploadChatImage(req as any, res, async (err) => {
    if (err) return next(err);
    try {
      const files = (req as any).files as Record<string, Express.Multer.File[]> | undefined;
      const imageBuffer = files?.['image']?.[0]?.buffer;
      await handler(imageBuffer);
    } catch (e) { next(e); }
  });
};

// ── Controller ───────────────────────────────────────────
export const chatController = {

  // STEP 1 — Get or create conversation
  // User: POST /chat/conversation          → auto-finds admin
  // Admin: POST /chat/conversation { userId } → finds specific user
  getOrCreateConversation: async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const requesterId   = getUserId(req);
      const requesterRole = getRole(req);
      const targetUserId  = req.body.userId as string | undefined;

      if (requesterRole === 'admin' && targetUserId && !isValidObjectId(targetUserId)) {
        throw ApiError.validationError('Invalid user ID', 'userId');
      }

      const data = await chatService.getOrCreateConversation(requesterId, requesterRole, targetUserId);
      respond(res, data, 201);
    } catch (e) { next(e); }
  },

  // STEP 2 — Send message using conversationId
  sendMessage: (req: AuthRequest, res: Response, next: NextFunction): void => {
    withChatUpload(req, res, next, async (imageBuffer) => {
      const senderId = getUserId(req);
      const senderRole = getRole(req);
      const { conversationId } = req.params;

      if (!isValidObjectId(conversationId)) throw ApiError.validationError('Invalid conversation ID', 'conversationId');

      const type = (req.body.type as 'text' | 'image') ?? 'text';
      const text = req.body.text as string | undefined;

      const data = await chatService.sendMessage(conversationId, senderId, senderRole, { text, type }, imageBuffer);
      respond(res, data, 201);
    });
  },

  // GET messages by conversationId
  getMessages: async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const requesterId = getUserId(req);
      const { conversationId } = req.params;
      if (!isValidObjectId(conversationId)) throw ApiError.validationError('Invalid conversation ID', 'conversationId');
      const { page, limit } = parsePagination(req.query);
      respond(res, await chatService.getMessages(conversationId, requesterId, page, limit));
    } catch (e) { next(e); }
  },

  // GET unread count
  getUnreadCount: async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const requesterId = getUserId(req);
      const { conversationId } = req.params;
      if (!isValidObjectId(conversationId)) throw ApiError.validationError('Invalid conversation ID', 'conversationId');
      respond(res, await chatService.getUnreadCount(conversationId, requesterId));
    } catch (e) { next(e); }
  },

  // ADMIN — all conversations
  getAllConversations: async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const adminId = getUserId(req);
      const { page, limit } = parsePagination(req.query);
      respond(res, await chatService.getAllConversations(adminId, page, limit));
    } catch (e) { next(e); }
  },

  // Delete for me
  deleteForMe: async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      if (!isValidObjectId(id)) throw ApiError.validationError('Invalid message ID', 'id');
      respond(res, await chatService.deleteForMe(id, getUserId(req)));
    } catch (e) { next(e); }
  },

  // Delete for everyone
  deleteForEveryone: async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      if (!isValidObjectId(id)) throw ApiError.validationError('Invalid message ID', 'id');
      respond(res, await chatService.deleteForEveryone(id, getUserId(req)));
    } catch (e) { next(e); }
  },

  // Admin delete
  adminDeleteMessage: async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      if (!isValidObjectId(id)) throw ApiError.validationError('Invalid message ID', 'id');
      respond(res, await chatService.adminDeleteMessage(id));
    } catch (e) { next(e); }
  },
};

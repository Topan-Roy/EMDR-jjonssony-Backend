"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatController = void 0;
const chat_service_1 = require("./chat.service");
const upload_1 = require("../../middleware/upload");
const ApiError_1 = require("../../utils/ApiError");
// ── Helpers ──────────────────────────────────────────────
const respond = (res, data, status = 200) => {
    res.status(status).json({ success: true, data, meta: { timestamp: new Date().toISOString() } });
};
const parsePagination = (query) => ({
    page: Math.max(1, parseInt(String(query.page ?? '1'), 10) || 1),
    limit: Math.min(50, Math.max(1, parseInt(String(query.limit ?? '20'), 10) || 20)),
});
const getUserId = (req) => {
    const userId = req.user?.userId;
    if (!userId)
        throw ApiError_1.ApiError.unauthorized('Authentication required');
    return userId;
};
const getRole = (req) => req.user?.role === 'admin' ? 'admin' : 'user';
const isValidObjectId = (id) => /^[a-f\d]{24}$/i.test(id);
const withChatUpload = (req, res, next, handler) => {
    (0, upload_1.uploadChatImage)(req, res, async (err) => {
        if (err)
            return next(err);
        try {
            const files = req.files;
            const imageBuffer = files?.['image']?.[0]?.buffer;
            await handler(imageBuffer);
        }
        catch (e) {
            next(e);
        }
    });
};
// ── Controller ───────────────────────────────────────────
exports.chatController = {
    // STEP 1 — Get or create conversation
    // User: POST /chat/conversation          → auto-finds admin
    // Admin: POST /chat/conversation { userId } → finds specific user
    getOrCreateConversation: async (req, res, next) => {
        try {
            const requesterId = getUserId(req);
            const requesterRole = getRole(req);
            const targetUserId = req.body.userId;
            if (requesterRole === 'admin' && targetUserId && !isValidObjectId(targetUserId)) {
                throw ApiError_1.ApiError.validationError('Invalid user ID', 'userId');
            }
            const data = await chat_service_1.chatService.getOrCreateConversation(requesterId, requesterRole, targetUserId);
            respond(res, data, 201);
        }
        catch (e) {
            next(e);
        }
    },
    // STEP 2 — Send message using conversationId
    sendMessage: (req, res, next) => {
        withChatUpload(req, res, next, async (imageBuffer) => {
            const senderId = getUserId(req);
            const senderRole = getRole(req);
            const { conversationId } = req.params;
            if (!isValidObjectId(conversationId))
                throw ApiError_1.ApiError.validationError('Invalid conversation ID', 'conversationId');
            const type = req.body.type ?? 'text';
            const text = req.body.text;
            const data = await chat_service_1.chatService.sendMessage(conversationId, senderId, senderRole, { text, type }, imageBuffer);
            respond(res, data, 201);
        });
    },
    // GET messages by conversationId
    getMessages: async (req, res, next) => {
        try {
            const requesterId = getUserId(req);
            const { conversationId } = req.params;
            if (!isValidObjectId(conversationId))
                throw ApiError_1.ApiError.validationError('Invalid conversation ID', 'conversationId');
            const { page, limit } = parsePagination(req.query);
            respond(res, await chat_service_1.chatService.getMessages(conversationId, requesterId, page, limit));
        }
        catch (e) {
            next(e);
        }
    },
    // GET unread count
    getUnreadCount: async (req, res, next) => {
        try {
            const requesterId = getUserId(req);
            const { conversationId } = req.params;
            if (!isValidObjectId(conversationId))
                throw ApiError_1.ApiError.validationError('Invalid conversation ID', 'conversationId');
            respond(res, await chat_service_1.chatService.getUnreadCount(conversationId, requesterId));
        }
        catch (e) {
            next(e);
        }
    },
    // ADMIN — all conversations
    getAllConversations: async (req, res, next) => {
        try {
            const adminId = getUserId(req);
            const { page, limit } = parsePagination(req.query);
            respond(res, await chat_service_1.chatService.getAllConversations(adminId, page, limit));
        }
        catch (e) {
            next(e);
        }
    },
    // Delete for me
    deleteForMe: async (req, res, next) => {
        try {
            const { id } = req.params;
            if (!isValidObjectId(id))
                throw ApiError_1.ApiError.validationError('Invalid message ID', 'id');
            respond(res, await chat_service_1.chatService.deleteForMe(id, getUserId(req)));
        }
        catch (e) {
            next(e);
        }
    },
    // Delete for everyone
    deleteForEveryone: async (req, res, next) => {
        try {
            const { id } = req.params;
            if (!isValidObjectId(id))
                throw ApiError_1.ApiError.validationError('Invalid message ID', 'id');
            respond(res, await chat_service_1.chatService.deleteForEveryone(id, getUserId(req)));
        }
        catch (e) {
            next(e);
        }
    },
    // Admin delete
    adminDeleteMessage: async (req, res, next) => {
        try {
            const { id } = req.params;
            if (!isValidObjectId(id))
                throw ApiError_1.ApiError.validationError('Invalid message ID', 'id');
            respond(res, await chat_service_1.chatService.adminDeleteMessage(id));
        }
        catch (e) {
            next(e);
        }
    },
};
//# sourceMappingURL=chat.controller.js.map
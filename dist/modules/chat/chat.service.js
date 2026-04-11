"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatService = void 0;
const chat_model_1 = require("./chat.model");
const auth_model_1 = require("../auth/auth.model");
const ApiError_1 = require("../../utils/ApiError");
const uploadImage_1 = require("../../utils/uploadImage");
const logger_1 = require("../../config/logger");
// ── Helpers ──────────────────────────────────────────────
function paginationMeta(total, page, limit) {
    return { total, page, limit, totalPages: Math.ceil(total / limit), hasNextPage: page * limit < total };
}
async function getAdmin() {
    const admin = await auth_model_1.User.findOne({ role: 'admin', isDeleted: false }).select('_id').lean();
    if (!admin)
        throw ApiError_1.ApiError.notFound('Admin not found');
    return admin;
}
// ── Service ──────────────────────────────────────────────
exports.chatService = {
    // STEP 1 — Get or create conversation using userId + adminId
    // Both user and admin call this to get the conversationId
    async getOrCreateConversation(requesterId, requesterRole, targetUserId) {
        let userId;
        let adminId;
        if (requesterRole === 'user') {
            // User calls this — admin is auto-fetched
            const admin = await getAdmin();
            userId = requesterId;
            adminId = admin._id.toString();
        }
        else {
            // Admin calls this — must provide targetUserId
            if (!targetUserId)
                throw ApiError_1.ApiError.validationError('userId is required for admin', 'userId');
            userId = targetUserId;
            adminId = requesterId;
        }
        // Find existing or create new
        let conv = await chat_model_1.Conversation.findOne({ userId, adminId });
        if (!conv) {
            conv = await chat_model_1.Conversation.create({ userId, adminId });
            logger_1.logger.info('Conversation created', { userId, adminId });
        }
        return {
            conversationId: conv._id.toString(),
            userId: conv.userId.toString(),
            adminId: conv.adminId.toString(),
            unreadByAdmin: conv.unreadByAdmin,
            unreadByUser: conv.unreadByUser,
            lastMessage: conv.lastMessage ?? null,
            lastMessageAt: conv.lastMessageAt ?? null,
            createdAt: conv.createdAt,
        };
    },
    // STEP 2 — Send message using conversationId + token
    async sendMessage(conversationId, senderId, senderRole, data, imageBuffer) {
        // Verify conversation exists and sender belongs to it
        const conv = await chat_model_1.Conversation.findById(conversationId);
        if (!conv)
            throw ApiError_1.ApiError.notFound('Conversation not found');
        // Security: verify sender is part of this conversation
        const isParticipant = conv.userId.toString() === senderId ||
            conv.adminId.toString() === senderId;
        if (!isParticipant)
            throw ApiError_1.ApiError.forbidden('You are not part of this conversation');
        if (data.type === 'text' && !data.text?.trim()) {
            throw ApiError_1.ApiError.validationError('text is required for text messages', 'text');
        }
        if (data.type === 'image' && !imageBuffer) {
            throw ApiError_1.ApiError.validationError('Image file is required', 'image');
        }
        let imageUrl;
        if (data.type === 'image' && imageBuffer) {
            imageUrl = await (0, uploadImage_1.uploadToCloudinary)(imageBuffer, 'my-emdr/chat', `chat_${senderId}_${Date.now()}`);
        }
        const message = await chat_model_1.Message.create({
            conversationId,
            senderId,
            senderRole,
            type: data.type,
            text: data.text?.trim(),
            imageUrl,
        });
        // Update conversation meta + increment unread for the OTHER party
        await chat_model_1.Conversation.findByIdAndUpdate(conversationId, {
            lastMessage: data.type === 'image' ? '📷 Image' : data.text,
            lastMessageAt: new Date(),
            lastMessageType: data.type,
            $inc: senderRole === 'user'
                ? { unreadByAdmin: 1 }
                : { unreadByUser: 1 },
        });
        logger_1.logger.info('Message sent', { conversationId, senderId, senderRole, type: data.type });
        return message;
    },
    // GET messages by conversationId (both user and admin)
    async getMessages(conversationId, requesterId, page, limit) {
        const conv = await chat_model_1.Conversation.findById(conversationId);
        if (!conv)
            throw ApiError_1.ApiError.notFound('Conversation not found');
        // Security: only participants can read
        const isParticipant = conv.userId.toString() === requesterId ||
            conv.adminId.toString() === requesterId;
        if (!isParticipant)
            throw ApiError_1.ApiError.forbidden('You are not part of this conversation');
        const requesterRole = conv.userId.toString() === requesterId ? 'user' : 'admin';
        const skip = (page - 1) * limit;
        // Filter out deleted messages
        const filter = {
            conversationId,
            isDeletedForEveryone: false,
            deletedFor: { $nin: [requesterId] },
        };
        const [messages, total] = await Promise.all([
            chat_model_1.Message.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
            chat_model_1.Message.countDocuments(filter),
            // Auto-mark other party's messages as read
            chat_model_1.Message.updateMany({ conversationId, senderRole: requesterRole === 'user' ? 'admin' : 'user', isRead: false }, { isRead: true, readAt: new Date() }),
            chat_model_1.Conversation.findByIdAndUpdate(conversationId, requesterRole === 'user' ? { unreadByUser: 0 } : { unreadByAdmin: 0 }),
        ]);
        return { messages: messages.reverse(), ...paginationMeta(total, page, limit) };
    },
    // GET unread count for requester
    async getUnreadCount(conversationId, requesterId) {
        const conv = await chat_model_1.Conversation.findById(conversationId).lean();
        if (!conv)
            throw ApiError_1.ApiError.notFound('Conversation not found');
        const isUser = conv.userId.toString() === requesterId;
        return { unreadCount: isUser ? conv.unreadByUser : conv.unreadByAdmin };
    },
    // ADMIN — get all conversations list
    async getAllConversations(adminId, page, limit) {
        const skip = (page - 1) * limit;
        const [conversations, total] = await Promise.all([
            chat_model_1.Conversation.find({ adminId })
                .sort({ lastMessageAt: -1 })
                .skip(skip)
                .limit(limit)
                .populate('userId', 'firstName lastName email avatar')
                .lean(),
            chat_model_1.Conversation.countDocuments({ adminId }),
        ]);
        return { conversations, ...paginationMeta(total, page, limit) };
    },
    // Delete for me
    async deleteForMe(messageId, userId) {
        const message = await chat_model_1.Message.findById(messageId);
        if (!message)
            throw ApiError_1.ApiError.notFound('Message not found');
        if (message.senderId.toString() !== userId)
            throw ApiError_1.ApiError.forbidden('You can only delete your own messages');
        await chat_model_1.Message.findByIdAndUpdate(messageId, { $addToSet: { deletedFor: userId } });
        logger_1.logger.info('Message deleted for me', { messageId, userId });
        return { message: 'Message deleted for you' };
    },
    // Delete for everyone
    async deleteForEveryone(messageId, userId) {
        const message = await chat_model_1.Message.findById(messageId);
        if (!message)
            throw ApiError_1.ApiError.notFound('Message not found');
        if (message.senderId.toString() !== userId)
            throw ApiError_1.ApiError.forbidden('You can only delete your own messages');
        if (message.isRead) {
            await chat_model_1.Message.findByIdAndUpdate(messageId, {
                isDeletedForEveryone: true,
                deletedForEveryoneAt: new Date(),
                $unset: { text: '', imageUrl: '' },
            });
        }
        else {
            await chat_model_1.Message.findByIdAndDelete(messageId);
        }
        return { message: 'Message deleted for everyone' };
    },
    // Admin delete
    async adminDeleteMessage(messageId) {
        const message = await chat_model_1.Message.findById(messageId);
        if (!message)
            throw ApiError_1.ApiError.notFound('Message not found');
        await chat_model_1.Message.findByIdAndUpdate(messageId, {
            isDeletedForEveryone: true,
            deletedForEveryoneAt: new Date(),
            $unset: { text: '', imageUrl: '' },
        });
        return { message: 'Message deleted' };
    },
};
//# sourceMappingURL=chat.service.js.map
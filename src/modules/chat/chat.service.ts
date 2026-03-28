import { Conversation, Message } from './chat.model';
import { User } from '../auth/auth.model';
import { ApiError } from '../../utils/ApiError';
import { uploadToCloudinary } from '../../utils/uploadImage';
import { logger } from '../../config/logger';

// ── Helpers ──────────────────────────────────────────────

function paginationMeta(total: number, page: number, limit: number) {
  return { total, page, limit, totalPages: Math.ceil(total / limit), hasNextPage: page * limit < total };
}

async function getAdmin() {
  const admin = await User.findOne({ role: 'admin', isDeleted: false }).select('_id').lean();
  if (!admin) throw ApiError.notFound('Admin not found');
  return admin;
}

// ── Service ──────────────────────────────────────────────
export const chatService = {

  // STEP 1 — Get or create conversation using userId + adminId
  // Both user and admin call this to get the conversationId
  async getOrCreateConversation(requesterId: string, requesterRole: 'user' | 'admin', targetUserId?: string) {
    let userId: string;
    let adminId: string;

    if (requesterRole === 'user') {
      // User calls this — admin is auto-fetched
      const admin = await getAdmin();
      userId  = requesterId;
      adminId = admin._id.toString();
    } else {
      // Admin calls this — must provide targetUserId
      if (!targetUserId) throw ApiError.validationError('userId is required for admin', 'userId');
      userId  = targetUserId;
      adminId = requesterId;
    }

    // Find existing or create new
    let conv = await Conversation.findOne({ userId, adminId });
    if (!conv) {
      conv = await Conversation.create({ userId, adminId });
      logger.info('Conversation created', { userId, adminId });
    }

    return {
      conversationId: conv._id.toString(),
      userId:         conv.userId.toString(),
      adminId:        conv.adminId.toString(),
      unreadByAdmin:  conv.unreadByAdmin,
      unreadByUser:   conv.unreadByUser,
      lastMessage:    conv.lastMessage ?? null,
      lastMessageAt:  conv.lastMessageAt ?? null,
      createdAt:      conv.createdAt,
    };
  },

  // STEP 2 — Send message using conversationId + token
  async sendMessage(
    conversationId: string,
    senderId: string,
    senderRole: 'user' | 'admin',
    data: { text?: string; type: 'text' | 'image' },
    imageBuffer?: Buffer
  ) {
    // Verify conversation exists and sender belongs to it
    const conv = await Conversation.findById(conversationId);
    if (!conv) throw ApiError.notFound('Conversation not found');

    // Security: verify sender is part of this conversation
    const isParticipant =
      conv.userId.toString()  === senderId ||
      conv.adminId.toString() === senderId;

    if (!isParticipant) throw ApiError.forbidden('You are not part of this conversation');

    if (data.type === 'text' && !data.text?.trim()) {
      throw ApiError.validationError('text is required for text messages', 'text');
    }
    if (data.type === 'image' && !imageBuffer) {
      throw ApiError.validationError('Image file is required', 'image');
    }

    let imageUrl: string | undefined;
    if (data.type === 'image' && imageBuffer) {
      imageUrl = await uploadToCloudinary(
        imageBuffer,
        'my-emdr/chat',
        `chat_${senderId}_${Date.now()}`
      );
    }

    const message = await Message.create({
      conversationId,
      senderId,
      senderRole,
      type:     data.type,
      text:     data.text?.trim(),
      imageUrl,
    });

    // Update conversation meta + increment unread for the OTHER party
    await Conversation.findByIdAndUpdate(conversationId, {
      lastMessage:     data.type === 'image' ? '📷 Image' : data.text,
      lastMessageAt:   new Date(),
      lastMessageType: data.type,
      $inc: senderRole === 'user'
        ? { unreadByAdmin: 1 }
        : { unreadByUser: 1 },
    });

    logger.info('Message sent', { conversationId, senderId, senderRole, type: data.type });
    return message;
  },

  // GET messages by conversationId (both user and admin)
  async getMessages(conversationId: string, requesterId: string, page: number, limit: number) {
    const conv = await Conversation.findById(conversationId);
    if (!conv) throw ApiError.notFound('Conversation not found');

    // Security: only participants can read
    const isParticipant =
      conv.userId.toString()  === requesterId ||
      conv.adminId.toString() === requesterId;
    if (!isParticipant) throw ApiError.forbidden('You are not part of this conversation');

    const requesterRole = conv.userId.toString() === requesterId ? 'user' : 'admin';
    const skip = (page - 1) * limit;

    // Filter out deleted messages
    const filter = {
      conversationId,
      isDeletedForEveryone: false,
      deletedFor: { $nin: [requesterId] },
    };

    const [messages, total] = await Promise.all([
      Message.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Message.countDocuments(filter),
      // Auto-mark other party's messages as read
      Message.updateMany(
        { conversationId, senderRole: requesterRole === 'user' ? 'admin' : 'user', isRead: false },
        { isRead: true, readAt: new Date() }
      ),
      Conversation.findByIdAndUpdate(conversationId,
        requesterRole === 'user' ? { unreadByUser: 0 } : { unreadByAdmin: 0 }
      ),
    ]);

    return { messages: messages.reverse(), ...paginationMeta(total, page, limit) };
  },

  // GET unread count for requester
  async getUnreadCount(conversationId: string, requesterId: string) {
    const conv = await Conversation.findById(conversationId).lean();
    if (!conv) throw ApiError.notFound('Conversation not found');

    const isUser = conv.userId.toString() === requesterId;
    return { unreadCount: isUser ? conv.unreadByUser : conv.unreadByAdmin };
  },

  // ADMIN — get all conversations list
  async getAllConversations(adminId: string, page: number, limit: number) {
    const skip = (page - 1) * limit;
    const [conversations, total] = await Promise.all([
      Conversation.find({ adminId })
        .sort({ lastMessageAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('userId', 'firstName lastName email avatar')
        .lean(),
      Conversation.countDocuments({ adminId }),
    ]);
    return { conversations, ...paginationMeta(total, page, limit) };
  },

  // Delete for me
  async deleteForMe(messageId: string, userId: string) {
    const message = await Message.findById(messageId);
    if (!message) throw ApiError.notFound('Message not found');
    if (message.senderId.toString() !== userId) throw ApiError.forbidden('You can only delete your own messages');

    await Message.findByIdAndUpdate(messageId, { $addToSet: { deletedFor: userId } });
    logger.info('Message deleted for me', { messageId, userId });
    return { message: 'Message deleted for you' };
  },

  // Delete for everyone
  async deleteForEveryone(messageId: string, userId: string) {
    const message = await Message.findById(messageId);
    if (!message) throw ApiError.notFound('Message not found');
    if (message.senderId.toString() !== userId) throw ApiError.forbidden('You can only delete your own messages');

    if (message.isRead) {
      await Message.findByIdAndUpdate(messageId, {
        isDeletedForEveryone: true,
        deletedForEveryoneAt: new Date(),
        $unset: { text: '', imageUrl: '' },
      });
    } else {
      await Message.findByIdAndDelete(messageId);
    }
    return { message: 'Message deleted for everyone' };
  },

  // Admin delete
  async adminDeleteMessage(messageId: string) {
    const message = await Message.findById(messageId);
    if (!message) throw ApiError.notFound('Message not found');
    await Message.findByIdAndUpdate(messageId, {
      isDeletedForEveryone: true,
      deletedForEveryoneAt: new Date(),
      $unset: { text: '', imageUrl: '' },
    });
    return { message: 'Message deleted' };
  },
};

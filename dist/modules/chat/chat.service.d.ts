export declare const chatService: {
    getOrCreateConversation(requesterId: string, requesterRole: "user" | "admin", targetUserId?: string): Promise<{
        conversationId: string;
        userId: string;
        adminId: string;
        unreadByAdmin: number;
        unreadByUser: number;
        lastMessage: string | null;
        lastMessageAt: Date | null;
        createdAt: Date;
    }>;
    sendMessage(conversationId: string, senderId: string, senderRole: "user" | "admin", data: {
        text?: string;
        type: "text" | "image";
    }, imageBuffer?: Buffer): Promise<import("mongoose").Document<unknown, {}, import("./chat.model").IMessage, {}, import("mongoose").DefaultSchemaOptions> & import("./chat.model").IMessage & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    getMessages(conversationId: string, requesterId: string, page: number, limit: number): Promise<{
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        hasNextPage: boolean;
        messages: (import("./chat.model").IMessage & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
    }>;
    getUnreadCount(conversationId: string, requesterId: string): Promise<{
        unreadCount: number;
    }>;
    getAllConversations(adminId: string, page: number, limit: number): Promise<{
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        hasNextPage: boolean;
        conversations: (import("./chat.model").IConversation & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
    }>;
    deleteForMe(messageId: string, userId: string): Promise<{
        message: string;
    }>;
    deleteForEveryone(messageId: string, userId: string): Promise<{
        message: string;
    }>;
    adminDeleteMessage(messageId: string): Promise<{
        message: string;
    }>;
};
//# sourceMappingURL=chat.service.d.ts.map
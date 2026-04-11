import mongoose, { Document } from 'mongoose';
export type MessageType = 'text' | 'image';
export type SenderRole = 'user' | 'admin';
export interface IMessage extends Document {
    conversationId: mongoose.Types.ObjectId;
    senderId: mongoose.Types.ObjectId;
    senderRole: SenderRole;
    type: MessageType;
    text?: string;
    imageUrl?: string;
    isRead: boolean;
    readAt?: Date;
    deletedFor: mongoose.Types.ObjectId[];
    isDeletedForEveryone: boolean;
    deletedForEveryoneAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}
export interface IConversation extends Document {
    userId: mongoose.Types.ObjectId;
    adminId: mongoose.Types.ObjectId;
    lastMessage?: string;
    lastMessageAt?: Date;
    lastMessageType?: MessageType;
    unreadByAdmin: number;
    unreadByUser: number;
    createdAt: Date;
    updatedAt: Date;
}
export declare const Conversation: mongoose.Model<IConversation, {}, {}, {}, mongoose.Document<unknown, {}, IConversation, {}, mongoose.DefaultSchemaOptions> & IConversation & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IConversation>;
export declare const Message: mongoose.Model<IMessage, {}, {}, {}, mongoose.Document<unknown, {}, IMessage, {}, mongoose.DefaultSchemaOptions> & IMessage & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IMessage>;
//# sourceMappingURL=chat.model.d.ts.map
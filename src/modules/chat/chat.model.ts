import mongoose, { Schema, Document } from 'mongoose';

export type MessageType = 'text' | 'image';
export type SenderRole  = 'user' | 'admin';

export interface IMessage extends Document {
  conversationId:       mongoose.Types.ObjectId;
  senderId:             mongoose.Types.ObjectId;
  senderRole:           SenderRole;
  type:                 MessageType;
  text?:                string;
  imageUrl?:            string;
  isRead:               boolean;
  readAt?:              Date;
  deletedFor:           mongoose.Types.ObjectId[];
  isDeletedForEveryone: boolean;
  deletedForEveryoneAt?: Date;
  createdAt:            Date;
  updatedAt:            Date;
}

export interface IConversation extends Document {
  userId:           mongoose.Types.ObjectId;  // the user participant
  adminId:          mongoose.Types.ObjectId;  // the admin participant
  lastMessage?:     string;
  lastMessageAt?:   Date;
  lastMessageType?: MessageType;
  unreadByAdmin:    number;
  unreadByUser:     number;
  createdAt:        Date;
  updatedAt:        Date;
}

// ── Conversation ─────────────────────────────────────────
const conversationSchema = new Schema<IConversation>(
  {
    userId:          { type: Schema.Types.ObjectId, ref: 'User', required: true },
    adminId:         { type: Schema.Types.ObjectId, ref: 'User', required: true },
    lastMessage:     { type: String, maxlength: 200 },
    lastMessageAt:   { type: Date },
    lastMessageType: { type: String, enum: ['text', 'image'] },
    unreadByAdmin:   { type: Number, default: 0, min: 0 },
    unreadByUser:    { type: Number, default: 0, min: 0 },
  },
  { timestamps: true }
);

// One conversation per user-admin pair
conversationSchema.index({ userId: 1, adminId: 1 }, { unique: true });
conversationSchema.index({ lastMessageAt: -1 });

// ── Message ──────────────────────────────────────────────
const messageSchema = new Schema<IMessage>(
  {
    conversationId:       { type: Schema.Types.ObjectId, ref: 'Conversation', required: true },
    senderId:             { type: Schema.Types.ObjectId, ref: 'User', required: true },
    senderRole:           { type: String, enum: ['user', 'admin'], required: true },
    type:                 { type: String, enum: ['text', 'image'], required: true },
    text:                 { type: String, trim: true, maxlength: 2000 },
    imageUrl:             { type: String },
    isRead:               { type: Boolean, default: false },
    readAt:               { type: Date },
    deletedFor:           [{ type: Schema.Types.ObjectId, ref: 'User' }],
    isDeletedForEveryone: { type: Boolean, default: false },
    deletedForEveryoneAt: { type: Date },
  },
  { timestamps: true }
);

messageSchema.index({ conversationId: 1, createdAt: -1 });
messageSchema.index({ conversationId: 1, isRead: 1, senderRole: 1 });
messageSchema.index({ deletedFor: 1 });

export const Conversation = mongoose.model<IConversation>('Conversation', conversationSchema);
export const Message      = mongoose.model<IMessage>('Message', messageSchema);

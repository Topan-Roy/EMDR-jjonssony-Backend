"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = exports.Conversation = void 0;
const mongoose_1 = __importStar(require("mongoose"));
// ── Conversation ─────────────────────────────────────────
const conversationSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    adminId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    lastMessage: { type: String, maxlength: 200 },
    lastMessageAt: { type: Date },
    lastMessageType: { type: String, enum: ['text', 'image'] },
    unreadByAdmin: { type: Number, default: 0, min: 0 },
    unreadByUser: { type: Number, default: 0, min: 0 },
}, { timestamps: true });
// One conversation per user-admin pair
conversationSchema.index({ userId: 1, adminId: 1 }, { unique: true });
conversationSchema.index({ lastMessageAt: -1 });
// ── Message ──────────────────────────────────────────────
const messageSchema = new mongoose_1.Schema({
    conversationId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Conversation', required: true },
    senderId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    senderRole: { type: String, enum: ['user', 'admin'], required: true },
    type: { type: String, enum: ['text', 'image'], required: true },
    text: { type: String, trim: true, maxlength: 2000 },
    imageUrl: { type: String },
    isRead: { type: Boolean, default: false },
    readAt: { type: Date },
    deletedFor: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }],
    isDeletedForEveryone: { type: Boolean, default: false },
    deletedForEveryoneAt: { type: Date },
}, { timestamps: true });
messageSchema.index({ conversationId: 1, createdAt: -1 });
messageSchema.index({ conversationId: 1, isRead: 1, senderRole: 1 });
messageSchema.index({ deletedFor: 1 });
exports.Conversation = mongoose_1.default.model('Conversation', conversationSchema);
exports.Message = mongoose_1.default.model('Message', messageSchema);
//# sourceMappingURL=chat.model.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationSchema = exports.messageIdParamSchema = exports.conversationIdParamSchema = exports.getMessagesSchema = exports.sendMessageSchema = exports.getConversationSchema = void 0;
const zod_1 = require("zod");
const objectIdSchema = (field) => zod_1.z.string().regex(/^[a-f\d]{24}$/i, `Invalid ${field} ID`);
const messageBodySchema = zod_1.z.object({
    text: zod_1.z.string().min(1).max(2000).trim().optional(),
    type: zod_1.z.enum(['text', 'image']).default('text'),
}).refine(data => data.type === 'image' || (data.type === 'text' && !!data.text), { message: 'text is required for text messages', path: ['text'] });
// Get or create conversation
exports.getConversationSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: objectIdSchema('user').optional(), // admin provides this
    }),
});
// Send message
exports.sendMessageSchema = zod_1.z.object({
    params: zod_1.z.object({ conversationId: objectIdSchema('conversation') }),
    body: messageBodySchema,
});
// Get messages
exports.getMessagesSchema = zod_1.z.object({
    params: zod_1.z.object({ conversationId: objectIdSchema('conversation') }),
    query: zod_1.z.object({
        page: zod_1.z.coerce.number().int().min(1).default(1),
        limit: zod_1.z.coerce.number().int().min(1).max(50).default(20),
    }),
});
exports.conversationIdParamSchema = zod_1.z.object({
    params: zod_1.z.object({ conversationId: objectIdSchema('conversation') }),
});
exports.messageIdParamSchema = zod_1.z.object({
    params: zod_1.z.object({ id: objectIdSchema('message') }),
});
exports.paginationSchema = zod_1.z.object({
    query: zod_1.z.object({
        page: zod_1.z.coerce.number().int().min(1).default(1),
        limit: zod_1.z.coerce.number().int().min(1).max(50).default(20),
    }),
});
//# sourceMappingURL=chat.validation.js.map
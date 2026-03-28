import { z } from 'zod';

const objectIdSchema = (field: string) =>
  z.string().regex(/^[a-f\d]{24}$/i, `Invalid ${field} ID`);

const messageBodySchema = z.object({
  text: z.string().min(1).max(2000).trim().optional(),
  type: z.enum(['text', 'image']).default('text'),
}).refine(
  data => data.type === 'image' || (data.type === 'text' && !!data.text),
  { message: 'text is required for text messages', path: ['text'] }
);

// Get or create conversation
export const getConversationSchema = z.object({
  body: z.object({
    userId: objectIdSchema('user').optional(), // admin provides this
  }),
});

// Send message
export const sendMessageSchema = z.object({
  params: z.object({ conversationId: objectIdSchema('conversation') }),
  body: messageBodySchema,
});

// Get messages
export const getMessagesSchema = z.object({
  params: z.object({ conversationId: objectIdSchema('conversation') }),
  query: z.object({
    page:  z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(50).default(20),
  }),
});

export const conversationIdParamSchema = z.object({
  params: z.object({ conversationId: objectIdSchema('conversation') }),
});

export const messageIdParamSchema = z.object({
  params: z.object({ id: objectIdSchema('message') }),
});

export const paginationSchema = z.object({
  query: z.object({
    page:  z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(50).default(20),
  }),
});

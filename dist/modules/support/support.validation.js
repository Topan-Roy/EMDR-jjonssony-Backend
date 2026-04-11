"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminQuerySchema = exports.idParamSchema = exports.respondTicketSchema = exports.createTicketSchema = void 0;
const zod_1 = require("zod");
const support_model_1 = require("./support.model");
exports.createTicketSchema = zod_1.z.object({
    body: zod_1.z.object({
        category: zod_1.z.string({ required_error: 'Category is required' }).min(2).max(100).trim(),
        message: zod_1.z.string({ required_error: 'Message is required' }).min(10).max(2000).trim(),
        priority: zod_1.z.nativeEnum(support_model_1.TicketPriority).optional(),
    }),
});
exports.respondTicketSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().regex(/^[a-f\d]{24}$/i, 'Invalid ticket ID'),
    }),
    body: zod_1.z.object({
        response: zod_1.z.string({ required_error: 'Response is required' }).min(5).max(2000).trim(),
        status: zod_1.z.nativeEnum(support_model_1.TicketStatus).optional(),
    }),
});
exports.idParamSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().regex(/^[a-f\d]{24}$/i, 'Invalid ticket ID'),
    }),
});
exports.adminQuerySchema = zod_1.z.object({
    query: zod_1.z.object({
        status: zod_1.z.nativeEnum(support_model_1.TicketStatus).optional(),
        priority: zod_1.z.nativeEnum(support_model_1.TicketPriority).optional(),
        page: zod_1.z.string().regex(/^\d+$/).transform(Number).optional(),
        limit: zod_1.z.string().regex(/^\d+$/).transform(Number).optional(),
    }),
});
//# sourceMappingURL=support.validation.js.map
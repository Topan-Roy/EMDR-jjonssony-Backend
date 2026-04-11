"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reorderSchema = exports.idParamSchema = exports.updateFaqSchema = exports.createFaqSchema = void 0;
const zod_1 = require("zod");
exports.createFaqSchema = zod_1.z.object({
    body: zod_1.z.object({
        question: zod_1.z.string({ required_error: 'Question is required' }).min(5).max(300).trim(),
        answer: zod_1.z.string({ required_error: 'Answer is required' }).min(5).max(2000).trim(),
        order: zod_1.z.number().int().min(0).optional(),
        isActive: zod_1.z.boolean().optional(),
    }),
});
exports.updateFaqSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().regex(/^[a-f\d]{24}$/i, 'Invalid FAQ ID'),
    }),
    body: zod_1.z.object({
        question: zod_1.z.string().min(5).max(300).trim().optional(),
        answer: zod_1.z.string().min(5).max(2000).trim().optional(),
        order: zod_1.z.number().int().min(0).optional(),
        isActive: zod_1.z.boolean().optional(),
    }),
});
exports.idParamSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().regex(/^[a-f\d]{24}$/i, 'Invalid FAQ ID'),
    }),
});
exports.reorderSchema = zod_1.z.object({
    body: zod_1.z.object({
        // Array of { id, order } to bulk reorder
        items: zod_1.z.array(zod_1.z.object({
            id: zod_1.z.string().regex(/^[a-f\d]{24}$/i, 'Invalid FAQ ID'),
            order: zod_1.z.number().int().min(0),
        })).min(1),
    }),
});
//# sourceMappingURL=faq.validation.js.map
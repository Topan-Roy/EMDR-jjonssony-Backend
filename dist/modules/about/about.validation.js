"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aboutUsSchema = void 0;
const zod_1 = require("zod");
exports.aboutUsSchema = zod_1.z.object({
    body: zod_1.z.object({
        overview: zod_1.z
            .string({ required_error: 'Overview is required' })
            .min(10, 'Overview must be at least 10 characters')
            .trim(),
        sections: zod_1.z
            .array(zod_1.z.object({
            title: zod_1.z.string().min(1).max(100).trim(),
            content: zod_1.z.string().min(1).trim(),
            order: zod_1.z.number().int().min(0),
        }))
            .min(1, 'At least one section is required (e.g., Mission, Vision)'),
    }),
});
//# sourceMappingURL=about.validation.js.map
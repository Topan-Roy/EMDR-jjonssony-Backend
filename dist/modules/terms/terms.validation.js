"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.idParamSchema = exports.acceptTermsSchema = exports.replaceTermsSchema = exports.updateTermsSchema = exports.createTermsSchema = void 0;
const zod_1 = require("zod");
const sectionSchema = zod_1.z.object({
    title: zod_1.z.string().min(1).max(100).trim(),
    content: zod_1.z.string().min(1).trim(), // Supports HTML/Markdown
    order: zod_1.z.number().int().min(0),
});
exports.createTermsSchema = zod_1.z.object({
    body: zod_1.z.object({
        version: zod_1.z.string().min(1, 'Version is required').trim(),
        lastUpdated: zod_1.z.string().datetime({ message: 'Invalid date format' }).optional(),
        effectiveDate: zod_1.z.string().datetime({ message: 'Invalid effective date format' }).optional(),
        changelog: zod_1.z.string().max(1000, 'Changelog too long').trim().optional(),
        sections: zod_1.z.array(sectionSchema).min(1, 'At least one section is required'),
        contactEmail: zod_1.z.string().email('Invalid contact email'),
        contactName: zod_1.z.string().min(1).max(100).trim(),
    }),
});
exports.updateTermsSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().regex(/^[a-f\d]{24}$/i, 'Invalid ID'),
    }),
    body: zod_1.z.object({
        version: zod_1.z.string().min(1).trim().optional(),
        lastUpdated: zod_1.z.string().datetime().optional(),
        effectiveDate: zod_1.z.string().datetime().optional(),
        changelog: zod_1.z.string().max(1000).trim().optional(),
        sections: zod_1.z.array(sectionSchema).min(1).optional(),
        contactEmail: zod_1.z.string().email().optional(),
        contactName: zod_1.z.string().min(1).max(100).trim().optional(),
    }),
});
// PUT — full replace, all fields required
exports.replaceTermsSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().regex(/^[a-f\d]{24}$/i, 'Invalid ID'),
    }),
    body: zod_1.z.object({
        version: zod_1.z.string().min(1, 'Version is required').trim(),
        lastUpdated: zod_1.z.string().datetime().optional(),
        effectiveDate: zod_1.z.string().datetime().optional(),
        changelog: zod_1.z.string().max(1000).trim().optional(),
        sections: zod_1.z.array(sectionSchema).min(1, 'At least one section is required'),
        contactEmail: zod_1.z.string().email('Invalid contact email'),
        contactName: zod_1.z.string().min(1).max(100).trim(),
    }),
});
exports.acceptTermsSchema = zod_1.z.object({
    body: zod_1.z.object({
        termsId: zod_1.z.string().regex(/^[a-f\d]{24}$/i, 'Invalid Terms ID'),
    }),
});
exports.idParamSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().regex(/^[a-f\d]{24}$/i, 'Invalid ID'),
    }),
});
//# sourceMappingURL=terms.validation.js.map
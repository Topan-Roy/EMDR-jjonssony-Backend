"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.idParamSchema = exports.updatePrivacySchema = exports.replacePrivacySchema = exports.createPrivacySchema = void 0;
const zod_1 = require("zod");
const sectionSchema = zod_1.z.object({
    title: zod_1.z.string().min(1).max(100).trim(),
    content: zod_1.z.string().min(1).trim(), // Supports HTML/Markdown
    order: zod_1.z.number().int().min(0),
});
const bodyBase = {
    version: zod_1.z.string().min(1, 'Version is required').trim(),
    overview: zod_1.z.string().min(10, 'Overview is required').trim(),
    effectiveDate: zod_1.z.string().datetime({ message: 'Invalid effective date' }).optional(),
    lastUpdated: zod_1.z.string().datetime({ message: 'Invalid date' }).optional(),
    changelog: zod_1.z.string().max(1000).trim().optional(),
    sections: zod_1.z.array(sectionSchema).min(1, 'At least one section is required'),
    contactEmail: zod_1.z.string().email('Invalid contact email'),
    contactName: zod_1.z.string().min(1).max(100).trim(),
};
exports.createPrivacySchema = zod_1.z.object({
    body: zod_1.z.object(bodyBase),
});
// PUT — full replace, all required
exports.replacePrivacySchema = zod_1.z.object({
    params: zod_1.z.object({ id: zod_1.z.string().regex(/^[a-f\d]{24}$/i, 'Invalid ID') }),
    body: zod_1.z.object(bodyBase),
});
// PATCH — partial update, all optional
exports.updatePrivacySchema = zod_1.z.object({
    params: zod_1.z.object({ id: zod_1.z.string().regex(/^[a-f\d]{24}$/i, 'Invalid ID') }),
    body: zod_1.z.object({
        version: zod_1.z.string().min(1).trim().optional(),
        overview: zod_1.z.string().min(10).trim().optional(),
        effectiveDate: zod_1.z.string().datetime().optional(),
        lastUpdated: zod_1.z.string().datetime().optional(),
        changelog: zod_1.z.string().max(1000).trim().optional(),
        sections: zod_1.z.array(sectionSchema).min(1).optional(),
        contactEmail: zod_1.z.string().email().optional(),
        contactName: zod_1.z.string().min(1).max(100).trim().optional(),
    }),
});
exports.idParamSchema = zod_1.z.object({
    params: zod_1.z.object({ id: zod_1.z.string().regex(/^[a-f\d]{24}$/i, 'Invalid ID') }),
});
//# sourceMappingURL=privacy.validation.js.map
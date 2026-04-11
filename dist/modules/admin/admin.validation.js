"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAdminProfileSchema = void 0;
const zod_1 = require("zod");
exports.updateAdminProfileSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({ required_error: 'Name is required' })
            .min(2, 'Name must be at least 2 characters')
            .max(61, 'Name cannot exceed 61 characters')
            .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces')
            .trim(),
        phoneNumber: zod_1.z
            .string()
            .trim()
            .regex(/^\+?[1-9]\d{6,14}$/, 'Invalid phone number. Example: +8801712345678')
            .optional(),
    }),
});
//# sourceMappingURL=admin.validation.js.map
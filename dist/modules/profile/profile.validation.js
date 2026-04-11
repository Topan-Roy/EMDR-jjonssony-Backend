"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePasswordSchema = exports.updateProfileSchema = void 0;
const zod_1 = require("zod");
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;
exports.updateProfileSchema = zod_1.z.object({
    body: zod_1.z.object({
        fullName: zod_1.z
            .string({ required_error: 'Full name is required' })
            .min(2, 'Full name must be at least 2 characters')
            .max(61, 'Full name cannot exceed 61 characters')
            .regex(/^[a-zA-Z\s]+$/, 'Full name can only contain letters and spaces')
            .trim(),
        phoneNumber: zod_1.z
            .string()
            .trim()
            .regex(/^\+?[1-9]\d{6,14}$/, 'Invalid phone number format. Example: +8801712345678')
            .optional(),
    }),
});
exports.changePasswordSchema = zod_1.z.object({
    body: zod_1.z.object({
        currentPassword: zod_1.z
            .string({ required_error: 'Current password is required' })
            .min(1, 'Current password is required'),
        newPassword: zod_1.z
            .string({ required_error: 'New password is required' })
            .min(8, 'Password must be at least 8 characters')
            .regex(passwordRegex, 'Password must contain uppercase, lowercase, number and special character'),
        confirmPassword: zod_1.z.string({ required_error: 'Confirm password is required' }),
    }).refine(data => data.newPassword === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    }).refine(data => data.currentPassword !== data.newPassword, {
        message: 'New password must be different from current password',
        path: ['newPassword'],
    }),
});
//# sourceMappingURL=profile.validation.js.map
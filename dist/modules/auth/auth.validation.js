"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleAuthSchema = exports.refreshTokenSchema = exports.logoutSchema = exports.verifyEmailWithTokenSchema = exports.sendVerificationOTPSchema = exports.recoverAccountSchema = exports.forgotPasswordSchema = exports.resendOtpSchema = exports.verifyOtpSchema = exports.loginSchema = exports.signupSchema = void 0;
const zod_1 = require("zod");
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;
exports.signupSchema = zod_1.z.object({
    body: zod_1.z.object({
        firstName: zod_1.z
            .string({ required_error: 'First name is required' })
            .min(2, 'First name must be at least 2 characters')
            .max(30, 'First name cannot exceed 30 characters')
            .regex(/^[a-zA-Z]+$/, 'First name can only contain letters'),
        lastName: zod_1.z
            .string({ required_error: 'Last name is required' })
            .min(2, 'Last name must be at least 2 characters')
            .max(30, 'Last name cannot exceed 30 characters')
            .regex(/^[a-zA-Z]+$/, 'Last name can only contain letters'),
        email: zod_1.z
            .string({ required_error: 'Email is required' })
            .email('Email is invalid')
            .toLowerCase()
            .trim(),
        password: zod_1.z
            .string({ required_error: 'Password is required' })
            .min(8, 'Password must be at least 8 characters')
            .regex(passwordRegex, 'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character'),
        confirmPassword: zod_1.z.string({ required_error: 'Confirm password is required' }),
        isAcceptPrivacyStatement: zod_1.z
            .boolean({ required_error: 'You must accept the Privacy Policy' })
            .refine(val => val === true, {
            message: 'You must accept the Privacy Policy to register',
        }),
    }).refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    }),
});
exports.loginSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({ required_error: 'Email is required' })
            .email('Email is invalid')
            .toLowerCase()
            .trim(),
        password: zod_1.z
            .string({ required_error: 'Password is required' })
            .min(1, 'Password is required'),
    }),
});
exports.verifyOtpSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({ required_error: 'Email is required' })
            .email('Email is invalid')
            .toLowerCase()
            .trim(),
        otp: zod_1.z
            .string({ required_error: 'OTP is required' })
            .length(6, 'OTP must be 6 digits')
            .regex(/^\d{6}$/, 'OTP must contain only numbers'),
    }),
});
exports.resendOtpSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({ required_error: 'Email is required' })
            .email('Email is invalid')
            .toLowerCase()
            .trim(),
    }),
});
exports.forgotPasswordSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({ required_error: 'Email is required' })
            .email('Email is invalid')
            .toLowerCase()
            .trim(),
    }),
});
exports.recoverAccountSchema = zod_1.z.object({
    body: zod_1.z.object({
        newPassword: zod_1.z
            .string({ required_error: 'New password is required' })
            .min(8, 'Password must be at least 8 characters')
            .regex(passwordRegex, 'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character'),
        confirmPassword: zod_1.z.string({ required_error: 'Confirm password is required' }),
    }).refine((data) => data.newPassword === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    }),
});
exports.sendVerificationOTPSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({ required_error: 'Email is required' })
            .email('Email is invalid')
            .toLowerCase()
            .trim(),
        otp: zod_1.z
            .string()
            .length(6, 'OTP must be 6 digits')
            .regex(/^\d{6}$/, 'OTP must contain only numbers')
            .optional(),
    }),
});
exports.verifyEmailWithTokenSchema = zod_1.z.object({
    body: zod_1.z.object({
        otp: zod_1.z
            .string({ required_error: 'OTP is required' })
            .length(6, 'OTP must be 6 digits')
            .regex(/^\d{6}$/, 'OTP must contain only numbers'),
    }),
});
exports.logoutSchema = zod_1.z.object({
    body: zod_1.z.object({
        refreshToken: zod_1.z
            .string({ required_error: 'Refresh token is required' })
            .min(1, 'Refresh token cannot be empty'),
    }),
});
exports.refreshTokenSchema = zod_1.z.object({
    body: zod_1.z.object({
        refreshToken: zod_1.z
            .string({ required_error: 'Refresh token is required' })
            .min(1, 'Refresh token cannot be empty'),
    }),
});
exports.googleAuthSchema = zod_1.z.object({
    body: zod_1.z.object({
        idToken: zod_1.z.string({ required_error: 'Google ID token is required' }).min(10),
    }),
});
//# sourceMappingURL=auth.validation.js.map
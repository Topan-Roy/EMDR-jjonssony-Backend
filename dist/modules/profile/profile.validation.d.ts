import { z } from 'zod';
export declare const updateProfileSchema: z.ZodObject<{
    body: z.ZodObject<{
        fullName: z.ZodString;
        phoneNumber: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        fullName: string;
        phoneNumber?: string | undefined;
    }, {
        fullName: string;
        phoneNumber?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        fullName: string;
        phoneNumber?: string | undefined;
    };
}, {
    body: {
        fullName: string;
        phoneNumber?: string | undefined;
    };
}>;
export declare const changePasswordSchema: z.ZodObject<{
    body: z.ZodEffects<z.ZodEffects<z.ZodObject<{
        currentPassword: z.ZodString;
        newPassword: z.ZodString;
        confirmPassword: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        newPassword: string;
        confirmPassword: string;
        currentPassword: string;
    }, {
        newPassword: string;
        confirmPassword: string;
        currentPassword: string;
    }>, {
        newPassword: string;
        confirmPassword: string;
        currentPassword: string;
    }, {
        newPassword: string;
        confirmPassword: string;
        currentPassword: string;
    }>, {
        newPassword: string;
        confirmPassword: string;
        currentPassword: string;
    }, {
        newPassword: string;
        confirmPassword: string;
        currentPassword: string;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        newPassword: string;
        confirmPassword: string;
        currentPassword: string;
    };
}, {
    body: {
        newPassword: string;
        confirmPassword: string;
        currentPassword: string;
    };
}>;
//# sourceMappingURL=profile.validation.d.ts.map
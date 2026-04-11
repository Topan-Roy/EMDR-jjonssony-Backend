import { z } from 'zod';
export declare const updateAdminProfileSchema: z.ZodObject<{
    body: z.ZodObject<{
        name: z.ZodString;
        phoneNumber: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        phoneNumber?: string | undefined;
    }, {
        name: string;
        phoneNumber?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        name: string;
        phoneNumber?: string | undefined;
    };
}, {
    body: {
        name: string;
        phoneNumber?: string | undefined;
    };
}>;
//# sourceMappingURL=admin.validation.d.ts.map
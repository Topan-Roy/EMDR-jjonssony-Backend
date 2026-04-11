import { z } from 'zod';
export declare const shareLocationSchema: z.ZodObject<{
    body: z.ZodObject<{
        latitude: z.ZodNumber;
        longitude: z.ZodNumber;
        accuracy: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        latitude: number;
        longitude: number;
        accuracy?: number | undefined;
    }, {
        latitude: number;
        longitude: number;
        accuracy?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        latitude: number;
        longitude: number;
        accuracy?: number | undefined;
    };
}, {
    body: {
        latitude: number;
        longitude: number;
        accuracy?: number | undefined;
    };
}>;
//# sourceMappingURL=location.validation.d.ts.map
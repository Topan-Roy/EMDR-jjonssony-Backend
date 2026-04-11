import { z } from 'zod';
export declare const createFaqSchema: z.ZodObject<{
    body: z.ZodObject<{
        question: z.ZodString;
        answer: z.ZodString;
        order: z.ZodOptional<z.ZodNumber>;
        isActive: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        question: string;
        answer: string;
        isActive?: boolean | undefined;
        order?: number | undefined;
    }, {
        question: string;
        answer: string;
        isActive?: boolean | undefined;
        order?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        question: string;
        answer: string;
        isActive?: boolean | undefined;
        order?: number | undefined;
    };
}, {
    body: {
        question: string;
        answer: string;
        isActive?: boolean | undefined;
        order?: number | undefined;
    };
}>;
export declare const updateFaqSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
    }, {
        id: string;
    }>;
    body: z.ZodObject<{
        question: z.ZodOptional<z.ZodString>;
        answer: z.ZodOptional<z.ZodString>;
        order: z.ZodOptional<z.ZodNumber>;
        isActive: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        isActive?: boolean | undefined;
        order?: number | undefined;
        question?: string | undefined;
        answer?: string | undefined;
    }, {
        isActive?: boolean | undefined;
        order?: number | undefined;
        question?: string | undefined;
        answer?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        id: string;
    };
    body: {
        isActive?: boolean | undefined;
        order?: number | undefined;
        question?: string | undefined;
        answer?: string | undefined;
    };
}, {
    params: {
        id: string;
    };
    body: {
        isActive?: boolean | undefined;
        order?: number | undefined;
        question?: string | undefined;
        answer?: string | undefined;
    };
}>;
export declare const idParamSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
    }, {
        id: string;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        id: string;
    };
}, {
    params: {
        id: string;
    };
}>;
export declare const reorderSchema: z.ZodObject<{
    body: z.ZodObject<{
        items: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            order: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            id: string;
            order: number;
        }, {
            id: string;
            order: number;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        items: {
            id: string;
            order: number;
        }[];
    }, {
        items: {
            id: string;
            order: number;
        }[];
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        items: {
            id: string;
            order: number;
        }[];
    };
}, {
    body: {
        items: {
            id: string;
            order: number;
        }[];
    };
}>;
//# sourceMappingURL=faq.validation.d.ts.map
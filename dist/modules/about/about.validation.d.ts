import { z } from 'zod';
export declare const aboutUsSchema: z.ZodObject<{
    body: z.ZodObject<{
        overview: z.ZodString;
        sections: z.ZodArray<z.ZodObject<{
            title: z.ZodString;
            content: z.ZodString;
            order: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            title: string;
            content: string;
            order: number;
        }, {
            title: string;
            content: string;
            order: number;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        sections: {
            title: string;
            content: string;
            order: number;
        }[];
        overview: string;
    }, {
        sections: {
            title: string;
            content: string;
            order: number;
        }[];
        overview: string;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        sections: {
            title: string;
            content: string;
            order: number;
        }[];
        overview: string;
    };
}, {
    body: {
        sections: {
            title: string;
            content: string;
            order: number;
        }[];
        overview: string;
    };
}>;
//# sourceMappingURL=about.validation.d.ts.map
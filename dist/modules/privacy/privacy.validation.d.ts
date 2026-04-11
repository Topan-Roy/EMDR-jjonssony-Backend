import { z } from 'zod';
export declare const createPrivacySchema: z.ZodObject<{
    body: z.ZodObject<{
        version: z.ZodString;
        overview: z.ZodString;
        effectiveDate: z.ZodOptional<z.ZodString>;
        lastUpdated: z.ZodOptional<z.ZodString>;
        changelog: z.ZodOptional<z.ZodString>;
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
        contactEmail: z.ZodString;
        contactName: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        version: string;
        sections: {
            title: string;
            content: string;
            order: number;
        }[];
        contactEmail: string;
        contactName: string;
        overview: string;
        lastUpdated?: string | undefined;
        effectiveDate?: string | undefined;
        changelog?: string | undefined;
    }, {
        version: string;
        sections: {
            title: string;
            content: string;
            order: number;
        }[];
        contactEmail: string;
        contactName: string;
        overview: string;
        lastUpdated?: string | undefined;
        effectiveDate?: string | undefined;
        changelog?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        version: string;
        sections: {
            title: string;
            content: string;
            order: number;
        }[];
        contactEmail: string;
        contactName: string;
        overview: string;
        lastUpdated?: string | undefined;
        effectiveDate?: string | undefined;
        changelog?: string | undefined;
    };
}, {
    body: {
        version: string;
        sections: {
            title: string;
            content: string;
            order: number;
        }[];
        contactEmail: string;
        contactName: string;
        overview: string;
        lastUpdated?: string | undefined;
        effectiveDate?: string | undefined;
        changelog?: string | undefined;
    };
}>;
export declare const replacePrivacySchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
    }, {
        id: string;
    }>;
    body: z.ZodObject<{
        version: z.ZodString;
        overview: z.ZodString;
        effectiveDate: z.ZodOptional<z.ZodString>;
        lastUpdated: z.ZodOptional<z.ZodString>;
        changelog: z.ZodOptional<z.ZodString>;
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
        contactEmail: z.ZodString;
        contactName: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        version: string;
        sections: {
            title: string;
            content: string;
            order: number;
        }[];
        contactEmail: string;
        contactName: string;
        overview: string;
        lastUpdated?: string | undefined;
        effectiveDate?: string | undefined;
        changelog?: string | undefined;
    }, {
        version: string;
        sections: {
            title: string;
            content: string;
            order: number;
        }[];
        contactEmail: string;
        contactName: string;
        overview: string;
        lastUpdated?: string | undefined;
        effectiveDate?: string | undefined;
        changelog?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        id: string;
    };
    body: {
        version: string;
        sections: {
            title: string;
            content: string;
            order: number;
        }[];
        contactEmail: string;
        contactName: string;
        overview: string;
        lastUpdated?: string | undefined;
        effectiveDate?: string | undefined;
        changelog?: string | undefined;
    };
}, {
    params: {
        id: string;
    };
    body: {
        version: string;
        sections: {
            title: string;
            content: string;
            order: number;
        }[];
        contactEmail: string;
        contactName: string;
        overview: string;
        lastUpdated?: string | undefined;
        effectiveDate?: string | undefined;
        changelog?: string | undefined;
    };
}>;
export declare const updatePrivacySchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
    }, {
        id: string;
    }>;
    body: z.ZodObject<{
        version: z.ZodOptional<z.ZodString>;
        overview: z.ZodOptional<z.ZodString>;
        effectiveDate: z.ZodOptional<z.ZodString>;
        lastUpdated: z.ZodOptional<z.ZodString>;
        changelog: z.ZodOptional<z.ZodString>;
        sections: z.ZodOptional<z.ZodArray<z.ZodObject<{
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
        }>, "many">>;
        contactEmail: z.ZodOptional<z.ZodString>;
        contactName: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        version?: string | undefined;
        lastUpdated?: string | undefined;
        effectiveDate?: string | undefined;
        changelog?: string | undefined;
        sections?: {
            title: string;
            content: string;
            order: number;
        }[] | undefined;
        contactEmail?: string | undefined;
        contactName?: string | undefined;
        overview?: string | undefined;
    }, {
        version?: string | undefined;
        lastUpdated?: string | undefined;
        effectiveDate?: string | undefined;
        changelog?: string | undefined;
        sections?: {
            title: string;
            content: string;
            order: number;
        }[] | undefined;
        contactEmail?: string | undefined;
        contactName?: string | undefined;
        overview?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        id: string;
    };
    body: {
        version?: string | undefined;
        lastUpdated?: string | undefined;
        effectiveDate?: string | undefined;
        changelog?: string | undefined;
        sections?: {
            title: string;
            content: string;
            order: number;
        }[] | undefined;
        contactEmail?: string | undefined;
        contactName?: string | undefined;
        overview?: string | undefined;
    };
}, {
    params: {
        id: string;
    };
    body: {
        version?: string | undefined;
        lastUpdated?: string | undefined;
        effectiveDate?: string | undefined;
        changelog?: string | undefined;
        sections?: {
            title: string;
            content: string;
            order: number;
        }[] | undefined;
        contactEmail?: string | undefined;
        contactName?: string | undefined;
        overview?: string | undefined;
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
//# sourceMappingURL=privacy.validation.d.ts.map
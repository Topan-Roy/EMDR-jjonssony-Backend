import { z } from 'zod';
export declare const createTermsSchema: z.ZodObject<{
    body: z.ZodObject<{
        version: z.ZodString;
        lastUpdated: z.ZodOptional<z.ZodString>;
        effectiveDate: z.ZodOptional<z.ZodString>;
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
        lastUpdated?: string | undefined;
        effectiveDate?: string | undefined;
        changelog?: string | undefined;
    };
}>;
export declare const updateTermsSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
    }, {
        id: string;
    }>;
    body: z.ZodObject<{
        version: z.ZodOptional<z.ZodString>;
        lastUpdated: z.ZodOptional<z.ZodString>;
        effectiveDate: z.ZodOptional<z.ZodString>;
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
    };
}>;
export declare const replaceTermsSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
    }, {
        id: string;
    }>;
    body: z.ZodObject<{
        version: z.ZodString;
        lastUpdated: z.ZodOptional<z.ZodString>;
        effectiveDate: z.ZodOptional<z.ZodString>;
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
        lastUpdated?: string | undefined;
        effectiveDate?: string | undefined;
        changelog?: string | undefined;
    };
}>;
export declare const acceptTermsSchema: z.ZodObject<{
    body: z.ZodObject<{
        termsId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        termsId: string;
    }, {
        termsId: string;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        termsId: string;
    };
}, {
    body: {
        termsId: string;
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
//# sourceMappingURL=terms.validation.d.ts.map
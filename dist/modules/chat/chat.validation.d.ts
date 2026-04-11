import { z } from 'zod';
export declare const getConversationSchema: z.ZodObject<{
    body: z.ZodObject<{
        userId: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        userId?: string | undefined;
    }, {
        userId?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        userId?: string | undefined;
    };
}, {
    body: {
        userId?: string | undefined;
    };
}>;
export declare const sendMessageSchema: z.ZodObject<{
    params: z.ZodObject<{
        conversationId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        conversationId: string;
    }, {
        conversationId: string;
    }>;
    body: z.ZodEffects<z.ZodObject<{
        text: z.ZodOptional<z.ZodString>;
        type: z.ZodDefault<z.ZodEnum<["text", "image"]>>;
    }, "strip", z.ZodTypeAny, {
        type: "text" | "image";
        text?: string | undefined;
    }, {
        type?: "text" | "image" | undefined;
        text?: string | undefined;
    }>, {
        type: "text" | "image";
        text?: string | undefined;
    }, {
        type?: "text" | "image" | undefined;
        text?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        conversationId: string;
    };
    body: {
        type: "text" | "image";
        text?: string | undefined;
    };
}, {
    params: {
        conversationId: string;
    };
    body: {
        type?: "text" | "image" | undefined;
        text?: string | undefined;
    };
}>;
export declare const getMessagesSchema: z.ZodObject<{
    params: z.ZodObject<{
        conversationId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        conversationId: string;
    }, {
        conversationId: string;
    }>;
    query: z.ZodObject<{
        page: z.ZodDefault<z.ZodNumber>;
        limit: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        limit: number;
        page: number;
    }, {
        limit?: number | undefined;
        page?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        conversationId: string;
    };
    query: {
        limit: number;
        page: number;
    };
}, {
    params: {
        conversationId: string;
    };
    query: {
        limit?: number | undefined;
        page?: number | undefined;
    };
}>;
export declare const conversationIdParamSchema: z.ZodObject<{
    params: z.ZodObject<{
        conversationId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        conversationId: string;
    }, {
        conversationId: string;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        conversationId: string;
    };
}, {
    params: {
        conversationId: string;
    };
}>;
export declare const messageIdParamSchema: z.ZodObject<{
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
export declare const paginationSchema: z.ZodObject<{
    query: z.ZodObject<{
        page: z.ZodDefault<z.ZodNumber>;
        limit: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        limit: number;
        page: number;
    }, {
        limit?: number | undefined;
        page?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    query: {
        limit: number;
        page: number;
    };
}, {
    query: {
        limit?: number | undefined;
        page?: number | undefined;
    };
}>;
//# sourceMappingURL=chat.validation.d.ts.map
import { z } from 'zod';
import { TicketStatus, TicketPriority } from './support.model';
export declare const createTicketSchema: z.ZodObject<{
    body: z.ZodObject<{
        category: z.ZodString;
        message: z.ZodString;
        priority: z.ZodOptional<z.ZodNativeEnum<typeof TicketPriority>>;
    }, "strip", z.ZodTypeAny, {
        message: string;
        category: string;
        priority?: TicketPriority | undefined;
    }, {
        message: string;
        category: string;
        priority?: TicketPriority | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        message: string;
        category: string;
        priority?: TicketPriority | undefined;
    };
}, {
    body: {
        message: string;
        category: string;
        priority?: TicketPriority | undefined;
    };
}>;
export declare const respondTicketSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
    }, {
        id: string;
    }>;
    body: z.ZodObject<{
        response: z.ZodString;
        status: z.ZodOptional<z.ZodNativeEnum<typeof TicketStatus>>;
    }, "strip", z.ZodTypeAny, {
        response: string;
        status?: TicketStatus | undefined;
    }, {
        response: string;
        status?: TicketStatus | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        id: string;
    };
    body: {
        response: string;
        status?: TicketStatus | undefined;
    };
}, {
    params: {
        id: string;
    };
    body: {
        response: string;
        status?: TicketStatus | undefined;
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
export declare const adminQuerySchema: z.ZodObject<{
    query: z.ZodObject<{
        status: z.ZodOptional<z.ZodNativeEnum<typeof TicketStatus>>;
        priority: z.ZodOptional<z.ZodNativeEnum<typeof TicketPriority>>;
        page: z.ZodOptional<z.ZodEffects<z.ZodString, number, string>>;
        limit: z.ZodOptional<z.ZodEffects<z.ZodString, number, string>>;
    }, "strip", z.ZodTypeAny, {
        limit?: number | undefined;
        status?: TicketStatus | undefined;
        priority?: TicketPriority | undefined;
        page?: number | undefined;
    }, {
        limit?: string | undefined;
        status?: TicketStatus | undefined;
        priority?: TicketPriority | undefined;
        page?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    query: {
        limit?: number | undefined;
        status?: TicketStatus | undefined;
        priority?: TicketPriority | undefined;
        page?: number | undefined;
    };
}, {
    query: {
        limit?: string | undefined;
        status?: TicketStatus | undefined;
        priority?: TicketPriority | undefined;
        page?: string | undefined;
    };
}>;
//# sourceMappingURL=support.validation.d.ts.map
import { z } from 'zod';
export declare const registerTokenSchema: z.ZodObject<{
    body: z.ZodObject<{
        fcmToken: z.ZodString;
        platform: z.ZodEnum<["android", "ios", "web"]>;
    }, "strip", z.ZodTypeAny, {
        fcmToken: string;
        platform: "android" | "ios" | "web";
    }, {
        fcmToken: string;
        platform: "android" | "ios" | "web";
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        fcmToken: string;
        platform: "android" | "ios" | "web";
    };
}, {
    body: {
        fcmToken: string;
        platform: "android" | "ios" | "web";
    };
}>;
export declare const sendToUserSchema: z.ZodObject<{
    body: z.ZodObject<{
        userId: z.ZodString;
        title: z.ZodString;
        body: z.ZodString;
        data: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        imageUrl: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        userId: string;
        body: string;
        title: string;
        data?: Record<string, string> | undefined;
        imageUrl?: string | undefined;
    }, {
        userId: string;
        body: string;
        title: string;
        data?: Record<string, string> | undefined;
        imageUrl?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        userId: string;
        body: string;
        title: string;
        data?: Record<string, string> | undefined;
        imageUrl?: string | undefined;
    };
}, {
    body: {
        userId: string;
        body: string;
        title: string;
        data?: Record<string, string> | undefined;
        imageUrl?: string | undefined;
    };
}>;
export declare const broadcastSchema: z.ZodObject<{
    body: z.ZodObject<{
        title: z.ZodString;
        body: z.ZodString;
        role: z.ZodOptional<z.ZodEnum<["user", "admin"]>>;
        data: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        imageUrl: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        body: string;
        title: string;
        role?: "user" | "admin" | undefined;
        data?: Record<string, string> | undefined;
        imageUrl?: string | undefined;
    }, {
        body: string;
        title: string;
        role?: "user" | "admin" | undefined;
        data?: Record<string, string> | undefined;
        imageUrl?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        body: string;
        title: string;
        role?: "user" | "admin" | undefined;
        data?: Record<string, string> | undefined;
        imageUrl?: string | undefined;
    };
}, {
    body: {
        body: string;
        title: string;
        role?: "user" | "admin" | undefined;
        data?: Record<string, string> | undefined;
        imageUrl?: string | undefined;
    };
}>;
export declare const topicSchema: z.ZodObject<{
    body: z.ZodObject<{
        topic: z.ZodString;
        title: z.ZodString;
        body: z.ZodString;
        data: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        imageUrl: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        body: string;
        title: string;
        topic: string;
        data?: Record<string, string> | undefined;
        imageUrl?: string | undefined;
    }, {
        body: string;
        title: string;
        topic: string;
        data?: Record<string, string> | undefined;
        imageUrl?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        body: string;
        title: string;
        topic: string;
        data?: Record<string, string> | undefined;
        imageUrl?: string | undefined;
    };
}, {
    body: {
        body: string;
        title: string;
        topic: string;
        data?: Record<string, string> | undefined;
        imageUrl?: string | undefined;
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
export declare const markReadSchema: z.ZodObject<{
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
export declare const deleteNotificationSchema: z.ZodObject<{
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
//# sourceMappingURL=notification.validation.d.ts.map
import { z } from 'zod';
import { SubscriptionPlanType } from './subscription.model';
export declare const planIdSchema: z.ZodObject<{
    body: z.ZodObject<{
        planId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        planId: string;
    }, {
        planId: string;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        planId: string;
    };
}, {
    body: {
        planId: string;
    };
}>;
export declare const createPlanSchema: z.ZodObject<{
    body: z.ZodObject<{
        name: z.ZodString;
        type: z.ZodNativeEnum<typeof SubscriptionPlanType>;
        price: z.ZodNumber;
        currency: z.ZodDefault<z.ZodString>;
        interval: z.ZodDefault<z.ZodEnum<["monthly", "yearly"]>>;
        description: z.ZodOptional<z.ZodString>;
        tagline: z.ZodOptional<z.ZodString>;
        features: z.ZodArray<z.ZodString, "many">;
        spotsAvailable: z.ZodOptional<z.ZodNumber>;
        isActive: z.ZodOptional<z.ZodBoolean>;
        isCommunityAccess: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        type: SubscriptionPlanType;
        name: string;
        price: number;
        currency: string;
        interval: "monthly" | "yearly";
        features: string[];
        description?: string | undefined;
        isActive?: boolean | undefined;
        tagline?: string | undefined;
        spotsAvailable?: number | undefined;
        isCommunityAccess?: boolean | undefined;
    }, {
        type: SubscriptionPlanType;
        name: string;
        price: number;
        features: string[];
        description?: string | undefined;
        isActive?: boolean | undefined;
        currency?: string | undefined;
        interval?: "monthly" | "yearly" | undefined;
        tagline?: string | undefined;
        spotsAvailable?: number | undefined;
        isCommunityAccess?: boolean | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        type: SubscriptionPlanType;
        name: string;
        price: number;
        currency: string;
        interval: "monthly" | "yearly";
        features: string[];
        description?: string | undefined;
        isActive?: boolean | undefined;
        tagline?: string | undefined;
        spotsAvailable?: number | undefined;
        isCommunityAccess?: boolean | undefined;
    };
}, {
    body: {
        type: SubscriptionPlanType;
        name: string;
        price: number;
        features: string[];
        description?: string | undefined;
        isActive?: boolean | undefined;
        currency?: string | undefined;
        interval?: "monthly" | "yearly" | undefined;
        tagline?: string | undefined;
        spotsAvailable?: number | undefined;
        isCommunityAccess?: boolean | undefined;
    };
}>;
export declare const updatePlanSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
    }, {
        id: string;
    }>;
    body: z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        type: z.ZodOptional<z.ZodNativeEnum<typeof SubscriptionPlanType>>;
        price: z.ZodOptional<z.ZodNumber>;
        currency: z.ZodOptional<z.ZodString>;
        interval: z.ZodOptional<z.ZodEnum<["monthly", "yearly"]>>;
        description: z.ZodOptional<z.ZodString>;
        tagline: z.ZodOptional<z.ZodString>;
        features: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        spotsAvailable: z.ZodOptional<z.ZodNumber>;
        isActive: z.ZodOptional<z.ZodBoolean>;
        isCommunityAccess: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        type?: SubscriptionPlanType | undefined;
        description?: string | undefined;
        name?: string | undefined;
        isActive?: boolean | undefined;
        price?: number | undefined;
        currency?: string | undefined;
        interval?: "monthly" | "yearly" | undefined;
        tagline?: string | undefined;
        features?: string[] | undefined;
        spotsAvailable?: number | undefined;
        isCommunityAccess?: boolean | undefined;
    }, {
        type?: SubscriptionPlanType | undefined;
        description?: string | undefined;
        name?: string | undefined;
        isActive?: boolean | undefined;
        price?: number | undefined;
        currency?: string | undefined;
        interval?: "monthly" | "yearly" | undefined;
        tagline?: string | undefined;
        features?: string[] | undefined;
        spotsAvailable?: number | undefined;
        isCommunityAccess?: boolean | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        id: string;
    };
    body: {
        type?: SubscriptionPlanType | undefined;
        description?: string | undefined;
        name?: string | undefined;
        isActive?: boolean | undefined;
        price?: number | undefined;
        currency?: string | undefined;
        interval?: "monthly" | "yearly" | undefined;
        tagline?: string | undefined;
        features?: string[] | undefined;
        spotsAvailable?: number | undefined;
        isCommunityAccess?: boolean | undefined;
    };
}, {
    params: {
        id: string;
    };
    body: {
        type?: SubscriptionPlanType | undefined;
        description?: string | undefined;
        name?: string | undefined;
        isActive?: boolean | undefined;
        price?: number | undefined;
        currency?: string | undefined;
        interval?: "monthly" | "yearly" | undefined;
        tagline?: string | undefined;
        features?: string[] | undefined;
        spotsAvailable?: number | undefined;
        isCommunityAccess?: boolean | undefined;
    };
}>;
export declare const reviewRequestSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
    }, {
        id: string;
    }>;
    body: z.ZodObject<{
        status: z.ZodEnum<["approved", "rejected"]>;
        comment: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        status: "approved" | "rejected";
        comment?: string | undefined;
    }, {
        status: "approved" | "rejected";
        comment?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        id: string;
    };
    body: {
        status: "approved" | "rejected";
        comment?: string | undefined;
    };
}, {
    params: {
        id: string;
    };
    body: {
        status: "approved" | "rejected";
        comment?: string | undefined;
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
//# sourceMappingURL=subscription.validation.d.ts.map
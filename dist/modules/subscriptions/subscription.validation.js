"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.idParamSchema = exports.reviewRequestSchema = exports.updatePlanSchema = exports.createPlanSchema = exports.planIdSchema = void 0;
const zod_1 = require("zod");
const subscription_model_1 = require("./subscription.model");
exports.planIdSchema = zod_1.z.object({
    body: zod_1.z.object({
        planId: zod_1.z.string().regex(/^[a-f\d]{24}$/i, 'Invalid plan ID'),
    }),
});
exports.createPlanSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'Plan name is required' }).min(2).max(100).trim(),
        type: zod_1.z.nativeEnum(subscription_model_1.SubscriptionPlanType),
        price: zod_1.z.number({ required_error: 'Price is required' }).min(0),
        currency: zod_1.z.string().min(1).default('£'),
        interval: zod_1.z.enum(['monthly', 'yearly']).default('monthly'),
        description: zod_1.z.string().optional(),
        tagline: zod_1.z.string().optional(),
        features: zod_1.z.array(zod_1.z.string()).min(1, 'At least one feature is required'),
        spotsAvailable: zod_1.z.number().int().optional(),
        isActive: zod_1.z.boolean().optional(),
        isCommunityAccess: zod_1.z.boolean().optional(),
    }),
});
exports.updatePlanSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().regex(/^[a-f\d]{24}$/i, 'Invalid plan ID'),
    }),
    body: zod_1.z.object({
        name: zod_1.z.string().min(2).max(100).trim().optional(),
        type: zod_1.z.nativeEnum(subscription_model_1.SubscriptionPlanType).optional(),
        price: zod_1.z.number().min(0).optional(),
        currency: zod_1.z.string().optional(),
        interval: zod_1.z.enum(['monthly', 'yearly']).optional(),
        description: zod_1.z.string().optional(),
        tagline: zod_1.z.string().optional(),
        features: zod_1.z.array(zod_1.z.string()).optional(),
        spotsAvailable: zod_1.z.number().int().optional(),
        isActive: zod_1.z.boolean().optional(),
        isCommunityAccess: zod_1.z.boolean().optional(),
    }),
});
exports.reviewRequestSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().regex(/^[a-f\d]{24}$/i, 'Invalid request ID'),
    }),
    body: zod_1.z.object({
        status: zod_1.z.enum(['approved', 'rejected']),
        comment: zod_1.z.string().optional(),
    }),
});
exports.idParamSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().regex(/^[a-f\d]{24}$/i, 'Invalid ID'),
    }),
});
//# sourceMappingURL=subscription.validation.js.map
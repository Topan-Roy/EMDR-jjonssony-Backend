export declare const subscriptionService: {
    /**
     * Get all active subscription plans
     */
    getPlans(): Promise<(import("./subscription.model").ISubscriptionPlan & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    /**
     * Get user's current subscription
     */
    getMySubscription(userId: string): Promise<(import("./subscription.model").IUserSubscription & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    /**
     * Subscribe to a plan (Standard/Premium)
     * Note: In a real app, this would involve a payment gateway.
     */
    subscribe(userId: string, planId: string): Promise<import("mongoose").Document<unknown, {}, import("./subscription.model").IUserSubscription, {}, import("mongoose").DefaultSchemaOptions> & import("./subscription.model").IUserSubscription & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    /**
     * Apply for Community Access (Free)
     */
    applyForAccess(userId: string, planId: string): Promise<import("mongoose").Document<unknown, {}, import("./subscription.model").ISubscriptionRequest, {}, import("mongoose").DefaultSchemaOptions> & import("./subscription.model").ISubscriptionRequest & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    adminGetPlans(): Promise<(import("./subscription.model").ISubscriptionPlan & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    adminCreatePlan(data: any): Promise<import("mongoose").Document<unknown, {}, import("./subscription.model").ISubscriptionPlan, {}, import("mongoose").DefaultSchemaOptions> & import("./subscription.model").ISubscriptionPlan & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    adminUpdatePlan(id: string, data: any): Promise<import("mongoose").Document<unknown, {}, import("./subscription.model").ISubscriptionPlan, {}, import("mongoose").DefaultSchemaOptions> & import("./subscription.model").ISubscriptionPlan & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    adminGetRequests(): Promise<(import("./subscription.model").ISubscriptionRequest & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    adminReviewRequest(requestId: string, status: "approved" | "rejected", comment?: string): Promise<import("mongoose").Document<unknown, {}, import("./subscription.model").ISubscriptionRequest, {}, import("mongoose").DefaultSchemaOptions> & import("./subscription.model").ISubscriptionRequest & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
};
//# sourceMappingURL=subscription.service.d.ts.map
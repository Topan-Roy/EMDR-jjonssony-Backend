"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscriptionController = void 0;
const subscription_service_1 = require("./subscription.service");
const respond = (res, data, status = 200) => res.status(status).json({ success: true, data, meta: { timestamp: new Date().toISOString() } });
exports.subscriptionController = {
    /**
     * Get all active pricing plans (Public)
     */
    getPlans: async (_req, res, next) => {
        try {
            const data = await subscription_service_1.subscriptionService.getPlans();
            respond(res, data);
        }
        catch (e) {
            next(e);
        }
    },
    /**
     * Get user's current subscription
     */
    getMySubscription: async (req, res, next) => {
        try {
            const data = await subscription_service_1.subscriptionService.getMySubscription(req.user.userId);
            respond(res, data);
        }
        catch (e) {
            next(e);
        }
    },
    /**
     * Standard Subscription (Standard/Premium)
     */
    subscribe: async (req, res, next) => {
        try {
            const data = await subscription_service_1.subscriptionService.subscribe(req.user.userId, req.body.planId);
            respond(res, data, 201);
        }
        catch (e) {
            next(e);
        }
    },
    /**
     * Apply for Community Access (Free)
     */
    apply: async (req, res, next) => {
        try {
            const data = await subscription_service_1.subscriptionService.applyForAccess(req.user.userId, req.body.planId);
            respond(res, data, 201);
        }
        catch (e) {
            next(e);
        }
    },
    // ── ADMIN CONTROLLERS ────────────────────────────────────
    adminGetPlans: async (_req, res, next) => {
        try {
            respond(res, await subscription_service_1.subscriptionService.adminGetPlans());
        }
        catch (e) {
            next(e);
        }
    },
    adminCreatePlan: async (req, res, next) => {
        try {
            respond(res, await subscription_service_1.subscriptionService.adminCreatePlan(req.body), 201);
        }
        catch (e) {
            next(e);
        }
    },
    adminUpdatePlan: async (req, res, next) => {
        try {
            respond(res, await subscription_service_1.subscriptionService.adminUpdatePlan(req.params.id, req.body));
        }
        catch (e) {
            next(e);
        }
    },
    adminGetRequests: async (_req, res, next) => {
        try {
            respond(res, await subscription_service_1.subscriptionService.adminGetRequests());
        }
        catch (e) {
            next(e);
        }
    },
    adminReviewRequest: async (req, res, next) => {
        try {
            const { status, comment } = req.body;
            respond(res, await subscription_service_1.subscriptionService.adminReviewRequest(req.params.id, status, comment));
        }
        catch (e) {
            next(e);
        }
    },
};
//# sourceMappingURL=subscription.controller.js.map
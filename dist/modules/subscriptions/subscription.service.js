"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscriptionService = void 0;
const subscription_model_1 = require("./subscription.model");
const ApiError_1 = require("../../utils/ApiError");
const logger_1 = require("../../config/logger");
exports.subscriptionService = {
    /**
     * Get all active subscription plans
     */
    async getPlans() {
        return subscription_model_1.SubscriptionPlan.find({ isActive: true }).sort({ price: 1 }).lean();
    },
    /**
     * Get user's current subscription
     */
    async getMySubscription(userId) {
        return subscription_model_1.UserSubscription.findOne({ userId, status: subscription_model_1.SubscriptionStatus.ACTIVE })
            .populate('planId')
            .lean();
    },
    /**
     * Subscribe to a plan (Standard/Premium)
     * Note: In a real app, this would involve a payment gateway.
     */
    async subscribe(userId, planId) {
        const plan = await subscription_model_1.SubscriptionPlan.findById(planId);
        if (!plan || !plan.isActive) {
            throw ApiError_1.ApiError.notFound('Subscription plan not found or inactive');
        }
        if (plan.isCommunityAccess) {
            throw ApiError_1.ApiError.validationError('Use the Apply for Access endpoint for this plan');
        }
        // Standard logic: Deactivate old and create new
        await subscription_model_1.UserSubscription.updateMany({ userId, status: subscription_model_1.SubscriptionStatus.ACTIVE }, { status: subscription_model_1.SubscriptionStatus.CANCELED });
        const subscription = await subscription_model_1.UserSubscription.create({
            userId,
            planId,
            status: subscription_model_1.SubscriptionStatus.ACTIVE,
            startDate: new Date(),
        });
        logger_1.logger.info('User subscribed to plan', { userId, planId, subscriptionId: subscription._id });
        return subscription;
    },
    /**
     * Apply for Community Access (Free)
     */
    async applyForAccess(userId, planId) {
        const plan = await subscription_model_1.SubscriptionPlan.findById(planId);
        if (!plan || !plan.isCommunityAccess) {
            throw ApiError_1.ApiError.validationError('Invalid plan for Community Access application');
        }
        // Check if there's already a pending request
        const existing = await subscription_model_1.SubscriptionRequest.findOne({ userId, planId, status: 'pending' });
        if (existing) {
            throw ApiError_1.ApiError.validationError('You already have a pending application for this plan');
        }
        const request = await subscription_model_1.SubscriptionRequest.create({
            userId,
            planId,
            status: 'pending',
        });
        logger_1.logger.info('Community Access request submitted', { userId, planId, requestId: request._id });
        return request;
    },
    // ── ADMIN METHODS ────────────────────────────────────────
    async adminGetPlans() {
        return subscription_model_1.SubscriptionPlan.find().sort({ price: 1 }).lean();
    },
    async adminCreatePlan(data) {
        const plan = await subscription_model_1.SubscriptionPlan.create(data);
        logger_1.logger.info('New subscription plan created by admin', { planId: plan._id });
        return plan;
    },
    async adminUpdatePlan(id, data) {
        const plan = await subscription_model_1.SubscriptionPlan.findByIdAndUpdate(id, data, { returnDocument: 'after', runValidators: true });
        if (!plan)
            throw ApiError_1.ApiError.notFound('Plan not found');
        return plan;
    },
    async adminGetRequests() {
        return subscription_model_1.SubscriptionRequest.find()
            .populate('userId', 'firstName lastName email')
            .populate('planId', 'name')
            .sort({ createdAt: -1 })
            .lean();
    },
    async adminReviewRequest(requestId, status, comment) {
        const request = await subscription_model_1.SubscriptionRequest.findById(requestId);
        if (!request)
            throw ApiError_1.ApiError.notFound('Request not found');
        if (request.status !== 'pending')
            throw ApiError_1.ApiError.validationError('Request already processed');
        request.status = status;
        request.adminComment = comment;
        await request.save();
        if (status === 'approved') {
            // Subscribing the user to the plan automatically
            await subscription_model_1.UserSubscription.updateMany({ userId: request.userId, status: subscription_model_1.SubscriptionStatus.ACTIVE }, { status: subscription_model_1.SubscriptionStatus.CANCELED });
            await subscription_model_1.UserSubscription.create({
                userId: request.userId,
                planId: request.planId,
                status: subscription_model_1.SubscriptionStatus.ACTIVE,
                startDate: new Date(),
            });
            logger_1.logger.info('Community Access request approved and user subscribed', { userId: request.userId });
        }
        return request;
    },
};
//# sourceMappingURL=subscription.service.js.map
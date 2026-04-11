"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionRequest = exports.UserSubscription = exports.SubscriptionPlan = exports.SubscriptionStatus = exports.SubscriptionPlanType = void 0;
const mongoose_1 = __importStar(require("mongoose"));
var SubscriptionPlanType;
(function (SubscriptionPlanType) {
    SubscriptionPlanType["FREE"] = "free";
    SubscriptionPlanType["STANDARD"] = "standard";
    SubscriptionPlanType["PREMIUM"] = "premium";
    SubscriptionPlanType["COMMUNITY"] = "community";
})(SubscriptionPlanType || (exports.SubscriptionPlanType = SubscriptionPlanType = {}));
var SubscriptionStatus;
(function (SubscriptionStatus) {
    SubscriptionStatus["ACTIVE"] = "active";
    SubscriptionStatus["CANCELED"] = "canceled";
    SubscriptionStatus["EXPIRED"] = "expired";
    SubscriptionStatus["PENDING"] = "pending";
})(SubscriptionStatus || (exports.SubscriptionStatus = SubscriptionStatus = {}));
const subscriptionPlanSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    type: { type: String, enum: Object.values(SubscriptionPlanType), default: SubscriptionPlanType.STANDARD },
    price: { type: Number, required: true, default: 0 },
    currency: { type: String, default: '£' },
    interval: { type: String, enum: ['monthly', 'yearly'], default: 'monthly' },
    description: { type: String, trim: true },
    tagline: { type: String, trim: true },
    features: [{ type: String, trim: true }],
    spotsAvailable: { type: Number },
    isActive: { type: Boolean, default: true },
    isCommunityAccess: { type: Boolean, default: false },
}, { timestamps: true });
const userSubscriptionSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    planId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'SubscriptionPlan', required: true },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date },
    status: { type: String, enum: Object.values(SubscriptionStatus), default: SubscriptionStatus.PENDING },
    autoRenew: { type: Boolean, default: true },
}, { timestamps: true });
const subscriptionRequestSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    planId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'SubscriptionPlan', required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    adminComment: { type: String, trim: true },
}, { timestamps: true });
exports.SubscriptionPlan = mongoose_1.default.model('SubscriptionPlan', subscriptionPlanSchema);
exports.UserSubscription = mongoose_1.default.model('UserSubscription', userSubscriptionSchema);
exports.SubscriptionRequest = mongoose_1.default.model('SubscriptionRequest', subscriptionRequestSchema);
//# sourceMappingURL=subscription.model.js.map
import mongoose, { Document } from 'mongoose';
export declare enum SubscriptionPlanType {
    FREE = "free",
    STANDARD = "standard",
    PREMIUM = "premium",
    COMMUNITY = "community"
}
export declare enum SubscriptionStatus {
    ACTIVE = "active",
    CANCELED = "canceled",
    EXPIRED = "expired",
    PENDING = "pending"
}
export interface ISubscriptionPlan extends Document {
    name: string;
    type: SubscriptionPlanType;
    price: number;
    currency: string;
    interval: 'monthly' | 'yearly';
    description: string;
    tagline: string;
    features: string[];
    spotsAvailable?: number;
    isActive: boolean;
    isCommunityAccess: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export interface IUserSubscription extends Document {
    userId: mongoose.Types.ObjectId;
    planId: mongoose.Types.ObjectId;
    startDate: Date;
    endDate?: Date;
    status: SubscriptionStatus;
    autoRenew: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export interface ISubscriptionRequest extends Document {
    userId: mongoose.Types.ObjectId;
    planId: mongoose.Types.ObjectId;
    status: 'pending' | 'approved' | 'rejected';
    adminComment?: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare const SubscriptionPlan: mongoose.Model<ISubscriptionPlan, {}, {}, {}, mongoose.Document<unknown, {}, ISubscriptionPlan, {}, mongoose.DefaultSchemaOptions> & ISubscriptionPlan & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, ISubscriptionPlan>;
export declare const UserSubscription: mongoose.Model<IUserSubscription, {}, {}, {}, mongoose.Document<unknown, {}, IUserSubscription, {}, mongoose.DefaultSchemaOptions> & IUserSubscription & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IUserSubscription>;
export declare const SubscriptionRequest: mongoose.Model<ISubscriptionRequest, {}, {}, {}, mongoose.Document<unknown, {}, ISubscriptionRequest, {}, mongoose.DefaultSchemaOptions> & ISubscriptionRequest & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, ISubscriptionRequest>;
//# sourceMappingURL=subscription.model.d.ts.map
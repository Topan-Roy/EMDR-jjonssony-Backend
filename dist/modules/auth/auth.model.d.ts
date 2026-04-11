import mongoose, { Document } from 'mongoose';
export interface IUser extends Document {
    firstName: string;
    lastName: string;
    fullName?: string;
    email: string;
    phoneNumber?: string;
    password: string;
    authProvider: 'email' | 'google' | 'facebook';
    isVerified: boolean;
    isProfileCompleted: boolean;
    role: 'user' | 'admin';
    otp?: string;
    otpExpiresAt?: Date;
    otpAttempts: number;
    recoveryOtp?: string;
    recoveryOtpExpiresAt?: Date;
    recoveryOtpAttempts: number;
    refreshToken?: string;
    loginAttempts: number;
    lockUntil?: Date;
    lastLogin?: Date;
    googleId?: string;
    avatar?: string;
    isDeleted: boolean;
    deletedAt?: Date;
    isAcceptPrivacyStatement: boolean;
    privacyAcceptedAt?: Date;
    fcmToken?: string;
    fcmPlatform?: 'android' | 'ios' | 'web';
    createdAt: Date;
    updatedAt: Date;
}
export declare const User: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IUser>;
//# sourceMappingURL=auth.model.d.ts.map
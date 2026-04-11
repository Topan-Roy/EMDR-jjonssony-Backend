"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileService = exports.ProfileService = void 0;
const auth_model_1 = require("../auth/auth.model");
const ApiError_1 = require("../../utils/ApiError");
const redis_1 = require("../../config/redis");
const logger_1 = require("../../config/logger");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const sendEmail_1 = require("../../utils/sendEmail");
const uploadImage_1 = require("../../utils/uploadImage");
const profileCacheKey = (userId) => `profile:${userId}`;
class ProfileService {
    // GET profile — Redis cached
    async getProfile(userId) {
        const cacheKey = profileCacheKey(userId);
        // Try cache first
        try {
            const cached = await redis_1.redis.get(cacheKey);
            if (cached)
                return JSON.parse(cached);
        }
        catch (err) {
            logger_1.logger.warn('Redis cache read failed, falling back to DB', { userId });
        }
        const user = await auth_model_1.User.findOne({ _id: userId, isDeleted: false }).select('firstName lastName email phoneNumber avatar isVerified isProfileCompleted authProvider role createdAt').lean();
        if (!user)
            throw ApiError_1.ApiError.userNotFound();
        const profile = {
            id: user._id.toString(),
            fullName: `${user.firstName} ${user.lastName}`.trim(),
            email: user.email,
            phoneNumber: user.phoneNumber ?? null,
            avatar: user.avatar ?? null,
            isVerified: user.isVerified,
            isProfileCompleted: user.isProfileCompleted,
            authProvider: user.authProvider,
            role: user.role,
            memberSince: user.createdAt,
        };
        // Cache the result
        try {
            await redis_1.redis.setex(cacheKey, redis_1.CACHE_TTL.PROFILE, JSON.stringify(profile));
        }
        catch (err) {
            logger_1.logger.warn('Redis cache write failed', { userId });
        }
        return profile;
    }
    // EDIT profile — fullName + optional phoneNumber + optional profilePic
    async updateProfile(userId, fullName, phoneNumber, profilePicBuffer) {
        const parts = fullName.trim().split(/\s+/);
        const firstName = parts[0];
        const lastName = parts.slice(1).join(' ') || parts[0];
        const updateData = {
            firstName,
            lastName,
            isProfileCompleted: true,
        };
        if (phoneNumber !== undefined)
            updateData.phoneNumber = phoneNumber;
        // Upload new profile picture if provided
        if (profilePicBuffer) {
            const existing = await auth_model_1.User.findById(userId).select('avatar').lean();
            const avatarUrl = await (0, uploadImage_1.uploadToCloudinary)(profilePicBuffer, 'my-emdr/avatars', `avatar_${userId}`);
            updateData.avatar = avatarUrl;
            // Delete old image — non-blocking
            if (existing?.avatar) {
                (0, uploadImage_1.deleteFromCloudinary)(existing.avatar).catch(() => { });
            }
        }
        const user = await auth_model_1.User.findOneAndUpdate({ _id: userId, isDeleted: false }, updateData, { returnDocument: 'after', runValidators: true }).select('firstName lastName email phoneNumber avatar isVerified isProfileCompleted').lean();
        if (!user)
            throw ApiError_1.ApiError.userNotFound();
        const profile = {
            id: user._id.toString(),
            fullName: `${user.firstName} ${user.lastName}`.trim(),
            email: user.email,
            phoneNumber: user.phoneNumber ?? null,
            profilePic: user.avatar ?? null,
            isVerified: user.isVerified,
            isProfileCompleted: user.isProfileCompleted,
        };
        // Invalidate cache
        try {
            await redis_1.redis.del(profileCacheKey(userId));
        }
        catch (err) {
            logger_1.logger.warn('Redis cache invalidation failed', { userId });
        }
        return profile;
    }
    // CHANGE PASSWORD — verify current, hash new, invalidate cache
    async changePassword(userId, currentPassword, newPassword) {
        // Must fetch password (select: false in schema)
        const user = await auth_model_1.User.findOne({ _id: userId, isDeleted: false }).select('+password');
        if (!user)
            throw ApiError_1.ApiError.userNotFound();
        // Google-only accounts have no real password
        if (user.authProvider === 'google' && !user.password) {
            throw ApiError_1.ApiError.validationError('This account uses Google Sign-In. Please use "Forgot Password" to set a password.');
        }
        const isMatch = await bcryptjs_1.default.compare(currentPassword, user.password);
        if (!isMatch) {
            throw ApiError_1.ApiError.validationError('Current password is incorrect', 'currentPassword');
        }
        const hashed = await bcryptjs_1.default.hash(newPassword, 10);
        user.password = hashed;
        // Invalidate all sessions — force re-login on other devices
        user.refreshToken = undefined;
        await user.save();
        // Clear auth cache so middleware re-checks
        try {
            await redis_1.redis.del(`auth:check:${userId}`);
        }
        catch {
            logger_1.logger.warn('Redis cache clear failed on password change', { userId });
        }
        // Send security alert email — non-blocking, failure won't affect response
        (0, sendEmail_1.sendPasswordChangedEmail)(user.email, user.firstName).catch(err => logger_1.logger.error('Password change email failed', { userId, error: err.message }));
        return { message: 'Password updated successfully' };
    }
    // SOFT DELETE — clear cache + session + FCM
    async deleteAccount(userId) {
        const user = await auth_model_1.User.findOneAndUpdate({ _id: userId, isDeleted: false }, {
            isDeleted: true,
            deletedAt: new Date(),
            refreshToken: undefined,
            fcmToken: undefined,
            fcmPlatform: undefined,
        }, { new: true });
        if (!user)
            throw ApiError_1.ApiError.userNotFound();
        // Clear all caches for this user
        try {
            await redis_1.redis.del(profileCacheKey(userId));
            await redis_1.redis.del(`auth:check:${userId}`);
        }
        catch (err) {
            logger_1.logger.warn('Redis cache clear failed on delete', { userId });
        }
        return { message: 'Account deleted successfully' };
    }
}
exports.ProfileService = ProfileService;
exports.profileService = new ProfileService();
//# sourceMappingURL=profile.service.js.map
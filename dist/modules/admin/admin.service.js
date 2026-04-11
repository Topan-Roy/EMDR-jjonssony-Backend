"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminService = void 0;
const auth_model_1 = require("../auth/auth.model");
const ApiError_1 = require("../../utils/ApiError");
const redis_1 = require("../../config/redis");
const logger_1 = require("../../config/logger");
const uploadImage_1 = require("../../utils/uploadImage");
const CACHE_KEY = (id) => `admin:profile:${id}`;
const CACHE_TTL = 300; // 5 minutes
exports.adminService = {
    // GET admin profile
    async getProfile(adminId) {
        try {
            const cached = await redis_1.redis.get(CACHE_KEY(adminId));
            if (cached)
                return JSON.parse(cached);
        }
        catch {
            logger_1.logger.warn('Redis read failed for admin profile cache', { adminId });
        }
        const admin = await auth_model_1.User.findOne({ _id: adminId, role: 'admin', isDeleted: false })
            .select('firstName lastName email phoneNumber avatar role createdAt')
            .lean();
        if (!admin)
            throw ApiError_1.ApiError.userNotFound();
        const profile = {
            id: admin._id.toString(),
            name: `${admin.firstName} ${admin.lastName}`.trim(),
            email: admin.email,
            phoneNumber: admin.phoneNumber ?? null,
            profilePic: admin.avatar ?? null,
            role: admin.role,
            memberSince: admin.createdAt,
        };
        try {
            await redis_1.redis.setex(CACHE_KEY(adminId), CACHE_TTL, JSON.stringify(profile));
        }
        catch {
            logger_1.logger.warn('Redis write failed for admin profile cache', { adminId });
        }
        return profile;
    },
    // PATCH admin profile — name, phoneNumber, profilePic
    async updateProfile(adminId, data, profilePicBuffer) {
        const parts = data.name.trim().split(/\s+/);
        const firstName = parts[0];
        const lastName = parts.slice(1).join(' ') || parts[0];
        const updateData = { firstName, lastName };
        if (data.phoneNumber !== undefined)
            updateData.phoneNumber = data.phoneNumber;
        // Upload new profile picture if provided
        if (profilePicBuffer) {
            const existing = await auth_model_1.User.findById(adminId).select('avatar').lean();
            const avatarUrl = await (0, uploadImage_1.uploadToCloudinary)(profilePicBuffer, 'my-emdr/admin-avatars', `admin_avatar_${adminId}`);
            updateData.avatar = avatarUrl;
            if (existing?.avatar) {
                (0, uploadImage_1.deleteFromCloudinary)(existing.avatar).catch(() => { });
            }
        }
        const admin = await auth_model_1.User.findOneAndUpdate({ _id: adminId, role: 'admin', isDeleted: false }, updateData, { returnDocument: 'after', runValidators: true }).select('firstName lastName email phoneNumber avatar role').lean();
        if (!admin)
            throw ApiError_1.ApiError.userNotFound();
        const profile = {
            id: admin._id.toString(),
            name: `${admin.firstName} ${admin.lastName}`.trim(),
            email: admin.email,
            phoneNumber: admin.phoneNumber ?? null,
            profilePic: admin.avatar ?? null,
            role: admin.role,
        };
        // Invalidate cache
        try {
            await redis_1.redis.del(CACHE_KEY(adminId));
        }
        catch {
            logger_1.logger.warn('Redis cache invalidation failed for admin profile', { adminId });
        }
        logger_1.logger.info('Admin profile updated', { adminId });
        return profile;
    },
};
//# sourceMappingURL=admin.service.js.map
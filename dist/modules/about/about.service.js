"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aboutService = void 0;
const about_model_1 = require("./about.model");
const ApiError_1 = require("../../utils/ApiError");
const redis_1 = require("../../config/redis");
const logger_1 = require("../../config/logger");
const CACHE_KEY = 'about:us';
const CACHE_TTL = 3600; // 1 hour
exports.aboutService = {
    // PUBLIC — get (cached)
    async get() {
        try {
            const cached = await redis_1.redis.get(CACHE_KEY);
            if (cached)
                return JSON.parse(cached);
        }
        catch {
            logger_1.logger.warn('Redis read failed for about cache');
        }
        const about = await about_model_1.AboutUs.findOne().select('overview sections updatedAt').lean();
        if (!about)
            throw ApiError_1.ApiError.notFound('About Us content not found');
        try {
            await redis_1.redis.setex(CACHE_KEY, CACHE_TTL, JSON.stringify(about));
        }
        catch {
            logger_1.logger.warn('Redis write failed for about cache');
        }
        return about;
    },
    // ADMIN — create (only one record allowed)
    async create(data, userId) {
        const existing = await about_model_1.AboutUs.findOne();
        if (existing) {
            throw ApiError_1.ApiError.validationError('About Us already exists. Use PUT to update it.');
        }
        const about = await about_model_1.AboutUs.create({ ...data, updatedBy: userId });
        await invalidateCache();
        logger_1.logger.info('About Us created', { userId });
        return about;
    },
    // ADMIN — full update (PUT)
    async update(data, userId) {
        const about = await about_model_1.AboutUs.findOneAndUpdate({}, {
            $set: { ...data, updatedBy: userId },
            $unset: { aboutUs: "" } // Explicitly remove the legacy massive string field
        }, { new: true, upsert: true, runValidators: true, returnDocument: 'after' }).select('overview sections updatedAt').lean();
        await invalidateCache();
        logger_1.logger.info('About Us updated', { userId });
        return about;
    },
};
async function invalidateCache() {
    try {
        await redis_1.redis.del(CACHE_KEY);
    }
    catch {
        logger_1.logger.warn('Redis cache invalidation failed for about');
    }
}
//# sourceMappingURL=about.service.js.map
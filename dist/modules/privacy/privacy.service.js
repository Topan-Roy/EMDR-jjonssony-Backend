"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.privacyService = void 0;
const privacy_model_1 = require("./privacy.model");
const ApiError_1 = require("../../utils/ApiError");
const redis_1 = require("../../config/redis");
const logger_1 = require("../../config/logger");
const CACHE_KEY = 'privacy:active';
const CACHE_TTL = 3600;
exports.privacyService = {
    // PUBLIC — get active policy (Redis cached)
    async getActive() {
        try {
            const cached = await redis_1.redis.get(CACHE_KEY);
            if (cached)
                return JSON.parse(cached);
        }
        catch {
            logger_1.logger.warn('Redis read failed for privacy cache');
        }
        const policy = await privacy_model_1.PrivacyPolicy.findOne({ isActive: true })
            .select('-createdBy -updatedBy -__v')
            .lean();
        if (!policy)
            throw ApiError_1.ApiError.notFound('Privacy Policy not found');
        policy.sections.sort((a, b) => a.order - b.order);
        try {
            await redis_1.redis.setex(CACHE_KEY, CACHE_TTL, JSON.stringify(policy));
        }
        catch {
            logger_1.logger.warn('Redis write failed for privacy cache');
        }
        return policy;
    },
    // ADMIN — all versions
    async getAll() {
        return privacy_model_1.PrivacyPolicy.find()
            .select('version overview effectiveDate changelog isActive createdAt')
            .sort({ createdAt: -1 })
            .lean();
    },
    // ADMIN — single by id
    async getById(id) {
        const policy = await privacy_model_1.PrivacyPolicy.findById(id).lean();
        if (!policy)
            throw ApiError_1.ApiError.notFound('Privacy Policy not found');
        return policy;
    },
    // ADMIN — create new version (auto-activates)
    async create(data, userId) {
        await privacy_model_1.PrivacyPolicy.updateMany({ isActive: true }, { isActive: false });
        const policy = await privacy_model_1.PrivacyPolicy.create({
            ...data,
            effectiveDate: data.effectiveDate ? new Date(data.effectiveDate) : new Date(),
            lastUpdated: data.lastUpdated ? new Date(data.lastUpdated) : new Date(),
            isActive: true,
            createdBy: userId,
        });
        await invalidateCache();
        logger_1.logger.info('Privacy Policy created', { version: policy.version, userId });
        return policy;
    },
    // ADMIN — full replace (PUT)
    async replace(id, data, userId) {
        const policy = await privacy_model_1.PrivacyPolicy.findByIdAndUpdate(id, {
            version: data.version,
            overview: data.overview,
            sections: data.sections,
            contactEmail: data.contactEmail,
            contactName: data.contactName,
            changelog: data.changelog ?? '',
            effectiveDate: data.effectiveDate ? new Date(data.effectiveDate) : new Date(),
            lastUpdated: data.lastUpdated ? new Date(data.lastUpdated) : new Date(),
            updatedBy: userId,
        }, { returnDocument: 'after', runValidators: true }).lean();
        if (!policy)
            throw ApiError_1.ApiError.notFound('Privacy Policy not found');
        await invalidateCache();
        logger_1.logger.info('Privacy Policy fully replaced', { id, userId });
        return policy;
    },
    // ADMIN — partial update (PATCH)
    async update(id, data, userId) {
        const updateData = { ...data, updatedBy: userId };
        if (data.effectiveDate)
            updateData.effectiveDate = new Date(data.effectiveDate);
        if (data.lastUpdated)
            updateData.lastUpdated = new Date(data.lastUpdated);
        const policy = await privacy_model_1.PrivacyPolicy.findByIdAndUpdate(id, updateData, { returnDocument: 'after', runValidators: true }).lean();
        if (!policy)
            throw ApiError_1.ApiError.notFound('Privacy Policy not found');
        await invalidateCache();
        logger_1.logger.info('Privacy Policy updated', { id, userId });
        return policy;
    },
    // ADMIN — activate a version
    async setActive(id, userId) {
        const policy = await privacy_model_1.PrivacyPolicy.findById(id);
        if (!policy)
            throw ApiError_1.ApiError.notFound('Privacy Policy not found');
        await privacy_model_1.PrivacyPolicy.updateMany({ isActive: true }, { isActive: false });
        policy.isActive = true;
        policy.updatedBy = userId;
        await policy.save();
        await invalidateCache();
        logger_1.logger.info('Privacy Policy version activated', { id, userId });
        return policy;
    },
    // ADMIN — delete (cannot delete active)
    async delete(id) {
        const policy = await privacy_model_1.PrivacyPolicy.findById(id);
        if (!policy)
            throw ApiError_1.ApiError.notFound('Privacy Policy not found');
        if (policy.isActive) {
            throw ApiError_1.ApiError.validationError('Cannot delete the active Privacy Policy. Activate another version first.');
        }
        await privacy_model_1.PrivacyPolicy.findByIdAndDelete(id);
        logger_1.logger.info('Privacy Policy version deleted', { id });
        return { message: 'Privacy Policy deleted successfully' };
    },
};
async function invalidateCache() {
    try {
        await redis_1.redis.del(CACHE_KEY);
    }
    catch {
        logger_1.logger.warn('Redis cache invalidation failed for privacy');
    }
}
//# sourceMappingURL=privacy.service.js.map
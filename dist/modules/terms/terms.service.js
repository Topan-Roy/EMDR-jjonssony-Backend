"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.termsService = void 0;
const terms_model_1 = require("./terms.model");
const terms_acceptance_model_1 = require("./terms-acceptance.model");
const ApiError_1 = require("../../utils/ApiError");
const redis_1 = require("../../config/redis");
const logger_1 = require("../../config/logger");
const CACHE_KEY = 'terms:active';
const CACHE_TTL = 3600; // 1 hour
exports.termsService = {
    // PUBLIC — get active T&C (Redis cached)
    async getActive() {
        try {
            const cached = await redis_1.redis.get(CACHE_KEY);
            if (cached)
                return JSON.parse(cached);
        }
        catch {
            logger_1.logger.warn('Redis read failed for terms cache');
        }
        const terms = await terms_model_1.Terms.findOne({ isActive: true })
            .select('-createdBy -updatedBy -__v')
            .lean();
        if (!terms)
            throw ApiError_1.ApiError.notFound('Terms & Conditions not found');
        terms.sections.sort((a, b) => a.order - b.order);
        try {
            await redis_1.redis.setex(CACHE_KEY, CACHE_TTL, JSON.stringify(terms));
        }
        catch {
            logger_1.logger.warn('Redis write failed for terms cache');
        }
        return terms;
    },
    // PUBLIC — user accepts active T&C
    async acceptTerms(userId, termsId, ipAddress, userAgent) {
        const terms = await terms_model_1.Terms.findOne({ _id: termsId, isActive: true }).lean();
        if (!terms)
            throw ApiError_1.ApiError.notFound('Terms & Conditions not found or not active');
        // Upsert — if already accepted, update timestamp (re-acceptance)
        const acceptance = await terms_acceptance_model_1.TermsAcceptance.findOneAndUpdate({ userId, termsId }, {
            userId,
            termsId,
            version: terms.version,
            acceptedAt: new Date(),
            ipAddress,
            userAgent,
        }, { upsert: true, new: true });
        logger_1.logger.info('T&C accepted', { userId, version: terms.version, termsId });
        return {
            message: 'Terms & Conditions accepted successfully',
            version: terms.version,
            acceptedAt: acceptance.acceptedAt,
        };
    },
    // PUBLIC — check if user has accepted current active T&C
    async checkAcceptance(userId) {
        const active = await terms_model_1.Terms.findOne({ isActive: true }).select('_id version effectiveDate').lean();
        if (!active)
            throw ApiError_1.ApiError.notFound('No active Terms & Conditions found');
        const acceptance = await terms_acceptance_model_1.TermsAcceptance.findOne({
            userId,
            termsId: active._id,
        }).lean();
        return {
            hasAccepted: !!acceptance,
            currentVersion: active.version,
            effectiveDate: active.effectiveDate,
            acceptedAt: acceptance?.acceptedAt ?? null,
        };
    },
    // ADMIN — get all versions (history)
    async getAll() {
        return terms_model_1.Terms.find()
            .select('version lastUpdated effectiveDate changelog isActive createdAt')
            .sort({ createdAt: -1 })
            .lean();
    },
    // ADMIN — get single by id
    async getById(id) {
        const terms = await terms_model_1.Terms.findById(id).lean();
        if (!terms)
            throw ApiError_1.ApiError.notFound('Terms & Conditions not found');
        return terms;
    },
    // ADMIN — create new version
    async create(data, userId) {
        await terms_model_1.Terms.updateMany({ isActive: true }, { isActive: false });
        const terms = await terms_model_1.Terms.create({
            ...data,
            lastUpdated: data.lastUpdated ? new Date(data.lastUpdated) : new Date(),
            effectiveDate: data.effectiveDate ? new Date(data.effectiveDate) : new Date(),
            isActive: true,
            createdBy: userId,
        });
        await invalidateCache();
        logger_1.logger.info('New T&C version created', { version: terms.version, userId });
        return terms;
    },
    // ADMIN — full replace (PUT)
    async replace(id, data, userId) {
        const terms = await terms_model_1.Terms.findByIdAndUpdate(id, {
            version: data.version,
            sections: data.sections,
            contactEmail: data.contactEmail,
            contactName: data.contactName,
            changelog: data.changelog ?? '',
            lastUpdated: data.lastUpdated ? new Date(data.lastUpdated) : new Date(),
            effectiveDate: data.effectiveDate ? new Date(data.effectiveDate) : new Date(),
            updatedBy: userId,
        }, { new: true, runValidators: true, overwrite: false }).lean();
        if (!terms)
            throw ApiError_1.ApiError.notFound('Terms & Conditions not found');
        await invalidateCache();
        logger_1.logger.info('T&C fully replaced', { id, version: data.version, userId });
        return terms;
    },
    // ADMIN — update existing version
    async update(id, data, userId) {
        const terms = await terms_model_1.Terms.findByIdAndUpdate(id, {
            ...data,
            ...(data.lastUpdated && { lastUpdated: new Date(data.lastUpdated) }),
            ...(data.effectiveDate && { effectiveDate: new Date(data.effectiveDate) }),
            updatedBy: userId,
        }, { returnDocument: 'after', runValidators: true }).lean();
        if (!terms)
            throw ApiError_1.ApiError.notFound('Terms & Conditions not found');
        await invalidateCache();
        logger_1.logger.info('T&C updated', { id, userId });
        return terms;
    },
    // ADMIN — activate a specific version
    async setActive(id, userId) {
        const exists = await terms_model_1.Terms.findById(id);
        if (!exists)
            throw ApiError_1.ApiError.notFound('Terms & Conditions not found');
        await terms_model_1.Terms.updateMany({ isActive: true }, { isActive: false });
        exists.isActive = true;
        exists.updatedBy = userId;
        await exists.save();
        await invalidateCache();
        logger_1.logger.info('T&C version activated', { id, userId });
        return exists;
    },
    // ADMIN — delete (cannot delete active)
    async delete(id) {
        const terms = await terms_model_1.Terms.findById(id);
        if (!terms)
            throw ApiError_1.ApiError.notFound('Terms & Conditions not found');
        if (terms.isActive) {
            throw ApiError_1.ApiError.validationError('Cannot delete the active Terms & Conditions. Activate another version first.');
        }
        await Promise.all([
            terms_model_1.Terms.findByIdAndDelete(id),
            terms_acceptance_model_1.TermsAcceptance.deleteMany({ termsId: id }), // clean up acceptance records too
        ]);
        logger_1.logger.info('T&C version deleted', { id });
        return { message: 'Terms & Conditions deleted successfully' };
    },
    // ADMIN — get acceptance stats for a version
    async getAcceptanceStats(termsId) {
        const terms = await terms_model_1.Terms.findById(termsId).select('version').lean();
        if (!terms)
            throw ApiError_1.ApiError.notFound('Terms & Conditions not found');
        const [total, recentAcceptances] = await Promise.all([
            terms_acceptance_model_1.TermsAcceptance.countDocuments({ termsId }),
            terms_acceptance_model_1.TermsAcceptance.find({ termsId })
                .sort({ acceptedAt: -1 })
                .limit(10)
                .populate('userId', 'firstName lastName email')
                .lean(),
        ]);
        return {
            version: terms.version,
            totalAcceptances: total,
            recentAcceptances,
        };
    },
};
async function invalidateCache() {
    try {
        await redis_1.redis.del(CACHE_KEY);
    }
    catch {
        logger_1.logger.warn('Redis cache invalidation failed for terms');
    }
}
//# sourceMappingURL=terms.service.js.map
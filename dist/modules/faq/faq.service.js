"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.faqService = void 0;
const faq_model_1 = require("./faq.model");
const ApiError_1 = require("../../utils/ApiError");
const redis_1 = require("../../config/redis");
const logger_1 = require("../../config/logger");
const CACHE_KEY = 'faq:active';
const CACHE_TTL = 1800; // 30 minutes
exports.faqService = {
    // PUBLIC — all active FAQs ordered by `order` field (cached)
    async getAll() {
        try {
            const cached = await redis_1.redis.get(CACHE_KEY);
            if (cached)
                return JSON.parse(cached);
        }
        catch {
            logger_1.logger.warn('Redis read failed for FAQ cache');
        }
        const faqs = await faq_model_1.FAQ.find({ isActive: true })
            .select('-createdBy -updatedBy -__v')
            .sort({ order: 1, createdAt: 1 })
            .lean();
        const result = faqs.map((faq, index) => ({ ...faq, displayId: index + 1 }));
        try {
            await redis_1.redis.setex(CACHE_KEY, CACHE_TTL, JSON.stringify(result));
        }
        catch {
            logger_1.logger.warn('Redis write failed for FAQ cache');
        }
        return result;
    },
    async getById(id) {
        const faq = await faq_model_1.FAQ.findOne({ _id: id, isActive: true })
            .select('-createdBy -updatedBy -__v')
            .lean();
        if (!faq)
            throw ApiError_1.ApiError.notFound('FAQ not found');
        return faq;
    },
    // ADMIN — all FAQs including inactive
    async getAllAdmin() {
        const faqs = await faq_model_1.FAQ.find()
            .select('-__v')
            .sort({ order: 1, createdAt: 1 })
            .lean();
        return faqs.map((faq, index) => ({ ...faq, displayId: index + 1 }));
    },
    // ADMIN — create
    async create(data, userId) {
        // Auto-assign order if not provided
        if (data.order === undefined) {
            const last = await faq_model_1.FAQ.findOne().sort({ order: -1 }).select('order').lean();
            data.order = last ? last.order + 1 : 0;
        }
        const faq = await faq_model_1.FAQ.create({ ...data, createdBy: userId });
        await invalidateCache();
        logger_1.logger.info('FAQ created', { id: faq._id, userId });
        return faq;
    },
    // ADMIN — update (PATCH)
    async update(id, data, userId) {
        const faq = await faq_model_1.FAQ.findByIdAndUpdate(id, { ...data, updatedBy: userId }, { returnDocument: 'after', runValidators: true }).lean();
        if (!faq)
            throw ApiError_1.ApiError.notFound('FAQ not found');
        await invalidateCache();
        logger_1.logger.info('FAQ updated', { id, userId });
        return faq;
    },
    // ADMIN — bulk reorder (drag & drop support)
    async reorder(items, userId) {
        const bulkOps = items.map(({ id, order }) => ({
            updateOne: {
                filter: { _id: id },
                update: { order, updatedBy: userId },
            },
        }));
        await faq_model_1.FAQ.bulkWrite(bulkOps);
        await invalidateCache();
        logger_1.logger.info('FAQs reordered', { count: items.length, userId });
        return { message: 'FAQs reordered successfully', updated: items.length };
    },
    // ADMIN — delete
    async delete(id) {
        const faq = await faq_model_1.FAQ.findByIdAndDelete(id);
        if (!faq)
            throw ApiError_1.ApiError.notFound('FAQ not found');
        await invalidateCache();
        logger_1.logger.info('FAQ deleted', { id });
        return { message: 'FAQ deleted successfully' };
    },
};
async function invalidateCache() {
    try {
        await redis_1.redis.del(CACHE_KEY);
    }
    catch {
        logger_1.logger.warn('Redis cache invalidation failed for FAQ');
    }
}
//# sourceMappingURL=faq.service.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAdmin = exports.authenticate = void 0;
const jwt_1 = require("../utils/jwt");
const ApiError_1 = require("../utils/ApiError");
const auth_model_1 = require("../modules/auth/auth.model");
const redis_1 = require("../config/redis");
const logger_1 = require("../config/logger");
const authenticate = async (req, _res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith('Bearer ')) {
            throw ApiError_1.ApiError.unauthorized('No token provided');
        }
        const token = authHeader.substring(7);
        const decoded = (0, jwt_1.verifyToken)(token);
        const { userId } = decoded;
        // Check Redis cache first — avoids DB hit on every request
        const cacheKey = `auth:check:${userId}`;
        let isActive = null;
        try {
            const cached = await redis_1.redis.get(cacheKey);
            if (cached !== null) {
                isActive = cached === '1';
            }
        }
        catch {
            logger_1.logger.warn('Redis auth check failed, falling back to DB', { userId });
        }
        if (isActive === null) {
            // Cache miss — query DB
            const user = await auth_model_1.User.findOne({ _id: userId, isDeleted: false }).select('_id').lean();
            isActive = !!user;
            try {
                // Cache result: '1' = active, '0' = deleted
                await redis_1.redis.setex(cacheKey, redis_1.CACHE_TTL.AUTH_CHECK, isActive ? '1' : '0');
            }
            catch {
                // Non-fatal
            }
        }
        if (!isActive) {
            throw ApiError_1.ApiError.unauthorized('Account no longer exists');
        }
        req.user = decoded;
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.authenticate = authenticate;
const requireAdmin = (req, _res, next) => {
    if (req.user?.role !== 'admin') {
        return next(ApiError_1.ApiError.forbidden('Admin access required'));
    }
    next();
};
exports.requireAdmin = requireAdmin;
//# sourceMappingURL=authMiddleware.js.map
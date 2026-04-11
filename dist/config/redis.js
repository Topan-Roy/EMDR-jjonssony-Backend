"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CACHE_TTL = exports.redis = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
const logger_1 = require("./logger");
const REDIS_URL = process.env.REDIS_URL ?? 'redis://localhost:6379';
exports.redis = new ioredis_1.default(REDIS_URL, {
    maxRetriesPerRequest: null, // required by BullMQ
    enableReadyCheck: false,
    lazyConnect: true,
});
exports.redis.on('connect', () => logger_1.logger.info('Redis connected'));
exports.redis.on('error', (err) => logger_1.logger.error('Redis error', { error: err.message }));
exports.CACHE_TTL = {
    PROFILE: 300, // 5 minutes
    AUTH_CHECK: 60, // 1 minute
};
// Graceful shutdown
process.on('SIGTERM', async () => {
    await exports.redis.quit();
});
//# sourceMappingURL=redis.js.map
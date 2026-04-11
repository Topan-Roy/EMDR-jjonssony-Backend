"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const env_1 = require("./config/env");
const database_1 = __importDefault(require("./config/database"));
const redis_1 = require("./config/redis");
const queue_1 = require("./config/queue");
const logger_1 = require("./config/logger");
const startServer = async () => {
    try {
        // Connect DB
        await database_1.default.connect();
        logger_1.logger.info('Database connected');
        // Connect Redis (lazy connect)
        await redis_1.redis.connect().catch(() => {
            logger_1.logger.warn('Redis unavailable — caching disabled, app will still work');
        });
        // Start BullMQ notification worker
        (0, queue_1.startNotificationWorker)();
        const server = app_1.default.listen(env_1.env.PORT, () => {
            logger_1.logger.info(`Server running on port ${env_1.env.PORT} [${env_1.env.NODE_ENV}]`);
        });
        // Graceful shutdown
        const shutdown = async (signal) => {
            logger_1.logger.info(`${signal} received — shutting down gracefully`);
            server.close(async () => {
                await database_1.default.disconnect();
                await redis_1.redis.quit();
                logger_1.logger.info('Server closed');
                process.exit(0);
            });
            // Force exit after 10s
            setTimeout(() => process.exit(1), 10_000);
        };
        process.on('SIGTERM', () => shutdown('SIGTERM'));
        process.on('SIGINT', () => shutdown('SIGINT'));
    }
    catch (error) {
        logger_1.logger.error('Failed to start server', { error });
        process.exit(1);
    }
};
startServer();
//# sourceMappingURL=server.js.map
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.startNotificationWorker = exports.notificationQueue = void 0;
const bullmq_1 = require("bullmq");
const redis_1 = require("./redis");
const logger_1 = require("./logger");
const connection = redis_1.redis;
// Queue
exports.notificationQueue = new bullmq_1.Queue('notifications', {
    connection,
    defaultJobOptions: {
        attempts: 3,
        backoff: { type: 'exponential', delay: 2000 },
        removeOnComplete: { count: 100 },
        removeOnFail: { count: 500 },
    },
});
// Worker — processes jobs in background
let worker = null;
const startNotificationWorker = () => {
    worker = new bullmq_1.Worker('notifications', async (job) => {
        const { tokens, userIds, title, body, data, imageUrl } = job.data;
        // Lazy import to avoid circular deps
        const { sendToMultiple } = await Promise.resolve().then(() => __importStar(require('../utils/sendNotification')));
        const { Notification } = await Promise.resolve().then(() => __importStar(require('../modules/notification/notification.model')));
        // Send in batches of 500 (FCM limit)
        const BATCH = 500;
        let totalSent = 0;
        let totalFailed = 0;
        for (let i = 0; i < tokens.length; i += BATCH) {
            const batchTokens = tokens.slice(i, i + BATCH);
            const batchUserIds = userIds.slice(i, i + BATCH);
            const result = await sendToMultiple(batchTokens, { title, body, data, imageUrl });
            totalSent += result?.successCount ?? 0;
            totalFailed += result?.failureCount ?? 0;
            await Notification.insertMany(batchUserIds.map(userId => ({ userId, title, body, data, imageUrl })));
            logger_1.logger.debug(`Broadcast batch ${i / BATCH + 1}: sent=${totalSent} failed=${totalFailed}`);
        }
        return { sent: totalSent, failed: totalFailed };
    }, { connection, concurrency: 2 });
    worker.on('completed', (job) => logger_1.logger.info('Broadcast job completed', { jobId: job.id, result: job.returnvalue }));
    worker.on('failed', (job, err) => logger_1.logger.error('Broadcast job failed', { jobId: job?.id, error: err.message }));
    logger_1.logger.info('Notification worker started');
};
exports.startNotificationWorker = startNotificationWorker;
//# sourceMappingURL=queue.js.map
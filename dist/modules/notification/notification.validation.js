"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNotificationSchema = exports.markReadSchema = exports.paginationSchema = exports.topicSchema = exports.broadcastSchema = exports.sendToUserSchema = exports.registerTokenSchema = void 0;
const zod_1 = require("zod");
exports.registerTokenSchema = zod_1.z.object({
    body: zod_1.z.object({
        fcmToken: zod_1.z.string().min(10, 'Invalid FCM token'),
        platform: zod_1.z.enum(['android', 'ios', 'web']),
    }),
});
exports.sendToUserSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string().regex(/^[a-f\d]{24}$/i, 'Invalid user ID format'),
        title: zod_1.z.string().min(1).max(100),
        body: zod_1.z.string().min(1).max(500),
        data: zod_1.z.record(zod_1.z.string()).optional(),
        imageUrl: zod_1.z.string().url().optional(),
    }),
});
exports.broadcastSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(1).max(100),
        body: zod_1.z.string().min(1).max(500),
        role: zod_1.z.enum(['user', 'admin']).optional(),
        data: zod_1.z.record(zod_1.z.string()).optional(),
        imageUrl: zod_1.z.string().url().optional(),
    }),
});
exports.topicSchema = zod_1.z.object({
    body: zod_1.z.object({
        topic: zod_1.z.string().min(1),
        title: zod_1.z.string().min(1).max(100),
        body: zod_1.z.string().min(1).max(500),
        data: zod_1.z.record(zod_1.z.string()).optional(),
        imageUrl: zod_1.z.string().url().optional(),
    }),
});
exports.paginationSchema = zod_1.z.object({
    query: zod_1.z.object({
        page: zod_1.z.coerce.number().int().min(1).default(1),
        limit: zod_1.z.coerce.number().int().min(1).max(50).default(20),
    }),
});
exports.markReadSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().min(1, 'Notification ID is required'),
    }),
});
exports.deleteNotificationSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().min(1, 'Notification ID is required'),
    }),
});
//# sourceMappingURL=notification.validation.js.map
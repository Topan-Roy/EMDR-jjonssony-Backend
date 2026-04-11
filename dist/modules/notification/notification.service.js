"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationService = void 0;
const auth_model_1 = require("../auth/auth.model");
const notification_model_1 = require("./notification.model");
const sendNotification_1 = require("../../utils/sendNotification");
const ApiError_1 = require("../../utils/ApiError");
const queue_1 = require("../../config/queue");
const logger_1 = require("../../config/logger");
exports.notificationService = {
    async registerToken(userId, fcmToken, platform) {
        const user = await auth_model_1.User.findOneAndUpdate({ _id: userId, isDeleted: false }, { fcmToken, fcmPlatform: platform }, { returnDocument: 'after' }).select('firstName email fcmToken');
        if (!user)
            throw ApiError_1.ApiError.userNotFound();
        return user;
    },
    async removeToken(userId) {
        await auth_model_1.User.findOneAndUpdate({ _id: userId, isDeleted: false }, { $unset: { fcmToken: 1, fcmPlatform: 1 } });
    },
    async sendToUser(userId, payload) {
        const user = await auth_model_1.User.findOne({ _id: userId, isDeleted: false }).select('fcmToken').lean();
        if (!user)
            throw ApiError_1.ApiError.userNotFound();
        if (!user.fcmToken)
            throw new ApiError_1.ApiError(400, 'NO_FCM_TOKEN', 'User has no registered device');
        let fcmResult;
        try {
            fcmResult = await (0, sendNotification_1.sendToToken)(user.fcmToken, payload);
        }
        catch (err) {
            // FCM token invalid — clean it up automatically
            if (err?.errorInfo?.code === 'messaging/registration-token-not-registered') {
                await auth_model_1.User.findByIdAndUpdate(userId, { $unset: { fcmToken: 1, fcmPlatform: 1 } });
                logger_1.logger.warn('Stale FCM token removed', { userId });
                throw new ApiError_1.ApiError(400, 'NO_FCM_TOKEN', 'Device token expired. Please re-register.');
            }
            throw err;
        }
        const notification = await notification_model_1.Notification.create({ userId, ...payload });
        return { fcmResult, notification };
    },
    // Broadcast via BullMQ queue — non-blocking, handles 100k+ users
    async broadcast(payload, role) {
        const filter = {
            isDeleted: false,
            fcmToken: { $exists: true, $ne: null },
        };
        if (role)
            filter.role = role;
        const users = await auth_model_1.User.find(filter).select('_id fcmToken').lean();
        if (!users.length)
            return { queued: 0, message: 'No eligible users' };
        const tokens = users.map(u => u.fcmToken);
        const userIds = users.map(u => u._id.toString());
        await queue_1.notificationQueue.add('broadcast', {
            tokens,
            userIds,
            ...payload,
        });
        logger_1.logger.info('Broadcast job queued', { recipients: users.length, role: role ?? 'all' });
        return { queued: users.length, message: 'Broadcast queued successfully' };
    },
    async sendToTopic(topic, payload) {
        return (0, sendNotification_1.sendToTopic)(topic, payload);
    },
    async getMyNotifications(userId, page, limit) {
        const skip = (page - 1) * limit;
        const [notifications, total, unreadCount] = await Promise.all([
            notification_model_1.Notification.find({ userId }).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
            notification_model_1.Notification.countDocuments({ userId }),
            notification_model_1.Notification.countDocuments({ userId, isRead: false }),
        ]);
        return {
            notifications,
            total,
            unreadCount,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
            hasNextPage: page * limit < total,
        };
    },
    async markAsRead(userId, notificationId) {
        const filter = notificationId
            ? { _id: notificationId, userId }
            : { userId, isRead: false };
        const { modifiedCount } = await notification_model_1.Notification.updateMany(filter, {
            isRead: true,
            readAt: new Date(),
        });
        return { updated: modifiedCount };
    },
    async deleteNotification(userId, notificationId) {
        const result = await notification_model_1.Notification.findOneAndDelete({ _id: notificationId, userId });
        if (!result)
            throw ApiError_1.ApiError.notFound('Notification not found');
        return result;
    },
};
//# sourceMappingURL=notification.service.js.map
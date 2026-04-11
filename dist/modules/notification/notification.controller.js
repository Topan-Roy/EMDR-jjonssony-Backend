"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationController = void 0;
const notification_service_1 = require("./notification.service");
const response_1 = require("../../utils/response");
const svc = notification_service_1.notificationService;
exports.notificationController = {
    registerToken: async (req, res, next) => {
        try {
            const { fcmToken, platform } = req.body;
            const data = await svc.registerToken(req.user.userId, fcmToken, platform);
            (0, response_1.sendSuccess)(res, { message: 'FCM token registered', user: data });
        }
        catch (e) {
            next(e);
        }
    },
    removeToken: async (req, res, next) => {
        try {
            await svc.removeToken(req.user.userId);
            (0, response_1.sendSuccess)(res, { message: 'FCM token removed' });
        }
        catch (e) {
            next(e);
        }
    },
    sendToUser: async (req, res, next) => {
        try {
            const { userId, ...payload } = req.body;
            const data = await svc.sendToUser(userId, payload);
            (0, response_1.sendSuccess)(res, { message: 'Notification sent', fcmResult: data.fcmResult, notification: data.notification });
        }
        catch (e) {
            next(e);
        }
    },
    broadcast: async (req, res, next) => {
        try {
            const { role, ...payload } = req.body;
            const data = await svc.broadcast(payload, role);
            (0, response_1.sendSuccess)(res, data);
        }
        catch (e) {
            next(e);
        }
    },
    sendToTopic: async (req, res, next) => {
        try {
            const { topic, ...payload } = req.body;
            const result = await svc.sendToTopic(topic, payload);
            (0, response_1.sendSuccess)(res, { message: 'Topic notification sent', messageId: result });
        }
        catch (e) {
            next(e);
        }
    },
    getMyNotifications: async (req, res, next) => {
        try {
            const page = Math.max(1, parseInt(String(req.query.page ?? '1'), 10) || 1);
            const limit = Math.min(50, Math.max(1, parseInt(String(req.query.limit ?? '20'), 10) || 20));
            const data = await svc.getMyNotifications(req.user.userId, page, limit);
            (0, response_1.sendSuccess)(res, data);
        }
        catch (e) {
            next(e);
        }
    },
    markAsRead: async (req, res, next) => {
        try {
            const data = await svc.markAsRead(req.user.userId, req.params.id);
            (0, response_1.sendSuccess)(res, data);
        }
        catch (e) {
            next(e);
        }
    },
    deleteNotification: async (req, res, next) => {
        try {
            await svc.deleteNotification(req.user.userId, req.params.id);
            (0, response_1.sendSuccess)(res, { message: 'Notification deleted' });
        }
        catch (e) {
            next(e);
        }
    },
};
//# sourceMappingURL=notification.controller.js.map
import { NotificationPayload } from '../../utils/sendNotification';
export declare const notificationService: {
    registerToken(userId: string, fcmToken: string, platform: string): Promise<import("mongoose").Document<unknown, {}, import("../auth/auth.model").IUser, {}, import("mongoose").DefaultSchemaOptions> & import("../auth/auth.model").IUser & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    removeToken(userId: string): Promise<void>;
    sendToUser(userId: string, payload: NotificationPayload): Promise<{
        fcmResult: string;
        notification: import("mongoose").Document<unknown, {}, import("./notification.model").INotification, {}, import("mongoose").DefaultSchemaOptions> & import("./notification.model").INotification & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        };
    }>;
    broadcast(payload: NotificationPayload, role?: string): Promise<{
        queued: number;
        message: string;
    }>;
    sendToTopic(topic: string, payload: NotificationPayload): Promise<string>;
    getMyNotifications(userId: string, page: number, limit: number): Promise<{
        notifications: (import("./notification.model").INotification & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
        total: number;
        unreadCount: number;
        page: number;
        limit: number;
        totalPages: number;
        hasNextPage: boolean;
    }>;
    markAsRead(userId: string, notificationId?: string): Promise<{
        updated: number;
    }>;
    deleteNotification(userId: string, notificationId: string): Promise<import("mongoose").Document<unknown, {}, import("./notification.model").INotification, {}, import("mongoose").DefaultSchemaOptions> & import("./notification.model").INotification & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
};
//# sourceMappingURL=notification.service.d.ts.map
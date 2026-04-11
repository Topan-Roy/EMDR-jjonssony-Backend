import { Response, NextFunction } from 'express';
import { AuthRequest } from '../../middleware/authMiddleware';
export declare const notificationController: {
    registerToken: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
    removeToken: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
    sendToUser: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
    broadcast: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
    sendToTopic: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
    getMyNotifications: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
    markAsRead: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
    deleteNotification: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
};
//# sourceMappingURL=notification.controller.d.ts.map
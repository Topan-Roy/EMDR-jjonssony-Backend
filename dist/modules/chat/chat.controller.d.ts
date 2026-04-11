import { Response, NextFunction } from 'express';
import { AuthRequest } from '../../middleware/authMiddleware';
export declare const chatController: {
    getOrCreateConversation: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
    sendMessage: (req: AuthRequest, res: Response, next: NextFunction) => void;
    getMessages: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
    getUnreadCount: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
    getAllConversations: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
    deleteForMe: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
    deleteForEveryone: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
    adminDeleteMessage: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
};
//# sourceMappingURL=chat.controller.d.ts.map
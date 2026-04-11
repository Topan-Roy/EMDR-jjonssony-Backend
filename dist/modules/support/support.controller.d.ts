import { Response, NextFunction } from 'express';
import { AuthRequest } from '../../middleware/authMiddleware';
export declare const supportController: {
    /**
     * Submit a support ticket (User)
     */
    create: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
    /**
     * Get my tickets (User)
     */
    getMyTickets: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
    /**
     * Get ticket BY ID (User or Admin)
     */
    getById: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
    /**
     * Get all tickets (Admin)
     */
    getAllAdmin: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
    /**
     * Respond to a ticket (Admin)
     */
    respond: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
};
//# sourceMappingURL=support.controller.d.ts.map
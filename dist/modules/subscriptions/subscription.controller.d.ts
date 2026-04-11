import { Response, NextFunction } from 'express';
import { AuthRequest } from '../../middleware/authMiddleware';
export declare const subscriptionController: {
    /**
     * Get all active pricing plans (Public)
     */
    getPlans: (_req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
    /**
     * Get user's current subscription
     */
    getMySubscription: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
    /**
     * Standard Subscription (Standard/Premium)
     */
    subscribe: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
    /**
     * Apply for Community Access (Free)
     */
    apply: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
    adminGetPlans: (_req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
    adminCreatePlan: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
    adminUpdatePlan: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
    adminGetRequests: (_req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
    adminReviewRequest: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
};
//# sourceMappingURL=subscription.controller.d.ts.map
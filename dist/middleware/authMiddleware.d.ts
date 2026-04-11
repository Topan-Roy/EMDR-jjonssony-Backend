import { Request, Response, NextFunction } from 'express';
export interface AuthRequest extends Request {
    user?: {
        userId: string;
        role: string;
        isVerified: boolean;
    };
}
export declare const authenticate: (req: AuthRequest, _res: Response, next: NextFunction) => Promise<void>;
export declare const requireAdmin: (req: AuthRequest, _res: Response, next: NextFunction) => void;
//# sourceMappingURL=authMiddleware.d.ts.map
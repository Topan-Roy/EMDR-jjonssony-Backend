import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../../middleware/authMiddleware';
export declare const aboutController: {
    get: (_req: Request, res: Response, next: NextFunction) => Promise<void>;
    create: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
    update: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
};
//# sourceMappingURL=about.controller.d.ts.map
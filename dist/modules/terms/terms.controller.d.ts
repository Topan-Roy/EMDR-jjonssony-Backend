import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../../middleware/authMiddleware';
export declare const termsController: {
    getActive: (_req: Request, res: Response, next: NextFunction) => Promise<void>;
    acceptTerms: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
    checkAcceptance: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
    getAll: (_req: Request, res: Response, next: NextFunction) => Promise<void>;
    getById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    create: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
    replace: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
    update: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
    setActive: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
    delete: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getAcceptanceStats: (req: Request, res: Response, next: NextFunction) => Promise<void>;
};
//# sourceMappingURL=terms.controller.d.ts.map
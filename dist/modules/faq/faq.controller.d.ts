import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../../middleware/authMiddleware';
export declare const faqController: {
    getAll: (_req: Request, res: Response, next: NextFunction) => Promise<void>;
    getById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getAllAdmin: (_req: Request, res: Response, next: NextFunction) => Promise<void>;
    create: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
    update: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
    reorder: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
    delete: (req: Request, res: Response, next: NextFunction) => Promise<void>;
};
//# sourceMappingURL=faq.controller.d.ts.map
import { Response, NextFunction } from 'express';
import { AuthRequest } from '../../middleware/authMiddleware';
export declare const locationController: {
    share: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
    getMyLocation: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
};
//# sourceMappingURL=location.controller.d.ts.map
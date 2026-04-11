import { Response, NextFunction } from 'express';
import { AuthRequest } from '../../middleware/authMiddleware';
export declare class ProfileController {
    getProfile(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
    updateProfile(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
    deleteAccount(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
    changePassword(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
}
export declare const profileController: ProfileController;
//# sourceMappingURL=profile.controller.d.ts.map
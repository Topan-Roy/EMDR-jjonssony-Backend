import { Request, Response, NextFunction } from 'express';
export declare class AuthController {
    signup(req: Request, res: Response, next: NextFunction): Promise<void>;
    login(req: Request, res: Response, next: NextFunction): Promise<void>;
    verifyOTP(req: Request, res: Response, next: NextFunction): Promise<void>;
    resendOTP(req: Request, res: Response, next: NextFunction): Promise<void>;
    forgotPassword(req: Request, res: Response, next: NextFunction): Promise<void>;
    recoverAccount(req: Request, res: Response, next: NextFunction): Promise<void>;
    sendVerificationOTP(req: Request, res: Response, next: NextFunction): Promise<void>;
    verifyEmailWithToken(req: Request, res: Response, next: NextFunction): Promise<void>;
    logout(req: Request, res: Response, next: NextFunction): Promise<void>;
    refreshToken(req: Request, res: Response, next: NextFunction): Promise<void>;
    googleAuth(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export declare const authController: AuthController;
//# sourceMappingURL=auth.controller.d.ts.map
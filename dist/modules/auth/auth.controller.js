"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = exports.AuthController = void 0;
const auth_service_1 = require("./auth.service");
class AuthController {
    async signup(req, res, next) {
        try {
            const { firstName, lastName, email, password, isAcceptPrivacyStatement } = req.body;
            const result = await auth_service_1.authService.signup({ firstName, lastName, email, password, isAcceptPrivacyStatement });
            res.status(201).json({ success: true, data: result, meta: { timestamp: new Date().toISOString() } });
        }
        catch (error) {
            next(error);
        }
    }
    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const result = await auth_service_1.authService.login({ email, password });
            res.status(200).json({ success: true, data: result, meta: { timestamp: new Date().toISOString() } });
        }
        catch (error) {
            next(error);
        }
    }
    async verifyOTP(req, res, next) {
        try {
            const { email, otp } = req.body;
            const result = await auth_service_1.authService.verifyOTP(email, otp);
            res.status(200).json({ success: true, data: result, meta: { timestamp: new Date().toISOString() } });
        }
        catch (error) {
            next(error);
        }
    }
    async resendOTP(req, res, next) {
        try {
            const { email } = req.body;
            const result = await auth_service_1.authService.resendOTPRequest(email);
            res.status(200).json({ success: true, data: result, meta: { timestamp: new Date().toISOString() } });
        }
        catch (error) {
            next(error);
        }
    }
    async forgotPassword(req, res, next) {
        try {
            const { email } = req.body;
            const result = await auth_service_1.authService.forgotPassword(email);
            res.status(200).json({ success: true, data: result, meta: { timestamp: new Date().toISOString() } });
        }
        catch (error) {
            next(error);
        }
    }
    async recoverAccount(req, res, next) {
        try {
            const { newPassword } = req.body;
            const userId = req.user?.userId;
            const result = await auth_service_1.authService.recoverAccount(userId, newPassword);
            res.status(200).json({ success: true, data: result, meta: { timestamp: new Date().toISOString() } });
        }
        catch (error) {
            next(error);
        }
    }
    async sendVerificationOTP(req, res, next) {
        try {
            const { email, otp } = req.body;
            const result = await auth_service_1.authService.sendVerificationOTP(email, otp);
            res.status(200).json({ success: true, data: result, meta: { timestamp: new Date().toISOString() } });
        }
        catch (error) {
            next(error);
        }
    }
    async verifyEmailWithToken(req, res, next) {
        try {
            const { otp } = req.body;
            const userId = req.user?.userId;
            const result = await auth_service_1.authService.verifyEmailWithToken(userId, otp);
            res.status(200).json({ success: true, data: result, meta: { timestamp: new Date().toISOString() } });
        }
        catch (error) {
            next(error);
        }
    }
    async logout(req, res, next) {
        try {
            const { refreshToken } = req.body;
            const userId = req.user?.userId;
            const result = await auth_service_1.authService.logout(userId, refreshToken);
            res.status(200).json({ success: true, data: result, meta: { timestamp: new Date().toISOString() } });
        }
        catch (error) {
            next(error);
        }
    }
    async refreshToken(req, res, next) {
        try {
            const { refreshToken } = req.body;
            const result = await auth_service_1.authService.refreshAccessToken(refreshToken);
            res.status(200).json({ success: true, data: result, meta: { timestamp: new Date().toISOString() } });
        }
        catch (error) {
            next(error);
        }
    }
    async googleAuth(req, res, next) {
        try {
            const { idToken } = req.body;
            const result = await auth_service_1.authService.googleAuth(idToken);
            res.status(result.isNewUser ? 201 : 200).json({
                success: true,
                data: result,
                meta: { timestamp: new Date().toISOString() },
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.AuthController = AuthController;
exports.authController = new AuthController();
//# sourceMappingURL=auth.controller.js.map
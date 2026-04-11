"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const validate_1 = require("../../middleware/validate");
const authMiddleware_1 = require("../../middleware/authMiddleware");
const auth_validation_1 = require("./auth.validation");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const router = (0, express_1.Router)();
const mkLimiter = (max, windowMs, msg) => (0, express_rate_limit_1.default)({ windowMs, max, standardHeaders: true, legacyHeaders: false,
    message: { success: false, error: { code: 'TOO_MANY_REQUESTS', message: msg } } });
const signupLimiter = mkLimiter(10, 10 * 60 * 1000, 'Too many signup attempts');
const otpLimiter = mkLimiter(10, 10 * 60 * 1000, 'Too many OTP attempts');
const loginLimiter = mkLimiter(10, 15 * 60 * 1000, 'Too many login attempts');
const googleLimiter = mkLimiter(20, 15 * 60 * 1000, 'Too many Google auth attempts');
const ctrl = auth_controller_1.authController;
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication and Account Management
 */
/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [firstName, lastName, email, password, confirmPassword, isAcceptPrivacyStatement]
 *             properties:
 *               firstName: { type: string, example: "John" }
 *               lastName: { type: string, example: "Doe" }
 *               email: { type: string, example: "john@example.com" }
 *               password: { type: string, example: "Test@1234" }
 *               confirmPassword: { type: string, example: "Test@1234" }
 *               isAcceptPrivacyStatement: { type: boolean, example: true }
 *     responses:
 *       201:
 *         description: User registered successfully. Returns registered user info.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: "User registered successfully" }
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id: { type: string, example: "60d0fe2f5311236168a10b18" }
 *                     email: { type: string, example: "john@example.com" }
 *                     firstName: { type: string, example: "John" }
 *                     lastName: { type: string, example: "Doe" }
 *       400:
 *         description: Validation error
 */
router.post('/signup', signupLimiter, (0, validate_1.validate)(auth_validation_1.signupSchema), ctrl.signup.bind(ctrl));
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login to account
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: { type: string, example: "john@example.com" }
 *               password: { type: string, example: "Test@1234" }
 *     responses:
 *       200:
 *         description: Login successful. Returns tokens and user info.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data:
 *                   type: object
 *                   properties:
 *                     accessToken: { type: string, example: "eyJhbGciOiJIUzI1NiIsInR..." }
 *                     refreshToken: { type: string, example: "XyZ123..." }
 *                     user:
 *                       type: object
 *                       properties:
 *                         _id: { type: string, example: "60d0fe2f5311236168a10b18" }
 *                         email: { type: string, example: "john@example.com" }
 *                         role: { type: string, example: "user" }
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', loginLimiter, (0, validate_1.validate)(auth_validation_1.loginSchema), ctrl.login.bind(ctrl));
/**
 * @swagger
 * /api/auth/google:
 *   post:
 *     summary: Google OAuth authentication
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [idToken]
 *             properties:
 *               idToken: { type: string, example: "G-TOKEN-XXXX" }
 *     responses:
 *       200:
 *         description: Google login successful. Returns tokens and user info.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data:
 *                   type: object
 *                   properties:
 *                     accessToken: { type: string, example: "eyJhbGciOiJIUzI1NiIsInR..." }
 *                     user: { type: object, properties: { email: { type: string, example: "user@gmail.com" } } }
 */
router.post('/google', googleLimiter, (0, validate_1.validate)(auth_validation_1.googleAuthSchema), ctrl.googleAuth.bind(ctrl));
/**
 * @swagger
 * /api/auth/verify-otp:
 *   post:
 *     summary: Verify OTP during signup/login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, otp]
 *             properties:
 *               email: { type: string, example: "john@example.com" }
 *               otp: { type: string, example: "123456" }
 *     responses:
 *       200:
 *         description: OTP verified. Returns session tokens.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data:
 *                   type: object
 *                   properties:
 *                     accessToken: { type: string, example: "eyJ..." }
 */
router.post('/verify-otp', otpLimiter, (0, validate_1.validate)(auth_validation_1.verifyOtpSchema), ctrl.verifyOTP.bind(ctrl));
/**
 * @swagger
 * /api/auth/resend-otp:
 *   post:
 *     summary: Resend OTP to email
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email]
 *             properties:
 *               email: { type: string, example: "john@example.com" }
 *     responses:
 *       200:
 *         description: OTP resent
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: "OTP resent successfully" }
 */
router.post('/resend-otp', otpLimiter, (0, validate_1.validate)(auth_validation_1.resendOtpSchema), ctrl.resendOTP.bind(ctrl));
/**
 * @swagger
 * /api/auth/forgot-password:
 *   post:
 *     summary: Request password reset
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email]
 *             properties:
 *               email: { type: string, example: "john@example.com" }
 *     responses:
 *       200:
 *         description: Reset OTP sent
 */
router.post('/forgot-password', otpLimiter, (0, validate_1.validate)(auth_validation_1.forgotPasswordSchema), ctrl.forgotPassword.bind(ctrl));
/**
 * @swagger
 * /api/auth/send-verification-otp:
 *   post:
 *     summary: Send verification OTP manually
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email]
 *             properties:
 *               email: { type: string, example: "john@example.com" }
 *     responses:
 *       200:
 *         description: OTP sent
 */
router.post('/send-verification-otp', otpLimiter, (0, validate_1.validate)(auth_validation_1.sendVerificationOTPSchema), ctrl.sendVerificationOTP.bind(ctrl));
/**
 * @swagger
 * /api/auth/recover-account:
 *   post:
 *     summary: Set new password after recovery
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [newPassword, confirmPassword]
 *             properties:
 *               newPassword: { type: string, example: "New@1234" }
 *               confirmPassword: { type: string, example: "New@1234" }
 *     responses:
 *       200:
 *         description: Password updated
 */
router.post('/recover-account', authMiddleware_1.authenticate, otpLimiter, (0, validate_1.validate)(auth_validation_1.recoverAccountSchema), ctrl.recoverAccount.bind(ctrl));
/**
 * @swagger
 * /api/auth/verify-email-with-token:
 *   post:
 *     summary: Verify email using token/otp
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [otp]
 *             properties:
 *               otp: { type: string, example: "123456" }
 *     responses:
 *       200:
 *         description: Email verified
 */
router.post('/verify-email-with-token', authMiddleware_1.authenticate, otpLimiter, (0, validate_1.validate)(auth_validation_1.verifyEmailWithTokenSchema), ctrl.verifyEmailWithToken.bind(ctrl));
/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout from account
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [refreshToken]
 *             properties:
 *               refreshToken: { type: string, example: "REFRESH-TOKEN-XXXX" }
 *     responses:
 *       200:
 *         description: Logout successful
 */
router.post('/logout', authMiddleware_1.authenticate, (0, validate_1.validate)(auth_validation_1.logoutSchema), ctrl.logout.bind(ctrl));
/**
 * @swagger
 * /api/auth/refresh-token:
 *   post:
 *     summary: Refresh access token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [refreshToken]
 *             properties:
 *               refreshToken: { type: string, example: "REFRESH-TOKEN-XXXX" }
 *     responses:
 *       200:
 *         description: Token refreshed. Returns new access token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data:
 *                   type: object
 *                   properties:
 *                     accessToken: { type: string, example: "eyJ..." }
 */
router.post('/refresh-token', (0, validate_1.validate)(auth_validation_1.refreshTokenSchema), ctrl.refreshToken.bind(ctrl));
exports.default = router;
//# sourceMappingURL=auth.routes.js.map
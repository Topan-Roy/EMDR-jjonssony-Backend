"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const auth_model_1 = require("./auth.model");
const ApiError_1 = require("../../utils/ApiError");
const otp_1 = require("../../utils/otp");
const jwt_1 = require("../../utils/jwt");
const sendEmail_1 = require("../../utils/sendEmail");
const verifyGoogleToken_1 = require("../../utils/verifyGoogleToken");
const env_1 = require("../../config/env");
class AuthService {
    async signup(data) {
        const { firstName, lastName, email, password, isAcceptPrivacyStatement } = data;
        const existingUser = await auth_model_1.User.findOne({ email }).select('+otp +otpExpiresAt +otpAttempts');
        if (existingUser) {
            if (existingUser.isVerified) {
                throw ApiError_1.ApiError.emailAlreadyExists();
            }
            return this.resendOTP(existingUser);
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const otp = (0, otp_1.generateOTP)();
        const hashedOtp = (0, otp_1.hashOTP)(otp);
        const otpExpiresAt = (0, otp_1.getOTPExpiry)();
        const user = await auth_model_1.User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            authProvider: 'email',
            isVerified: false,
            isProfileCompleted: false,
            isAcceptPrivacyStatement,
            privacyAcceptedAt: isAcceptPrivacyStatement ? new Date() : undefined,
            otp: hashedOtp,
            otpExpiresAt,
            otpAttempts: 0,
        });
        try {
            await (0, sendEmail_1.sendOTPEmail)(email, otp, firstName);
        }
        catch (error) {
            await auth_model_1.User.findByIdAndDelete(user._id);
            throw ApiError_1.ApiError.internalError('Failed to send verification email. Please try again.');
        }
        const tokenPayload = {
            userId: user._id.toString(),
            role: user.role,
            isVerified: user.isVerified,
        };
        const tokens = (0, jwt_1.generateTokenPair)(tokenPayload);
        const hashedRefreshToken = await bcryptjs_1.default.hash(tokens.refreshToken, 10);
        user.refreshToken = hashedRefreshToken;
        await user.save();
        const response = {
            message: 'Registration successful. Please verify your email with the OTP sent.',
            email: user.email,
            user: {
                id: user._id.toString(),
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                authProvider: user.authProvider,
                isProfileCompleted: user.isProfileCompleted,
                isAcceptPrivacyStatement: user.isAcceptPrivacyStatement,
            },
            session: tokens,
        };
        if (env_1.env.NODE_ENV === 'development') {
            response._dev_otp = otp;
        }
        return response;
    }
    async resendOTP(user) {
        const otp = (0, otp_1.generateOTP)();
        const hashedOtp = (0, otp_1.hashOTP)(otp);
        const otpExpiresAt = (0, otp_1.getOTPExpiry)();
        user.otp = hashedOtp;
        user.otpExpiresAt = otpExpiresAt;
        user.otpAttempts = 0;
        await user.save();
        await (0, sendEmail_1.sendOTPEmail)(user.email, otp, user.firstName);
        const tokenPayload = {
            userId: user._id.toString(),
            role: user.role,
            isVerified: user.isVerified,
        };
        const tokens = (0, jwt_1.generateTokenPair)(tokenPayload);
        const hashedRefreshToken = await bcryptjs_1.default.hash(tokens.refreshToken, 10);
        user.refreshToken = hashedRefreshToken;
        await user.save();
        const response = {
            message: 'Registration successful. Please verify your email with the OTP sent.',
            email: user.email,
            user: {
                id: user._id.toString(),
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                authProvider: user.authProvider,
                isProfileCompleted: user.isProfileCompleted,
                isAcceptPrivacyStatement: user.isAcceptPrivacyStatement,
            },
            session: tokens,
        };
        if (env_1.env.NODE_ENV === 'development') {
            response._dev_otp = otp;
        }
        return response;
    }
    async verifyOTP(email, otp) {
        const user = await auth_model_1.User.findOne({ email }).select('+otp +otpExpiresAt +otpAttempts');
        if (!user) {
            throw ApiError_1.ApiError.userNotFound();
        }
        if (user.isVerified) {
            throw ApiError_1.ApiError.validationError('Email is already verified');
        }
        if (!user.otp || !user.otpExpiresAt) {
            throw ApiError_1.ApiError.validationError('No OTP found. Please request a new one');
        }
        if ((0, otp_1.isOTPExpired)(user.otpExpiresAt)) {
            throw ApiError_1.ApiError.otpExpired();
        }
        if (user.otpAttempts >= 5) {
            throw ApiError_1.ApiError.otpAttemptsExceeded();
        }
        const isValid = (0, otp_1.verifyOTP)(otp, user.otp);
        if (!isValid) {
            user.otpAttempts += 1;
            await user.save();
            throw ApiError_1.ApiError.otpInvalid();
        }
        user.isVerified = true;
        user.otp = undefined;
        user.otpExpiresAt = undefined;
        user.otpAttempts = 0;
        await user.save();
        return {
            message: 'Email verified successfully',
            user: {
                id: user._id.toString(),
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                isVerified: user.isVerified,
                authProvider: user.authProvider,
                isProfileCompleted: user.isProfileCompleted,
            },
        };
    }
    // RESEND OTP
    async resendOTPRequest(email) {
        const user = await auth_model_1.User.findOne({ email }).select('+otp +otpExpiresAt +otpAttempts');
        if (!user) {
            throw ApiError_1.ApiError.userNotFound();
        }
        if (user.isVerified) {
            throw ApiError_1.ApiError.validationError('Email is already verified');
        }
        const otp = (0, otp_1.generateOTP)();
        const hashedOtp = (0, otp_1.hashOTP)(otp);
        const otpExpiresAt = (0, otp_1.getOTPExpiry)();
        user.otp = hashedOtp;
        user.otpExpiresAt = otpExpiresAt;
        user.otpAttempts = 0;
        await user.save();
        await (0, sendEmail_1.sendOTPEmail)(user.email, otp, user.firstName);
        const tokenPayload = {
            userId: user._id.toString(),
            role: user.role,
            isVerified: user.isVerified,
        };
        const accessToken = (0, jwt_1.generateAccessToken)(tokenPayload);
        const response = {
            message: 'OTP sent successfully to your email',
            accessToken: accessToken,
        };
        if (env_1.env.NODE_ENV === 'development') {
            response._dev_otp = otp;
        }
        return response;
    }
    // LOGIN 
    async login(data) {
        const { email, password } = data;
        const user = await auth_model_1.User.findOne({ email }).select('+password +loginAttempts +lockUntil');
        if (!user) {
            throw ApiError_1.ApiError.unauthorized('Invalid email or password');
        }
        if (user.isDeleted) {
            throw ApiError_1.ApiError.unauthorized('This account has been deleted');
        }
        if (!user.isVerified) {
            throw ApiError_1.ApiError.validationError('Please verify your email first');
        }
        if (user.lockUntil && user.lockUntil > new Date()) {
            throw ApiError_1.ApiError.tooManyRequests('Account locked. Try again later');
        }
        const isPasswordValid = await bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            user.loginAttempts = (user.loginAttempts || 0) + 1;
            if (user.loginAttempts >= 5) {
                user.lockUntil = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes
            }
            await user.save();
            throw ApiError_1.ApiError.unauthorized('Invalid email or password');
        }
        user.loginAttempts = 0;
        user.lockUntil = undefined;
        user.lastLogin = new Date();
        await user.save();
        const tokenPayload = {
            userId: user._id.toString(),
            role: user.role,
            isVerified: user.isVerified,
        };
        const tokens = (0, jwt_1.generateTokenPair)(tokenPayload);
        const hashedRefreshToken = await bcryptjs_1.default.hash(tokens.refreshToken, 10);
        user.refreshToken = hashedRefreshToken;
        await user.save();
        return {
            message: 'Login successful',
            user: {
                id: user._id.toString(),
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                isVerified: user.isVerified,
            },
            session: tokens,
        };
    }
    // FORGOT PASSWORD
    async forgotPassword(email) {
        const user = await auth_model_1.User.findOne({ email }).select('+recoveryOtp +recoveryOtpExpiresAt +recoveryOtpAttempts');
        if (!user) {
            const dummyPayload = {
                userId: 'dummy',
                role: 'user',
                isVerified: false,
            };
            const dummyTokens = (0, jwt_1.generateTokenPair)(dummyPayload);
            return {
                message: 'OTP sent to your email for password reset.',
                session: dummyTokens,
            };
        }
        const otp = (0, otp_1.generateOTP)();
        const hashedOtp = (0, otp_1.hashOTP)(otp);
        const otpExpiresAt = (0, otp_1.getOTPExpiry)();
        user.recoveryOtp = hashedOtp;
        user.recoveryOtpExpiresAt = otpExpiresAt;
        user.recoveryOtpAttempts = 0;
        await user.save();
        await (0, sendEmail_1.sendPasswordResetEmail)(user.email, otp, user.firstName);
        const tokenPayload = {
            userId: user._id.toString(),
            role: user.role,
            isVerified: user.isVerified,
        };
        const tokens = (0, jwt_1.generateTokenPair)(tokenPayload);
        const response = {
            message: 'OTP sent to your email for password reset.',
            session: tokens,
        };
        if (env_1.env.NODE_ENV === 'development') {
            response._dev_otp = otp;
        }
        return response;
    }
    // RECOVER ACCOUNT 
    async recoverAccount(userId, newPassword) {
        const user = await auth_model_1.User.findById(userId).select('+password');
        if (!user) {
            throw ApiError_1.ApiError.userNotFound();
        }
        const hashedPassword = await bcryptjs_1.default.hash(newPassword, 10);
        user.password = hashedPassword;
        user.loginAttempts = 0;
        user.lockUntil = undefined;
        await user.save();
        return {
            message: 'Password reset successfully.',
        };
    }
    // RECOVER ACCOUNT WITH OTP 
    //  SEND VERIFICATION OTP 
    async sendVerificationOTP(email, otp) {
        const user = await auth_model_1.User.findOne({ email }).select('+recoveryOtp +recoveryOtpExpiresAt +recoveryOtpAttempts +password');
        if (!user) {
            throw ApiError_1.ApiError.userNotFound();
        }
        if (otp) {
            if (!user.recoveryOtp || !user.recoveryOtpExpiresAt) {
                throw ApiError_1.ApiError.validationError('No recovery OTP found. Please request a new one');
            }
            if ((0, otp_1.isOTPExpired)(user.recoveryOtpExpiresAt)) {
                throw ApiError_1.ApiError.otpExpired();
            }
            if (user.recoveryOtpAttempts >= 5) {
                throw ApiError_1.ApiError.otpAttemptsExceeded();
            }
            const isValid = (0, otp_1.verifyOTP)(otp, user.recoveryOtp);
            if (!isValid) {
                user.recoveryOtpAttempts += 1;
                await user.save();
                throw ApiError_1.ApiError.otpInvalid();
            }
            const accessToken = (0, jwt_1.generateAccessToken)({ userId: user._id.toString(), role: user.role, isVerified: user.isVerified });
            const refreshToken = (0, jwt_1.generateRefreshToken)({ userId: user._id.toString(), role: user.role, isVerified: user.isVerified });
            const hashedRefreshToken = (0, otp_1.hashOTP)(refreshToken);
            user.refreshToken = hashedRefreshToken;
            user.recoveryOtpAttempts = 0;
            await user.save();
            return {
                message: 'OTP verified successfully. You can now reset your password.',
                accessToken,
            };
        }
        const newOtp = (0, otp_1.generateOTP)();
        const hashedOtp = (0, otp_1.hashOTP)(newOtp);
        const otpExpiresAt = (0, otp_1.getOTPExpiry)();
        user.recoveryOtp = hashedOtp;
        user.recoveryOtpExpiresAt = otpExpiresAt;
        user.recoveryOtpAttempts = 0;
        await user.save();
        await (0, sendEmail_1.sendPasswordResetEmail)(user.email, newOtp, user.firstName);
        return {
            message: 'OTP sent to your email for password reset.',
            _dev_otp: newOtp,
        };
    }
    // VERIFY EMAIL WITH TOKEN
    async verifyEmailWithToken(userId, otp) {
        const user = await auth_model_1.User.findById(userId).select('+otp +otpExpiresAt +otpAttempts');
        if (!user) {
            throw ApiError_1.ApiError.userNotFound();
        }
        if (user.isVerified) {
            throw ApiError_1.ApiError.validationError('Email is already verified');
        }
        if (!user.otp || !user.otpExpiresAt) {
            throw ApiError_1.ApiError.validationError('No OTP found. Please request a new one');
        }
        if ((0, otp_1.isOTPExpired)(user.otpExpiresAt)) {
            throw ApiError_1.ApiError.otpExpired();
        }
        if (user.otpAttempts >= 5) {
            throw ApiError_1.ApiError.otpAttemptsExceeded();
        }
        const isValid = (0, otp_1.verifyOTP)(otp, user.otp);
        if (!isValid) {
            user.otpAttempts += 1;
            await user.save();
            throw ApiError_1.ApiError.otpInvalid();
        }
        user.isVerified = true;
        user.otp = undefined;
        user.otpExpiresAt = undefined;
        user.otpAttempts = 0;
        await user.save();
        return {
            message: 'Email verified successfully',
            user: {
                id: user._id.toString(),
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                isVerified: user.isVerified,
                authProvider: user.authProvider,
                isProfileCompleted: user.isProfileCompleted,
            },
        };
    }
    // LOGOUT
    async logout(userId, refreshToken) {
        if (!refreshToken) {
            throw ApiError_1.ApiError.validationError('Refresh token is required');
        }
        const user = await auth_model_1.User.findById(userId).select('+refreshToken');
        if (!user) {
            throw ApiError_1.ApiError.userNotFound();
        }
        if (!user.refreshToken) {
            throw ApiError_1.ApiError.validationError('No active session found');
        }
        const isValid = await bcryptjs_1.default.compare(refreshToken, user.refreshToken);
        if (!isValid) {
            throw ApiError_1.ApiError.unauthorized('Invalid refresh token');
        }
        user.refreshToken = undefined;
        await user.save();
        return {
            message: 'Logged out successfully',
        };
    }
    // GOOGLE AUTH
    async googleAuth(idToken) {
        const googleUser = await (0, verifyGoogleToken_1.verifyGoogleToken)(idToken);
        let user = await auth_model_1.User.findOne({
            $or: [{ googleId: googleUser.googleId }, { email: googleUser.email }],
        });
        const isNewUser = !user;
        if (user) {
            const needsUpdate = !user.googleId || !user.isVerified;
            if (needsUpdate) {
                user.googleId = user.googleId || googleUser.googleId;
                user.avatar = user.avatar || googleUser.avatar;
                user.isVerified = true;
                user.authProvider = user.authProvider === 'email' ? 'email' : 'google';
                await user.save();
            }
        }
        else {
            user = await auth_model_1.User.create({
                googleId: googleUser.googleId,
                firstName: googleUser.firstName,
                lastName: googleUser.lastName,
                email: googleUser.email,
                avatar: googleUser.avatar,
                authProvider: 'google',
                isVerified: true,
                isProfileCompleted: false,
                password: await bcryptjs_1.default.hash(Math.random().toString(36), 10), // placeholder
            });
        }
        const payload = { userId: user._id.toString(), role: user.role, isVerified: user.isVerified };
        const tokens = (0, jwt_1.generateTokenPair)(payload);
        user.refreshToken = await bcryptjs_1.default.hash(tokens.refreshToken, 10);
        user.lastLogin = new Date();
        await user.save();
        return {
            message: isNewUser ? 'Account created successfully via Google' : 'Login successful via Google',
            isNewUser,
            user: {
                id: user._id.toString(),
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                avatar: user.avatar,
                authProvider: user.authProvider,
                isVerified: user.isVerified,
                isProfileCompleted: user.isProfileCompleted,
                role: user.role,
            },
            session: tokens,
        };
    }
    // REFRESH ACCESS TOKEN
    async refreshAccessToken(refreshToken) {
        if (!refreshToken) {
            throw ApiError_1.ApiError.validationError('Refresh token is required');
        }
        let decoded;
        try {
            decoded = (0, jwt_1.verifyToken)(refreshToken);
        }
        catch (error) {
            throw ApiError_1.ApiError.unauthorized('Invalid or expired refresh token');
        }
        const user = await auth_model_1.User.findById(decoded.userId).select('+refreshToken');
        if (!user) {
            throw ApiError_1.ApiError.userNotFound();
        }
        if (!user.refreshToken) {
            throw ApiError_1.ApiError.unauthorized('No active session found');
        }
        const isValid = await bcryptjs_1.default.compare(refreshToken, user.refreshToken);
        if (!isValid) {
            user.refreshToken = undefined;
            await user.save();
            throw ApiError_1.ApiError.unauthorized('Token reuse detected. Please login again.');
        }
        const payload = {
            userId: user._id.toString(),
            role: user.role,
            isVerified: user.isVerified,
        };
        const newAccessToken = (0, jwt_1.generateAccessToken)(payload);
        const ENABLE_REFRESH_TOKEN_ROTATION = env_1.env.NODE_ENV === 'production';
        if (ENABLE_REFRESH_TOKEN_ROTATION) {
            const newRefreshToken = (0, jwt_1.generateRefreshToken)(payload);
            const hashedRefreshToken = await bcryptjs_1.default.hash(newRefreshToken, 10);
            user.refreshToken = hashedRefreshToken;
            await user.save();
            return {
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
            };
        }
        return {
            accessToken: newAccessToken,
        };
    }
}
exports.AuthService = AuthService;
exports.authService = new AuthService();
//# sourceMappingURL=auth.service.js.map
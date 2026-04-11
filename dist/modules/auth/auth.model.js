"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const userSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true,
        minlength: [2, 'First name must be at least 2 characters'],
        maxlength: [30, 'First name cannot exceed 30 characters'],
        match: [/^[a-zA-Z]+$/, 'First name can only contain letters'],
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true,
        minlength: [2, 'Last name must be at least 2 characters'],
        maxlength: [30, 'Last name cannot exceed 30 characters'],
        match: [/^[a-zA-Z]+$/, 'Last name can only contain letters'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            'Please provide a valid email address',
        ],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters'],
        select: false,
    },
    authProvider: {
        type: String,
        enum: ['email', 'google', 'facebook'],
        default: 'email',
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isProfileCompleted: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    otp: {
        type: String,
        select: false,
    },
    otpExpiresAt: {
        type: Date,
        select: false,
    },
    otpAttempts: {
        type: Number,
        default: 0,
        select: false,
    },
    recoveryOtp: {
        type: String,
        select: false,
    },
    recoveryOtpExpiresAt: {
        type: Date,
        select: false,
    },
    recoveryOtpAttempts: {
        type: Number,
        default: 0,
        select: false,
    },
    refreshToken: {
        type: String,
        select: false,
    },
    loginAttempts: {
        type: Number,
        default: 0,
        select: false,
    },
    lockUntil: {
        type: Date,
        select: false,
    },
    lastLogin: {
        type: Date,
        select: false,
    },
    fcmToken: { type: String, select: false },
    fcmPlatform: { type: String, enum: ['android', 'ios', 'web'], select: false },
    googleId: { type: String, sparse: true, index: true },
    avatar: { type: String },
    phoneNumber: { type: String, trim: true },
    isDeleted: { type: Boolean, default: false, index: true },
    deletedAt: { type: Date },
    isAcceptPrivacyStatement: { type: Boolean, default: false },
    privacyAcceptedAt: { type: Date },
}, {
    timestamps: true,
});
// email index is already created by unique:true in schema field
// isDeleted index is already created by index:true in schema field
// googleId index is already created by index:true in schema field
userSchema.index({ createdAt: -1 });
userSchema.index({ otpExpiresAt: 1 }, { expireAfterSeconds: 600 });
exports.User = mongoose_1.default.model('User', userSchema);
//# sourceMappingURL=auth.model.js.map
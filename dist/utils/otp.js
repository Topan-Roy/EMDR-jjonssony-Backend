"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOTP = exports.hashOTP = exports.isOTPExpired = exports.getOTPExpiry = exports.generateOTP = void 0;
const crypto_1 = __importDefault(require("crypto"));
const generateOTP = () => {
    return crypto_1.default.randomInt(100000, 999999).toString();
};
exports.generateOTP = generateOTP;
const getOTPExpiry = () => {
    return new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
};
exports.getOTPExpiry = getOTPExpiry;
const isOTPExpired = (expiryDate) => {
    return new Date() > expiryDate;
};
exports.isOTPExpired = isOTPExpired;
const hashOTP = (otp) => {
    return crypto_1.default.createHash('sha256').update(otp).digest('hex');
};
exports.hashOTP = hashOTP;
const verifyOTP = (inputOtp, hashedOtp) => {
    const hashedInput = (0, exports.hashOTP)(inputOtp);
    return hashedInput === hashedOtp;
};
exports.verifyOTP = verifyOTP;
//# sourceMappingURL=otp.js.map
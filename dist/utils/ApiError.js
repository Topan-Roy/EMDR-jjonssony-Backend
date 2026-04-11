"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
class ApiError extends Error {
    statusCode;
    code;
    field;
    isOperational;
    constructor(statusCode, code, message, field, isOperational = true) {
        super(message);
        this.statusCode = statusCode;
        this.code = code;
        this.field = field;
        this.isOperational = isOperational;
        Object.setPrototypeOf(this, ApiError.prototype);
        Error.captureStackTrace(this, this.constructor);
    }
    static validationError(message, field) {
        return new ApiError(400, 'VALIDATION_ERROR', message, field);
    }
    static emailAlreadyExists() {
        return new ApiError(409, 'EMAIL_ALREADY_EXISTS', 'Email already registered', 'email');
    }
    static otpExpired() {
        return new ApiError(400, 'OTP_EXPIRED', 'OTP has expired. Please request a new one');
    }
    static otpInvalid() {
        return new ApiError(400, 'OTP_INVALID', 'Invalid OTP. Please check and try again');
    }
    static otpAttemptsExceeded() {
        return new ApiError(429, 'OTP_ATTEMPTS_EXCEEDED', 'Maximum OTP attempts exceeded. Please request a new OTP');
    }
    static userNotFound() {
        return new ApiError(404, 'USER_NOT_FOUND', 'User not found');
    }
    static unauthorized(message = 'Unauthorized') {
        return new ApiError(401, 'UNAUTHORIZED', message);
    }
    static internalError(message = 'Internal server error') {
        return new ApiError(500, 'INTERNAL_SERVER_ERROR', message);
    }
    static tooManyRequests(message = 'Too many requests') {
        return new ApiError(429, 'TOO_MANY_REQUESTS', message);
    }
    static forbidden(message = 'Forbidden') {
        return new ApiError(403, 'FORBIDDEN', message);
    }
    static notFound(message = 'Resource not found') {
        return new ApiError(404, 'NOT_FOUND', message);
    }
}
exports.ApiError = ApiError;
//# sourceMappingURL=ApiError.js.map
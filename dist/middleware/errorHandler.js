"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = exports.errorHandler = void 0;
const zod_1 = require("zod");
const ApiError_1 = require("../utils/ApiError");
const logger_1 = require("../config/logger");
const mongoose_1 = __importDefault(require("mongoose"));
const errorHandler = (err, _req, res, _next) => {
    if (process.env.NODE_ENV === 'development') {
        logger_1.logger.debug('Error caught', { name: err.name, message: err.message, stack: err.stack });
    }
    if (err instanceof zod_1.ZodError) {
        const firstError = err.errors[0];
        const field = firstError.path[firstError.path.length - 1]?.toString();
        res.status(400).json({
            success: false,
            error: {
                code: 'VALIDATION_ERROR',
                message: firstError.message,
                field: field || undefined,
            },
            meta: {
                timestamp: new Date().toISOString(),
            },
        });
        return;
    }
    if (err instanceof mongoose_1.default.Error.ValidationError) {
        const firstError = Object.values(err.errors)[0];
        const field = firstError.path;
        res.status(400).json({
            success: false,
            error: {
                code: 'VALIDATION_ERROR',
                message: firstError.message,
                field,
            },
            meta: {
                timestamp: new Date().toISOString(),
            },
        });
        return;
    }
    if (err.name === 'MongoServerError' && err.code === 11000) {
        const field = Object.keys(err.keyPattern)[0];
        res.status(409).json({
            success: false,
            error: {
                code: 'EMAIL_ALREADY_EXISTS',
                message: 'Email already registered',
                field,
            },
            meta: {
                timestamp: new Date().toISOString(),
            },
        });
        return;
    }
    if (err instanceof mongoose_1.default.Error.CastError) {
        res.status(400).json({
            success: false,
            error: {
                code: 'VALIDATION_ERROR',
                message: 'Invalid ID format',
                field: err.path,
            },
            meta: {
                timestamp: new Date().toISOString(),
            },
        });
        return;
    }
    if (err instanceof ApiError_1.ApiError) {
        res.status(err.statusCode).json({
            success: false,
            error: {
                code: err.code,
                message: err.message,
                ...(err.field && { field: err.field }),
            },
            meta: {
                timestamp: new Date().toISOString(),
            },
        });
        return;
    }
    if (err.name === 'JsonWebTokenError') {
        res.status(401).json({
            success: false,
            error: {
                code: 'UNAUTHORIZED',
                message: 'Invalid token',
            },
            meta: {
                timestamp: new Date().toISOString(),
            },
        });
        return;
    }
    if (err.name === 'TokenExpiredError') {
        res.status(401).json({
            success: false,
            error: {
                code: 'UNAUTHORIZED',
                message: 'Token expired',
            },
            meta: {
                timestamp: new Date().toISOString(),
            },
        });
        return;
    }
    logger_1.logger.error('Unexpected error', { name: err.name, message: err.message, stack: err.stack });
    res.status(500).json({
        success: false,
        error: {
            code: 'INTERNAL_SERVER_ERROR',
            message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error',
        },
        meta: {
            timestamp: new Date().toISOString(),
        },
    });
};
exports.errorHandler = errorHandler;
const notFoundHandler = (req, _res, next) => {
    const error = new ApiError_1.ApiError(404, 'NOT_FOUND', `Route ${req.originalUrl} not found`);
    next(error);
};
exports.notFoundHandler = notFoundHandler;
//# sourceMappingURL=errorHandler.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const morgan_1 = __importDefault(require("morgan"));
const mongoose_1 = __importDefault(require("mongoose"));
const routes_1 = __importDefault(require("./routes"));
const errorHandler_1 = require("./middleware/errorHandler");
const env_1 = require("./config/env");
const logger_1 = require("./config/logger");
const redis_1 = require("./config/redis");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = require("./config/swagger");
const app = (0, express_1.default)();
// Security headers — configured to allow Swagger's internal assets
app.use((0, helmet_1.default)({
    contentSecurityPolicy: false,
}));
// CORS — Dynamic origin to support tunnel & multiple devices
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        // In dev, allow and echo any origin to satisfy browser credential security
        if (!origin || env_1.env.NODE_ENV === 'development') {
            callback(null, true);
        }
        else {
            const allowed = env_1.env.ALLOWED_ORIGINS.split(',').map(o => o.trim());
            if (allowed.includes(origin) || allowed.includes('*')) {
                callback(null, true);
            }
            else {
                callback(new Error('Not allowed by CORS'));
            }
        }
    },
    credentials: true,
}));
// NoSQL injection prevention
app.use((0, express_mongo_sanitize_1.default)());
// HTTP request logging — skip in test env
if (env_1.env.NODE_ENV !== 'test') {
    app.use((0, morgan_1.default)(env_1.env.NODE_ENV === 'production' ? 'combined' : 'dev', {
        stream: { write: (msg) => logger_1.logger.http(msg.trim()) },
    }));
}
// Global rate limit
app.use('/api', (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, error: { code: 'TOO_MANY_REQUESTS', message: 'Too many requests' } },
}));
// Body parsing
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
// Health check — includes DB + Redis status
app.get('/health', async (_req, res) => {
    const dbState = mongoose_1.default.connection.readyState;
    const dbStatus = dbState === 1 ? 'connected' : dbState === 2 ? 'connecting' : 'disconnected';
    let redisStatus = 'disconnected';
    try {
        await redis_1.redis.ping();
        redisStatus = 'connected';
    }
    catch {
        redisStatus = 'disconnected';
    }
    const healthy = dbStatus === 'connected';
    res.status(healthy ? 200 : 503).json({
        status: healthy ? 'ok' : 'degraded',
        timestamp: new Date().toISOString(),
        environment: env_1.env.NODE_ENV,
        services: {
            database: dbStatus,
            redis: redisStatus,
        },
    });
});
// API documentation
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerSpec, {
    customCss: swagger_1.swaggerCustomCss,
    customSiteTitle: 'MY-EMDR API Documentation',
}));
// API routes
app.use('/api', routes_1.default);
// 404 + error handlers
app.use(errorHandler_1.notFoundHandler);
app.use(errorHandler_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map
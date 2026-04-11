"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.termsController = void 0;
const terms_service_1 = require("./terms.service");
const respond = (res, data, status = 200) => res.status(status).json({ success: true, data, meta: { timestamp: new Date().toISOString() } });
exports.termsController = {
    // PUBLIC
    getActive: async (_req, res, next) => {
        try {
            const data = await terms_service_1.termsService.getActive();
            respond(res, data);
        }
        catch (e) {
            next(e);
        }
    },
    // USER — accept active T&C
    acceptTerms: async (req, res, next) => {
        try {
            const { termsId } = req.body;
            const ipAddress = req.ip ?? req.socket.remoteAddress;
            const userAgent = req.headers['user-agent'];
            const data = await terms_service_1.termsService.acceptTerms(req.user.userId, termsId, ipAddress, userAgent);
            respond(res, data);
        }
        catch (e) {
            next(e);
        }
    },
    // USER — check if accepted current T&C
    checkAcceptance: async (req, res, next) => {
        try {
            const data = await terms_service_1.termsService.checkAcceptance(req.user.userId);
            respond(res, data);
        }
        catch (e) {
            next(e);
        }
    },
    // ADMIN
    getAll: async (_req, res, next) => {
        try {
            const data = await terms_service_1.termsService.getAll();
            respond(res, data);
        }
        catch (e) {
            next(e);
        }
    },
    getById: async (req, res, next) => {
        try {
            const data = await terms_service_1.termsService.getById(req.params.id);
            respond(res, data);
        }
        catch (e) {
            next(e);
        }
    },
    create: async (req, res, next) => {
        try {
            const data = await terms_service_1.termsService.create(req.body, req.user.userId);
            respond(res, data, 201);
        }
        catch (e) {
            next(e);
        }
    },
    replace: async (req, res, next) => {
        try {
            const data = await terms_service_1.termsService.replace(req.params.id, req.body, req.user.userId);
            respond(res, data);
        }
        catch (e) {
            next(e);
        }
    },
    update: async (req, res, next) => {
        try {
            const data = await terms_service_1.termsService.update(req.params.id, req.body, req.user.userId);
            respond(res, data);
        }
        catch (e) {
            next(e);
        }
    },
    setActive: async (req, res, next) => {
        try {
            const data = await terms_service_1.termsService.setActive(req.params.id, req.user.userId);
            respond(res, data);
        }
        catch (e) {
            next(e);
        }
    },
    delete: async (req, res, next) => {
        try {
            const data = await terms_service_1.termsService.delete(req.params.id);
            respond(res, data);
        }
        catch (e) {
            next(e);
        }
    },
    getAcceptanceStats: async (req, res, next) => {
        try {
            const data = await terms_service_1.termsService.getAcceptanceStats(req.params.id);
            respond(res, data);
        }
        catch (e) {
            next(e);
        }
    },
};
//# sourceMappingURL=terms.controller.js.map
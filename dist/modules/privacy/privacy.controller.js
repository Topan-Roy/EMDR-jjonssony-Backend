"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.privacyController = void 0;
const privacy_service_1 = require("./privacy.service");
const respond = (res, data, status = 200) => res.status(status).json({ success: true, data, meta: { timestamp: new Date().toISOString() } });
exports.privacyController = {
    // PUBLIC
    getActive: async (_req, res, next) => {
        try {
            respond(res, await privacy_service_1.privacyService.getActive());
        }
        catch (e) {
            next(e);
        }
    },
    // ADMIN
    getAll: async (_req, res, next) => {
        try {
            respond(res, await privacy_service_1.privacyService.getAll());
        }
        catch (e) {
            next(e);
        }
    },
    getById: async (req, res, next) => {
        try {
            respond(res, await privacy_service_1.privacyService.getById(req.params.id));
        }
        catch (e) {
            next(e);
        }
    },
    create: async (req, res, next) => {
        try {
            respond(res, await privacy_service_1.privacyService.create(req.body, req.user.userId), 201);
        }
        catch (e) {
            next(e);
        }
    },
    replace: async (req, res, next) => {
        try {
            respond(res, await privacy_service_1.privacyService.replace(req.params.id, req.body, req.user.userId));
        }
        catch (e) {
            next(e);
        }
    },
    update: async (req, res, next) => {
        try {
            respond(res, await privacy_service_1.privacyService.update(req.params.id, req.body, req.user.userId));
        }
        catch (e) {
            next(e);
        }
    },
    setActive: async (req, res, next) => {
        try {
            respond(res, await privacy_service_1.privacyService.setActive(req.params.id, req.user.userId));
        }
        catch (e) {
            next(e);
        }
    },
    delete: async (req, res, next) => {
        try {
            respond(res, await privacy_service_1.privacyService.delete(req.params.id));
        }
        catch (e) {
            next(e);
        }
    },
};
//# sourceMappingURL=privacy.controller.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aboutController = void 0;
const about_service_1 = require("./about.service");
const respond = (res, data, status = 200) => res.status(status).json({ success: true, data, meta: { timestamp: new Date().toISOString() } });
exports.aboutController = {
    get: async (_req, res, next) => {
        try {
            respond(res, await about_service_1.aboutService.get());
        }
        catch (e) {
            next(e);
        }
    },
    create: async (req, res, next) => {
        try {
            respond(res, await about_service_1.aboutService.create(req.body, req.user.userId), 201);
        }
        catch (e) {
            next(e);
        }
    },
    update: async (req, res, next) => {
        try {
            respond(res, await about_service_1.aboutService.update(req.body, req.user.userId));
        }
        catch (e) {
            next(e);
        }
    },
};
//# sourceMappingURL=about.controller.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.faqController = void 0;
const faq_service_1 = require("./faq.service");
const respond = (res, data, status = 200) => res.status(status).json({ success: true, data, meta: { timestamp: new Date().toISOString() } });
exports.faqController = {
    // PUBLIC
    getAll: async (_req, res, next) => {
        try {
            respond(res, await faq_service_1.faqService.getAll());
        }
        catch (e) {
            next(e);
        }
    },
    getById: async (req, res, next) => {
        try {
            respond(res, await faq_service_1.faqService.getById(req.params.id));
        }
        catch (e) {
            next(e);
        }
    },
    // ADMIN
    getAllAdmin: async (_req, res, next) => {
        try {
            respond(res, await faq_service_1.faqService.getAllAdmin());
        }
        catch (e) {
            next(e);
        }
    },
    create: async (req, res, next) => {
        try {
            respond(res, await faq_service_1.faqService.create(req.body, req.user.userId), 201);
        }
        catch (e) {
            next(e);
        }
    },
    update: async (req, res, next) => {
        try {
            respond(res, await faq_service_1.faqService.update(req.params.id, req.body, req.user.userId));
        }
        catch (e) {
            next(e);
        }
    },
    reorder: async (req, res, next) => {
        try {
            respond(res, await faq_service_1.faqService.reorder(req.body.items, req.user.userId));
        }
        catch (e) {
            next(e);
        }
    },
    delete: async (req, res, next) => {
        try {
            respond(res, await faq_service_1.faqService.delete(req.params.id));
        }
        catch (e) {
            next(e);
        }
    },
};
//# sourceMappingURL=faq.controller.js.map
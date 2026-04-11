"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supportController = void 0;
const support_service_1 = require("./support.service");
const respond = (res, data, status = 200) => res.status(status).json({ success: true, data, meta: { timestamp: new Date().toISOString() } });
exports.supportController = {
    /**
     * Submit a support ticket (User)
     */
    create: async (req, res, next) => {
        try {
            const data = await support_service_1.supportService.createTicket(req.user.userId, req.body);
            respond(res, data, 201);
        }
        catch (e) {
            next(e);
        }
    },
    /**
     * Get my tickets (User)
     */
    getMyTickets: async (req, res, next) => {
        try {
            const data = await support_service_1.supportService.getMyTickets(req.user.userId);
            respond(res, data);
        }
        catch (e) {
            next(e);
        }
    },
    /**
     * Get ticket BY ID (User or Admin)
     */
    getById: async (req, res, next) => {
        try {
            const isAdmin = req.user?.role === 'admin';
            const data = await support_service_1.supportService.getTicketById(req.params.id, req.user.userId, isAdmin);
            respond(res, data);
        }
        catch (e) {
            next(e);
        }
    },
    /**
     * Get all tickets (Admin)
     */
    getAllAdmin: async (req, res, next) => {
        try {
            const { status, priority, page, limit } = req.query;
            const data = await support_service_1.supportService.getAllTicketsAdmin({
                status: status,
                priority: priority,
                page: page ? parseInt(page) : 1,
                limit: limit ? parseInt(limit) : 10,
            });
            respond(res, data);
        }
        catch (e) {
            next(e);
        }
    },
    /**
     * Respond to a ticket (Admin)
     */
    respond: async (req, res, next) => {
        try {
            const { response, status } = req.body;
            const data = await support_service_1.supportService.respondToTicket(req.params.id, req.user.userId, response, status);
            respond(res, data);
        }
        catch (e) {
            next(e);
        }
    },
};
//# sourceMappingURL=support.controller.js.map
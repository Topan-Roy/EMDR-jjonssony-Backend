"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supportService = void 0;
const support_model_1 = require("./support.model");
const ApiError_1 = require("../../utils/ApiError");
const logger_1 = require("../../config/logger");
exports.supportService = {
    /**
     * Create a new support ticket
     */
    async createTicket(userId, data) {
        const ticket = await support_model_1.SupportTicket.create({
            userId,
            category: data.category,
            message: data.message,
            priority: data.priority || support_model_1.TicketPriority.MEDIUM,
        });
        logger_1.logger.info('Support ticket created', { ticketId: ticket._id, userId });
        return ticket;
    },
    /**
     * Get tickets for the logged-in user
     */
    async getMyTickets(userId) {
        return support_model_1.SupportTicket.find({ userId })
            .sort({ createdAt: -1 })
            .lean();
    },
    /**
     * Get all tickets (Admin only) with filtering and pagination
     */
    async getAllTicketsAdmin(query) {
        const { status, priority, page = 1, limit = 10 } = query;
        const filter = {};
        if (status)
            filter.status = status;
        if (priority)
            filter.priority = priority;
        const skip = (page - 1) * limit;
        const [tickets, total] = await Promise.all([
            support_model_1.SupportTicket.find(filter)
                .populate('userId', 'firstName lastName email phoneNumber')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            support_model_1.SupportTicket.countDocuments(filter),
        ]);
        return {
            tickets,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    },
    /**
     * Get ticket details by ID
     */
    async getTicketById(ticketId, userId, isAdmin = false) {
        const query = { _id: ticketId };
        if (!isAdmin && userId) {
            query.userId = userId;
        }
        const ticket = await support_model_1.SupportTicket.findOne(query)
            .populate('userId', 'firstName lastName email phoneNumber')
            .populate('respondedBy', 'firstName lastName email')
            .lean();
        if (!ticket) {
            throw ApiError_1.ApiError.notFound('Support ticket not found');
        }
        return ticket;
    },
    /**
     * Admin respond to a ticket
     */
    async respondToTicket(ticketId, adminId, response, status) {
        const ticket = await support_model_1.SupportTicket.findByIdAndUpdate(ticketId, {
            adminResponse: response,
            respondedBy: adminId,
            respondedAt: new Date(),
            status: status || support_model_1.TicketStatus.RESOLVED,
        }, { returnDocument: 'after', runValidators: true });
        if (!ticket) {
            throw ApiError_1.ApiError.notFound('Support ticket not found');
        }
        logger_1.logger.info('Support ticket responded', { ticketId, adminId, status: ticket.status });
        // TODO: Send notification to user about the response
        return ticket;
    },
};
//# sourceMappingURL=support.service.js.map
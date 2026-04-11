import { TicketStatus, TicketPriority } from './support.model';
export declare const supportService: {
    /**
     * Create a new support ticket
     */
    createTicket(userId: string, data: {
        category: string;
        message: string;
        priority?: TicketPriority;
    }): Promise<import("mongoose").Document<unknown, {}, import("./support.model").ISupportTicket, {}, import("mongoose").DefaultSchemaOptions> & import("./support.model").ISupportTicket & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    /**
     * Get tickets for the logged-in user
     */
    getMyTickets(userId: string): Promise<(import("./support.model").ISupportTicket & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    /**
     * Get all tickets (Admin only) with filtering and pagination
     */
    getAllTicketsAdmin(query: {
        status?: string;
        priority?: string;
        page?: number;
        limit?: number;
    }): Promise<{
        tickets: (import("./support.model").ISupportTicket & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
        pagination: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    /**
     * Get ticket details by ID
     */
    getTicketById(ticketId: string, userId?: string, isAdmin?: boolean): Promise<import("./support.model").ISupportTicket & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    /**
     * Admin respond to a ticket
     */
    respondToTicket(ticketId: string, adminId: string, response: string, status?: TicketStatus): Promise<import("mongoose").Document<unknown, {}, import("./support.model").ISupportTicket, {}, import("mongoose").DefaultSchemaOptions> & import("./support.model").ISupportTicket & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
};
//# sourceMappingURL=support.service.d.ts.map
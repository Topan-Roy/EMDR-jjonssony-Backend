import mongoose, { Document } from 'mongoose';
export declare enum TicketStatus {
    OPEN = "open",
    IN_PROGRESS = "in-progress",
    RESOLVED = "resolved",
    CLOSED = "closed"
}
export declare enum TicketPriority {
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high"
}
export interface ISupportTicket extends Document {
    userId: mongoose.Types.ObjectId;
    category: string;
    message: string;
    status: TicketStatus;
    priority: TicketPriority;
    adminResponse?: string;
    respondedAt?: Date;
    respondedBy?: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
export declare const SupportTicket: mongoose.Model<ISupportTicket, {}, {}, {}, mongoose.Document<unknown, {}, ISupportTicket, {}, mongoose.DefaultSchemaOptions> & ISupportTicket & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, ISupportTicket>;
//# sourceMappingURL=support.model.d.ts.map
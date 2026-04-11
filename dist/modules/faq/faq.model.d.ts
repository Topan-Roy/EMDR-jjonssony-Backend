import mongoose, { Document } from 'mongoose';
export interface IFAQ extends Document {
    question: string;
    answer: string;
    order: number;
    isActive: boolean;
    createdBy: mongoose.Types.ObjectId;
    updatedBy?: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
export declare const FAQ: mongoose.Model<IFAQ, {}, {}, {}, mongoose.Document<unknown, {}, IFAQ, {}, mongoose.DefaultSchemaOptions> & IFAQ & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IFAQ>;
//# sourceMappingURL=faq.model.d.ts.map
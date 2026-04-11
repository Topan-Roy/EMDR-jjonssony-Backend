import mongoose, { Document } from 'mongoose';
export interface ITermsAcceptance extends Document {
    userId: mongoose.Types.ObjectId;
    termsId: mongoose.Types.ObjectId;
    version: string;
    acceptedAt: Date;
    ipAddress?: string;
    userAgent?: string;
}
export declare const TermsAcceptance: mongoose.Model<ITermsAcceptance, {}, {}, {}, mongoose.Document<unknown, {}, ITermsAcceptance, {}, mongoose.DefaultSchemaOptions> & ITermsAcceptance & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, ITermsAcceptance>;
//# sourceMappingURL=terms-acceptance.model.d.ts.map
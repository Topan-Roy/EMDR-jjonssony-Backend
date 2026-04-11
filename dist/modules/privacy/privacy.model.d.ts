import mongoose, { Document } from 'mongoose';
export interface IPrivacySection {
    title: string;
    content: string;
    order: number;
}
export interface IPrivacyPolicy extends Document {
    version: string;
    overview: string;
    effectiveDate: Date;
    lastUpdated: Date;
    changelog?: string;
    sections: IPrivacySection[];
    contactEmail: string;
    contactName: string;
    isActive: boolean;
    createdBy: mongoose.Types.ObjectId;
    updatedBy?: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
export declare const PrivacyPolicy: mongoose.Model<IPrivacyPolicy, {}, {}, {}, mongoose.Document<unknown, {}, IPrivacyPolicy, {}, mongoose.DefaultSchemaOptions> & IPrivacyPolicy & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IPrivacyPolicy>;
//# sourceMappingURL=privacy.model.d.ts.map
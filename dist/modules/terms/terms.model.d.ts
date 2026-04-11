import mongoose, { Document } from 'mongoose';
export interface ISection {
    title: string;
    content: string;
    order: number;
}
export interface ITerms extends Document {
    version: string;
    lastUpdated: Date;
    effectiveDate: Date;
    changelog?: string;
    sections: ISection[];
    contactEmail: string;
    contactName: string;
    isActive: boolean;
    createdBy: mongoose.Types.ObjectId;
    updatedBy?: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
export declare const Terms: mongoose.Model<ITerms, {}, {}, {}, mongoose.Document<unknown, {}, ITerms, {}, mongoose.DefaultSchemaOptions> & ITerms & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, ITerms>;
//# sourceMappingURL=terms.model.d.ts.map
import mongoose, { Document } from 'mongoose';
export interface IAboutUsSection {
    title: string;
    content: string;
    order: number;
}
export interface IAboutUs extends Document {
    overview: string;
    sections: IAboutUsSection[];
    updatedBy?: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
export declare const AboutUs: mongoose.Model<IAboutUs, {}, {}, {}, mongoose.Document<unknown, {}, IAboutUs, {}, mongoose.DefaultSchemaOptions> & IAboutUs & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IAboutUs>;
//# sourceMappingURL=about.model.d.ts.map
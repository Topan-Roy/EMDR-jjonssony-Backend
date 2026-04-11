import mongoose, { Document } from 'mongoose';
export interface ILocation extends Document {
    userId: mongoose.Types.ObjectId;
    latitude: number;
    longitude: number;
    accuracy?: number;
    address?: string;
    sharedAt: Date;
}
export declare const Location: mongoose.Model<ILocation, {}, {}, {}, mongoose.Document<unknown, {}, ILocation, {}, mongoose.DefaultSchemaOptions> & ILocation & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, ILocation>;
//# sourceMappingURL=location.model.d.ts.map
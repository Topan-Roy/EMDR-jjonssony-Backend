export declare const privacyService: {
    getActive(): Promise<any>;
    getAll(): Promise<(import("./privacy.model").IPrivacyPolicy & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    getById(id: string): Promise<import("./privacy.model").IPrivacyPolicy & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    create(data: any, userId: string): Promise<import("mongoose").Document<unknown, {}, import("./privacy.model").IPrivacyPolicy, {}, import("mongoose").DefaultSchemaOptions> & import("./privacy.model").IPrivacyPolicy & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    replace(id: string, data: any, userId: string): Promise<import("./privacy.model").IPrivacyPolicy & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    update(id: string, data: any, userId: string): Promise<import("./privacy.model").IPrivacyPolicy & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    setActive(id: string, userId: string): Promise<import("mongoose").Document<unknown, {}, import("./privacy.model").IPrivacyPolicy, {}, import("mongoose").DefaultSchemaOptions> & import("./privacy.model").IPrivacyPolicy & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    delete(id: string): Promise<{
        message: string;
    }>;
};
//# sourceMappingURL=privacy.service.d.ts.map
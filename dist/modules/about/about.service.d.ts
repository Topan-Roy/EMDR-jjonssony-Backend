export declare const aboutService: {
    get(): Promise<any>;
    create(data: {
        overview: string;
        sections: any[];
    }, userId: string): Promise<import("mongoose").Document<unknown, {}, import("./about.model").IAboutUs, {}, import("mongoose").DefaultSchemaOptions> & import("./about.model").IAboutUs & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    update(data: {
        overview: string;
        sections: any[];
    }, userId: string): Promise<import("./about.model").IAboutUs & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
};
//# sourceMappingURL=about.service.d.ts.map
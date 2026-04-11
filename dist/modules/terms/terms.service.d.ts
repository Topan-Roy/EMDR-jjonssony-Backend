export declare const termsService: {
    getActive(): Promise<any>;
    acceptTerms(userId: string, termsId: string, ipAddress?: string, userAgent?: string): Promise<{
        message: string;
        version: string;
        acceptedAt: Date;
    }>;
    checkAcceptance(userId: string): Promise<{
        hasAccepted: boolean;
        currentVersion: string;
        effectiveDate: Date;
        acceptedAt: Date | null;
    }>;
    getAll(): Promise<(import("./terms.model").ITerms & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    getById(id: string): Promise<import("./terms.model").ITerms & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    create(data: any, userId: string): Promise<import("mongoose").Document<unknown, {}, import("./terms.model").ITerms, {}, import("mongoose").DefaultSchemaOptions> & import("./terms.model").ITerms & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    replace(id: string, data: any, userId: string): Promise<import("./terms.model").ITerms & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    update(id: string, data: any, userId: string): Promise<import("./terms.model").ITerms & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    setActive(id: string, userId: string): Promise<import("mongoose").Document<unknown, {}, import("./terms.model").ITerms, {}, import("mongoose").DefaultSchemaOptions> & import("./terms.model").ITerms & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    delete(id: string): Promise<{
        message: string;
    }>;
    getAcceptanceStats(termsId: string): Promise<{
        version: string;
        totalAcceptances: number;
        recentAcceptances: (import("./terms-acceptance.model").ITermsAcceptance & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
    }>;
};
//# sourceMappingURL=terms.service.d.ts.map
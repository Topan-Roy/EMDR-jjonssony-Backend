export declare const faqService: {
    getAll(): Promise<any>;
    getById(id: string): Promise<import("./faq.model").IFAQ & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    getAllAdmin(): Promise<{
        displayId: number;
        question: string;
        answer: string;
        order: number;
        isActive: boolean;
        createdBy: import("mongoose").Types.ObjectId;
        updatedBy?: import("mongoose").Types.ObjectId;
        createdAt: Date;
        updatedAt: Date;
        _id: import("mongoose").Types.ObjectId;
        $locals: Record<string, unknown>;
        $op: "save" | "validate" | "remove" | null;
        $where: Record<string, unknown>;
        baseModelName?: string;
        collection: import("mongoose").Collection;
        db: import("mongoose").Connection;
        errors?: import("mongoose").Error.ValidationError;
        isNew: boolean;
        schema: import("mongoose").Schema;
        __v: number;
    }[]>;
    create(data: {
        question: string;
        answer: string;
        order?: number;
        isActive?: boolean;
    }, userId: string): Promise<import("mongoose").Document<unknown, {}, import("./faq.model").IFAQ, {}, import("mongoose").DefaultSchemaOptions> & import("./faq.model").IFAQ & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    update(id: string, data: any, userId: string): Promise<import("./faq.model").IFAQ & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    reorder(items: {
        id: string;
        order: number;
    }[], userId: string): Promise<{
        message: string;
        updated: number;
    }>;
    delete(id: string): Promise<{
        message: string;
    }>;
};
//# sourceMappingURL=faq.service.d.ts.map
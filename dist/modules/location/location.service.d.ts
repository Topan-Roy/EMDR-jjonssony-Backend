export declare const locationService: {
    shareLocation(userId: string, data: {
        latitude: number;
        longitude: number;
        accuracy?: number;
    }): Promise<{
        id: string;
        latitude: number;
        longitude: number;
        accuracy: number | null;
        sharedAt: Date;
    }>;
    getMyLocation(userId: string): Promise<{
        id: string;
        latitude: number;
        longitude: number;
        accuracy: number | null;
        address: string;
        sharedAt: Date;
        mapsUrl: string;
    }>;
};
//# sourceMappingURL=location.service.d.ts.map
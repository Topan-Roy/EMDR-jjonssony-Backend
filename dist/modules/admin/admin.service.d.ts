export declare const adminService: {
    getProfile(adminId: string): Promise<any>;
    updateProfile(adminId: string, data: {
        name: string;
        phoneNumber?: string;
    }, profilePicBuffer?: Buffer): Promise<{
        id: string;
        name: string;
        email: string;
        phoneNumber: string | null;
        profilePic: string | null;
        role: "user" | "admin";
    }>;
};
//# sourceMappingURL=admin.service.d.ts.map
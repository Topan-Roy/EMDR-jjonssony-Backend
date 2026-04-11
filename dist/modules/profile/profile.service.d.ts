export declare class ProfileService {
    getProfile(userId: string): Promise<any>;
    updateProfile(userId: string, fullName: string, phoneNumber?: string, profilePicBuffer?: Buffer): Promise<{
        id: string;
        fullName: string;
        email: string;
        phoneNumber: string | null;
        profilePic: string | null;
        isVerified: boolean;
        isProfileCompleted: boolean;
    }>;
    changePassword(userId: string, currentPassword: string, newPassword: string): Promise<{
        message: string;
    }>;
    deleteAccount(userId: string): Promise<{
        message: string;
    }>;
}
export declare const profileService: ProfileService;
//# sourceMappingURL=profile.service.d.ts.map
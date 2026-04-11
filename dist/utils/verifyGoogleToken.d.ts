export interface GoogleUserInfo {
    googleId: string;
    email: string;
    firstName: string;
    lastName: string;
    avatar?: string;
    emailVerified: boolean;
}
export declare const verifyGoogleToken: (idToken: string) => Promise<GoogleUserInfo>;
//# sourceMappingURL=verifyGoogleToken.d.ts.map
export interface JWTPayload {
    userId: string;
    role: string;
    isVerified: boolean;
}
export interface TokenPair {
    accessToken: string;
    refreshToken: string;
    expiresAt: string;
}
export declare const generateAccessToken: (payload: JWTPayload) => string;
export declare const generateRefreshToken: (payload: JWTPayload) => string;
export declare const generateTokenPair: (payload: JWTPayload) => TokenPair;
export declare const verifyToken: (token: string) => JWTPayload;
export declare const decodeToken: (token: string) => JWTPayload | null;
//# sourceMappingURL=jwt.d.ts.map
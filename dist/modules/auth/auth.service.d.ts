import { TokenPair } from '../../utils/jwt';
interface SignupData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    isAcceptPrivacyStatement: boolean;
}
interface LoginData {
    email: string;
    password: string;
}
interface SignupResponse {
    message: string;
    email: string;
    user: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        authProvider: string;
        isProfileCompleted: boolean;
        isAcceptPrivacyStatement: boolean;
    };
    session: TokenPair;
    _dev_otp?: string;
}
interface LoginResponse {
    message: string;
    user: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        role: string;
        isVerified: boolean;
    };
    session: TokenPair;
}
export declare class AuthService {
    signup(data: SignupData): Promise<SignupResponse>;
    private resendOTP;
    verifyOTP(email: string, otp: string): Promise<{
        message: string;
        user: any;
    }>;
    resendOTPRequest(email: string): Promise<{
        message: string;
        accessToken: string;
        _dev_otp?: string;
    }>;
    login(data: LoginData): Promise<LoginResponse>;
    forgotPassword(email: string): Promise<{
        message: string;
        session: TokenPair;
        _dev_otp?: string;
    }>;
    recoverAccount(userId: string, newPassword: string): Promise<{
        message: string;
    }>;
    sendVerificationOTP(email: string, otp?: string): Promise<{
        message: string;
        accessToken?: string;
        _dev_otp?: string;
    }>;
    verifyEmailWithToken(userId: string, otp: string): Promise<{
        message: string;
        user: any;
    }>;
    logout(userId: string, refreshToken: string): Promise<{
        message: string;
    }>;
    googleAuth(idToken: string): Promise<{
        message: string;
        isNewUser: boolean;
        user: any;
        session: TokenPair;
    }>;
    refreshAccessToken(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken?: string;
    }>;
}
export declare const authService: AuthService;
export {};
//# sourceMappingURL=auth.service.d.ts.map
export declare const generateOTP: () => string;
export declare const getOTPExpiry: () => Date;
export declare const isOTPExpired: (expiryDate: Date) => boolean;
export declare const hashOTP: (otp: string) => string;
export declare const verifyOTP: (inputOtp: string, hashedOtp: string) => boolean;
//# sourceMappingURL=otp.d.ts.map
interface EmailOptions {
    to: string;
    subject: string;
    text?: string;
    html?: string;
}
export declare const sendEmail: (options: EmailOptions) => Promise<void>;
export declare const sendOTPEmail: (email: string, otp: string, firstName: string) => Promise<void>;
export declare const sendPasswordChangedEmail: (email: string, firstName: string) => Promise<void>;
export declare const sendPasswordResetEmail: (email: string, otp: string, firstName: string) => Promise<void>;
export {};
//# sourceMappingURL=sendEmail.d.ts.map